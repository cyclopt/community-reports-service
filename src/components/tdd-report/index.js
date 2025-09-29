/* eslint-disable no-unused-vars */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

import ReactPDF, { Image, Text, Document } from "@react-pdf/renderer";
import getStream from "get-stream";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import BodyText from "../common-components/BodyText.js";
import CombinedComponents from "../common-components/CombinedComponents.js";
import ConclusionSection from "../common-components/ConclusionSection.js";
import TddFirstPage from "../common-components/FirstPage.js";
import LastPage from "../common-components/LastPage.js";
import Sast from "../common-components/Sast.js";
import SecondSection from "../common-components/SecondSection.js";
import SectionHeader from "../common-components/SectionHeader.js";
import SecurityViolations from "../common-components/SecurityViolations.js";
import TableOfContents from "../common-components/TableOfContents.js";
import ThirdSection from "../common-components/ThirdSection.js";
import Vulnerabilities from "../common-components/Vulnerabilities.js";
import downloadReportGraph from "../common-report/donwload-report-graph.js";
import { generateChart } from "../common-report/generate-chart.js";
import createdPlotGraph from "../common-report/generate-plot-graph.js";
import FirstSection from "../tdd-components/FirstSection.js";
import Maintainability from "../tdd-components/Maintainability.js";

import introductionText from "./text/introduction.js";

import { getMessageFromLlmForSast,
	getMessageFromLlmForViolations,
	getMessageFromLlmForSecurityViolations,
	getMessageFromLlmForVulnerabilities,
	getMessageFromLlmForMaintainability,
	getMessageFromLlmForConclusion,
	prepareDataForConclusion,
 
} from "#utils";

const generateRandomId = (length = 10) => Array.from({ length }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
	Math.floor(Math.random() * 62),
)).join("");

const getSectionNumbers = (sectionData) => {
	const { sast, violations, vulnerabilities, metrics } = sectionData;
	const isSecuritySectionIncluded = (sast || violations || vulnerabilities);
	const isMetricsIncluded = metrics;

	// second section numbers
	const initialSecondSectionNumberForSecuritty = 2.1;
	const initialSecondSectionNumberForMaintanability = isSecuritySectionIncluded ? 2.2 : 2.1;

	let initialSecondSubSectionNumberForSecurity = 0;
	let initialSecondSubSectionNumberForMaintanability = 0;

	// thrid section numbers
	const initialThirdSectionNumberForSecuritty = 3.1;
	const initialThirdSectionNumberForMaintanability = isSecuritySectionIncluded ? 3.2 : 3.1;

	let initialSubSectionNumberForSecurity = 0;
	let initialSubSectionNumberForMaintanability = 0;

	const secondSectionNumbers = {
		sast: "",
		vulnerabilities: "",
		securityViolations: "",
		maintainability: "",
		"Static Analysis Metrics": "",
		"Coding Violations": "",
	};

	const thirdSectionNumbers = {
		sast: "",
		vulnerabilities: "",
		securityViolations: "",
		maintainability: "",
		"Static Analysis Metrics": "",
		"Coding Violations": "",
	};

	if (isSecuritySectionIncluded) {
		if (sast) {
			initialSecondSubSectionNumberForSecurity += 1;
			secondSectionNumbers.sast = `${initialSecondSectionNumberForSecuritty}.${initialSecondSubSectionNumberForSecurity}`;

			initialSubSectionNumberForSecurity += 1;
			thirdSectionNumbers.sast = `${initialThirdSectionNumberForSecuritty}.${initialSubSectionNumberForSecurity}`;
		}

		if (vulnerabilities) {
			initialSecondSubSectionNumberForSecurity += 1;
			secondSectionNumbers.vulnerabilities = `${initialSecondSectionNumberForSecuritty}.${initialSecondSubSectionNumberForSecurity}`;

			initialSubSectionNumberForSecurity += 1;
			thirdSectionNumbers.vulnerabilities = `${initialThirdSectionNumberForSecuritty}.${initialSubSectionNumberForSecurity}`;
		}

		if (violations) {
			initialSecondSubSectionNumberForSecurity += 1;
			secondSectionNumbers.securityViolations = `${initialSecondSectionNumberForSecuritty}.${initialSecondSubSectionNumberForSecurity}`;

			initialSubSectionNumberForSecurity += 1;
			thirdSectionNumbers.securityViolations = `${initialThirdSectionNumberForSecuritty}.${initialSubSectionNumberForSecurity}`;
		}
	}

	if (isMetricsIncluded) {
		if (isMetricsIncluded) {
			secondSectionNumbers.maintainability = initialSecondSectionNumberForMaintanability;
			initialSecondSubSectionNumberForMaintanability += 1;
			secondSectionNumbers["Static Analysis Metrics"] = `${initialSecondSectionNumberForMaintanability}.${initialSecondSubSectionNumberForMaintanability}`;

			thirdSectionNumbers.maintainability = `${initialThirdSectionNumberForMaintanability}`;
			initialSubSectionNumberForMaintanability += 1;
			thirdSectionNumbers["Static Analysis Metrics"] = `${initialThirdSectionNumberForMaintanability}.${initialSubSectionNumberForMaintanability}`;
		}

		initialSecondSubSectionNumberForMaintanability += 1;
		secondSectionNumbers["Coding Violations"] = `${initialSecondSectionNumberForMaintanability}.${initialSecondSubSectionNumberForMaintanability}`;

		thirdSectionNumbers.maintainability = `${initialThirdSectionNumberForMaintanability}`;
		initialSubSectionNumberForMaintanability += 1;
		thirdSectionNumbers["Coding Violations"] = `${initialThirdSectionNumberForMaintanability}.${initialSubSectionNumberForMaintanability}`;
	}

	return { thirdSectionNumbers, secondSectionNumbers };
};

const renderEditedContent = async (response, token, reportId, section) => {
	const imageRegex = /!\[.*?]\((https:\/\/[^\s)]+)\)/g;
	const parts = [];
	let lastIndex = 0;

	let match;

	// create an array from the admin text divided in text and graph urls
	while ((match = imageRegex.exec(response)) !== null) {
		const textBefore = response.slice(lastIndex, match.index);
		const imageMarkdown = match[0];

		if (textBefore) {
			parts.push(textBefore);
		}

		parts.push(imageMarkdown); // <-- full Markdown image syntax
		lastIndex = match.index + match[0].length;
	}

	const remainingText = response.slice(lastIndex);
	if (remainingText) {
		parts.push(remainingText);
	}

	// from the array that we created, we know if the value is url or text
	// if the value is graph we download it and create the graph, else we create the text
	const results = await Promise.all(parts.map(async (r, index) => {
		const graphPath = "src/components/tdd-report/tmp-graph-forlder";
		const trimedText = r.trim();
		// if the value strart with ![ is graph
		if (trimedText.startsWith("![")) {
			const data = { reportId, section, grathPath: r };
			const graph = await downloadReportGraph(token, data, "tdd");
			const finalGraph = graph ? Buffer.from(graph, "base64") : null;
			const randomInternalId = generateRandomId(15);
			const pathToTheGraph = path.join(graphPath, `${randomInternalId}.png`);

			if (finalGraph) {
				fs.writeFileSync(pathToTheGraph, finalGraph);
			}

			return (
				<Image key={index} src={pathToTheGraph} style={{ width: "auto" }} />
			);
		}

		return (
			<BodyText key={index}>{r}</BodyText>
		);
	}));

	return results;
};

// this variable contains all the Sections with titles, ids and numbers for the TOC component
let finalSectionsForToc = [];

const TddReport = ({
	violations,
	vulnerabilities,
	sast,
	llmViolationResponse,
	llmVulnerabilityResponse,
	llmSastResponse,
	llmMaintainabilityResponse,
	llmSecurityViolationResponse,
	llmResponseForConclusion,
	sastGraphPath,
	vulnerabilityGraphPath,
	violationsGraphPath,
	securityViolationsGraphPath,
	tmpSections,
	owner,
	customSections,
	sectionsNumber,
	name,
	hash,
	fileName,
	edit,
}) => {
	const [sections, setSections] = useState([]);
	useEffect(() => {
		finalSectionsForToc = sections;
	}, [sections]);

	const addToTOC = (sectionNumber, sectionTitle, id, pageNumber, level) => {
		setSections((prev) => {
			const existingIndex = prev.findIndex((section) => section.id === id);

			if (existingIndex !== -1) {
				// If the section with the same `id` exists, update it
				return prev.map((section, index) => (index === existingIndex ? { ...section, sectionNumber } : section));
			}

			// Otherwise, add a new section
			return [...prev, { sectionNumber, sectionTitle, id, pageNumber, level }];
		});
	};

	const { sast: sastSection, violations: violationsSection,
		vulnerabilities: vulnerabilitiesSection, metrics: metricsSection, practices: practicesSection } = customSections;

	const thirdSectionExist = sastSection || violationsSection || vulnerabilitiesSection;

	return (
		<Document>
			<TddFirstPage title="Technical Due Diligence" service="tdd" />
			<TableOfContents dynamicSections={tmpSections} />
			<FirstSection
				addToTOC={addToTOC}
				owner={owner}
				hash={hash}
				name={name}
				finalSections={finalSectionsForToc}
				fileName={fileName}
				text={introductionText}
			/>
			<SecondSection
				addToTOC={addToTOC}
				sectionsNumber={sectionsNumber}
				thirdSectionExist={thirdSectionExist}
				metricsSection={metricsSection}
				violationsSection={violationsSection}
				sastSection={sastSection}
				vulnerabilitiesSection={vulnerabilitiesSection}
				practicesSection={practicesSection}
				service="tdd"
			/>
			{((thirdSectionExist) || (metricsSection)) && (
				<CombinedComponents>
					{((thirdSectionExist) || (metricsSection)) && (
						<ThirdSection
							addToTOC={addToTOC}
						/>
					)}

					{thirdSectionExist && (<SectionHeader id="3.1" number="3.1" title="Security" addToTOC={addToTOC} level={1} />)}

					{((sastSection) && (thirdSectionExist)) && (
						<Sast
							sast={sast}
							llmSastResponse={llmSastResponse}
							sastGraphPath={sastGraphPath}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
							edit={edit}
						/>
					)}

					{((vulnerabilitiesSection) && (thirdSectionExist)) && (
						<Vulnerabilities
							vulnerabilities={vulnerabilities}
							llmVulnerabilityResponse={llmVulnerabilityResponse}
							vulnerabilityGraphPath={vulnerabilityGraphPath}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
							edit={edit}
						/>
					)}

					{((violationsSection) && (thirdSectionExist)) && (
						<SecurityViolations
							violations={violations.securityViolations}
							llmViolationResponse={llmSecurityViolationResponse}
							violationsGraphPath={securityViolationsGraphPath}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
							edit={edit}
						/>
					)}

					{metricsSection && (
						<Maintainability
							llmMaintainabilityResponse={llmMaintainabilityResponse}
							llmViolationResponse={llmViolationResponse}
							violationsGraphPath={violationsGraphPath}
							violations={violations}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
							metricsSection={metricsSection}
							edit={edit}
						/>
					)}

				</CombinedComponents>
			)}

			<ConclusionSection addToTOC={addToTOC} llmResponseForConclusion={llmResponseForConclusion} edit={edit} />

			<LastPage />
		</Document>
	);
};

const getTddReport = async (
	violations,
	vulnerabilities,
	sast,
	metrics,
	customSections,
	owner,
	name,
	hash,
	fileName,
	vioResponse,
	secVioResponse,
	vulResponse,
	mainResponse,
	sastResponse,
	conclusionResponse,
	edit,
	token,
	reportId,
	stream = false,
) => {
	// get LLM messages
	// the edit variable is to know if the message is from the admin panel
	const llmSastResponse = edit ? await renderEditedContent(sastResponse, token, reportId, "Sast") : (sast?.totalSast > 0 ? await getMessageFromLlmForSast(sast) : "");
	const llmResponseForVulnerabilities = edit ? await renderEditedContent(vulResponse, token, reportId, "Vulnerabilities") : (vulnerabilities?.totalVulnerabilities > 0 ? await getMessageFromLlmForVulnerabilities(vulnerabilities) : "");
	const llmResponseForViolations = edit ? await renderEditedContent(vioResponse, token, reportId, "Violations") : (violations.totalViolationsCount > 0 ? await getMessageFromLlmForViolations(violations) : "");
	const llmResponseForSecurityViolations = edit ? await renderEditedContent(secVioResponse, token, reportId, "Security_Violations") : (violations.securityViolations.totalViolations > 0 ? await getMessageFromLlmForSecurityViolations(violations.securityViolations) : "");
	const llmMaintainabilityResponse = mainResponse || (Object.keys(metrics)?.length > 0 ? await getMessageFromLlmForMaintainability(metrics) : "");

	let llmResponseForConclusion = "";
	if (edit) {
		llmResponseForConclusion = await renderEditedContent(conclusionResponse, token, reportId, "Conclusion");
	} else {
		const llmResponses = {
			sast: llmSastResponse,
			vulnerabilities: llmResponseForVulnerabilities,
			violations: llmResponseForViolations,
			securityViolations: llmResponseForSecurityViolations,
			maintainability: llmMaintainabilityResponse,
		};

		const analysisFindings = { sast, vulnerabilities, violations };

		const { conclusionData, sections, llmRole } = prepareDataForConclusion(customSections, llmResponses, analysisFindings, "tdd");

		llmResponseForConclusion = await getMessageFromLlmForConclusion(conclusionData, sections, llmRole);
	}

	// path to store the graphs
	const graphPath = "src/components/tdd-report/tmp-graph-forlder";

	// created Plot graphs
	// sast
	const internalIdSast = generateRandomId();
	let sastGraphPath = null;
	if ((sast?.graphData?.xAxis?.length > 0 && sast?.graphData?.yAxis?.length > 0) && !edit) {
		sastGraphPath = path.join(graphPath, `${internalIdSast}.png`);
		generateChart(sast.graphData.xAxis, sast.graphData.yAxis, sastGraphPath, "sast");
		// await createdPlotGraph(sast.graphData.xAxis, sast.graphData.yAxis, "Vulnerability Type (CWE)", imageNameSast);
	}

	// vulnerbilities
	const internalIdVulnerabilities = generateRandomId();
	let vulnerabilityGraphPath = null;
	if ((vulnerabilities?.graphData?.xAxis?.length > 0 && vulnerabilities?.graphData?.yAxis?.length > 0) && !edit) {
		vulnerabilityGraphPath = path.join(graphPath, `${internalIdVulnerabilities}.png`);
		generateChart(vulnerabilities.graphData.xAxis, vulnerabilities.graphData.yAxis, vulnerabilityGraphPath, "vulnerabilities");
	}

	// violations
	const internalIdViolations = generateRandomId();
	const internalIdSecurityViolations = generateRandomId();
	let violationsGraphPath = null;
	let securityViolationsGraphPath = null;
	if ((violations?.graphData?.xAxis?.length > 0 && violations?.graphData?.yAxis?.length > 0) && !edit) {
		violationsGraphPath = path.join(graphPath, `${internalIdViolations}.png`);
		generateChart(violations.graphData.xAxis, violations.graphData.yAxis, violationsGraphPath, "violations");

		// create graph for security violations
		if ((violations?.securityViolations?.graphData?.xAxis?.length > 0
			&& violations?.securityViolations?.graphData?.yAxis?.length > 0)) {
			securityViolationsGraphPath = path.join(graphPath, `${internalIdSecurityViolations}.png`);
			generateChart(violations.securityViolations.graphData.xAxis,
				violations.securityViolations.graphData.yAxis,
				securityViolationsGraphPath,
				"security violations");
		}
	}

	const sectionsNumber = getSectionNumbers(customSections);

	// DO NOT REMOVE THIS
	// This handles Table Of Contents
	const report = await ReactPDF.renderToStream(
		<TddReport
			violations={violations}
			vulnerabilities={vulnerabilities}
			sast={sast}
			llmViolationResponse={llmResponseForViolations}
			llmVulnerabilityResponse={llmResponseForVulnerabilities}
			llmSastResponse={llmSastResponse}
			llmMaintainabilityResponse={llmMaintainabilityResponse}
			llmSecurityViolationResponse={llmResponseForSecurityViolations}
			llmResponseForConclusion={llmResponseForConclusion}
			violationsGraphPath={violationsGraphPath}
			vulnerabilityGraphPath={vulnerabilityGraphPath}
			sastGraphPath={sastGraphPath}
			securityViolationsGraphPath={securityViolationsGraphPath}
			owner={owner}
			sectionsNumber={sectionsNumber}
			customSections={customSections}
			name={name}
			hash={hash}
			fileName={fileName}
			edit={edit}
			token={token}
		/>,
	);

	const sortedSections = finalSectionsForToc.filter((fsToc) => fsToc.sectionNumber
	&& fsToc.sectionTitle && fsToc.id && fsToc.pageNumber).sort((a, b) => {
		const parseId = (id) => id.split(".").filter(Boolean).map(Number);

		const idA = parseId(a.id);
		const idB = parseId(b.id);

		for (let i = 0; i < Math.max(idA.length, idB.length); i++) {
			const numA = idA[i] ?? 0; // Default to 0 if undefined
			const numB = idB[i] ?? 0;
			if (numA !== numB) return numA - numB;
		}

		return 0;
	});

	const finalReport = await ReactPDF.renderToStream(
		<TddReport
			violations={violations}
			vulnerabilities={vulnerabilities}
			sast={sast}
			llmViolationResponse={llmResponseForViolations}
			llmVulnerabilityResponse={llmResponseForVulnerabilities}
			llmSastResponse={llmSastResponse}
			llmMaintainabilityResponse={llmMaintainabilityResponse}
			llmSecurityViolationResponse={llmResponseForSecurityViolations}
			llmResponseForConclusion={llmResponseForConclusion}
			violationsGraphPath={violationsGraphPath}
			vulnerabilityGraphPath={vulnerabilityGraphPath}
			sastGraphPath={sastGraphPath}
			securityViolationsGraphPath={securityViolationsGraphPath}
			tmpSections={sortedSections}
			sectionsNumber={sectionsNumber}
			customSections={customSections}
			owner={owner}
			name={name}
			hash={hash}
			fileName={fileName}
			edit={edit}
			token={token}
		/>,
	);

	if (stream) return finalReport;
	const finalResponseReport = await getStream(finalReport, { encoding: "base64" });

	return {
		report: finalResponseReport,
		llmResponseForViolations,
		llmResponseForSecurityViolations,
		llmResponseForVulnerabilities,
		llmMaintainabilityResponse,
		llmSastResponse,
		llmResponseForConclusion,
		sastGraphPath,
		vulnerabilityGraphPath,
		violationsGraphPath,
		securityViolationsGraphPath,
	};
};

TddReport.propTypes = {
	violations: PropTypes.object,
	vulnerabilities: PropTypes.object,
	sast: PropTypes.object,
	llmViolationResponse: PropTypes.any,
	llmVulnerabilityResponse: PropTypes.any,
	llmSastResponse: PropTypes.any,
	llmMaintainabilityResponse: PropTypes.any,
	llmSecurityViolationResponse: PropTypes.any,
	llmResponseForConclusion: PropTypes.any,
	sastGraphPath: PropTypes.string,
	vulnerabilityGraphPath: PropTypes.string,
	violationsGraphPath: PropTypes.string,
	securityViolationsGraphPath: PropTypes.string,
	tmpSections: PropTypes.array,
	owner: PropTypes.string,
	customSections: PropTypes.object,
	sectionsNumber: PropTypes.object,
	name: PropTypes.string,
	hash: PropTypes.string,
	fileName: PropTypes.string,
	edit: PropTypes.bool,
};

export default getTddReport;

