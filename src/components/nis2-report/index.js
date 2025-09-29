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
import FirstSection from "../nis2-components/FirstSection.js";
import Practices from "../nis2-components/Practices.js";

import introductionText from "./text/introduction.js";

import {
	getMessageFromLlmForSast,
	getMessageFromLlmForSecurityViolations,
	getMessageFromLlmForVulnerabilities,
	getMessageFromLlmForConclusion,
	nis2SubsectionsMapping,
	createNis2PracticesSectionsMessages,
	prepareDataForConclusion,
	 
} from "#utils";

const generateRandomId = (length = 10) => Array.from({ length }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
	Math.floor(Math.random() * 62),
)).join("");

// in this function we get the section numbers based the section we have
const getSectionNumbers = (sectionData, llmPracticesResponses = {}) => {
	const { sast, violations, vulnerabilities, practices } = sectionData;
	const isSecuritySectionIncluded = (sast || violations || vulnerabilities);
	const arePracticesIncluded = practices;

	// second section numbers
	const initialSecondSectionNumberForPractices = 2.1;
	const initialSecondSectionNumberForSecurity = arePracticesIncluded ? 2.2 : 2.1;

	let initialSecondSubSectionNumberForSecurity = 0;
	let initialSecondSubSectionNumberForPractices = 0;

	// thrid section numbers
	const initialThirdSectionNumberForPractices = 3.1;
	const initialThirdSectionNumberForSecurity = arePracticesIncluded ? 3.2 : 3.1;

	let initialSubSectionNumberForSecurity = 0;
	let initialSubSectionNumberForPractices = 0;

	const secondSectionNumbers = {
		sast: "",
		vulnerabilities: "",
		securityViolations: "",
		practices: "",
	};

	const thirdSectionNumbers = {
		sast: "",
		vulnerabilities: "",
		securityViolations: "",
		practices: "",
	};

	for (const key of Object.keys(llmPracticesResponses)) {
		if (!(key in thirdSectionNumbers) && key !== "Overall") {
			thirdSectionNumbers[key] = "";
		}
	}

	if (isSecuritySectionIncluded) {
		if (sast) {
			initialSecondSubSectionNumberForSecurity += 1;
			secondSectionNumbers.sast = `${initialSecondSectionNumberForSecurity}.${initialSecondSubSectionNumberForSecurity}`;

			initialSubSectionNumberForSecurity += 1;
			thirdSectionNumbers.sast = `${initialThirdSectionNumberForSecurity}.${initialSubSectionNumberForSecurity}`;
		}

		if (vulnerabilities) {
			initialSecondSubSectionNumberForSecurity += 1;
			secondSectionNumbers.vulnerabilities = `${initialSecondSectionNumberForSecurity}.${initialSecondSubSectionNumberForSecurity}`;

			initialSubSectionNumberForSecurity += 1;
			thirdSectionNumbers.vulnerabilities = `${initialThirdSectionNumberForSecurity}.${initialSubSectionNumberForSecurity}`;
		}

		if (violations) {
			initialSecondSubSectionNumberForSecurity += 1;
			secondSectionNumbers.securityViolations = `${initialSecondSectionNumberForSecurity}.${initialSecondSubSectionNumberForSecurity}`;

			initialSubSectionNumberForSecurity += 1;
			thirdSectionNumbers.securityViolations = `${initialThirdSectionNumberForSecurity}.${initialSubSectionNumberForSecurity}`;
		}
	}

	if (arePracticesIncluded) {
		secondSectionNumbers.practices = initialSecondSectionNumberForPractices;
		initialSecondSubSectionNumberForPractices += 1;

		thirdSectionNumbers.practices = `${initialThirdSectionNumberForPractices}`;
		initialSubSectionNumberForPractices += 1;
		// Dynamically add numbered entries for each llmResponses key
		for (const key of Object.keys(llmPracticesResponses)) {
			if (key in thirdSectionNumbers && key !== "Overall") {
				thirdSectionNumbers[key] = `${initialThirdSectionNumberForPractices}.${initialSubSectionNumberForPractices}`;
				initialSubSectionNumberForPractices += 1;
			}
		}
	}

	return { thirdSectionNumbers, secondSectionNumbers };
};

const renderEditedContent = async (response, token, reportId, section) => {
	const imageRegex = /!\[.*?]\((https:\/\/[^\s)]+)\)/g;
	const parts = [];
	let lastIndex = 0;

	let match;

	// create an array from the admin text divided in text and graph url
	 
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
		const graphPath = "src/components/nis2-report/tmp-graph-forlder";
		const trimedText = r.trim();
		// if the value strart with ![ is graph
		if (trimedText.startsWith("![")) {
			const data = { reportId, section, grathPath: r };
			const graph = await downloadReportGraph(token, data, "nis2");
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

const Nis2Report = ({
	violations,
	vulnerabilities,
	sast,
	llmSecurityViolationResponse,
	llmVulnerabilityResponse,
	llmSastResponse,
	llmResponseForPractices,
	llmResponseForConclusion,
	securityViolationsGraphPath,
	vulnerabilityGraphPath,
	sastGraphPath,
	practicesGraphPath,
	tmpSections,
	customSections,
	sectionsNumber,
	fileName,
	questionnaireName,
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

	const softwareSectionExist = sastSection || violationsSection || vulnerabilitiesSection;
	const thirdSectionExist = softwareSectionExist || practicesSection;

	return (
		<Document>
			<TddFirstPage title="NIS 2 Directive Compliance" service="nis2" />
			<TableOfContents dynamicSections={tmpSections} />
			<FirstSection
				addToTOC={addToTOC}
				fileName={fileName}
				questionnaireName={questionnaireName}
				text={introductionText}
				practicesOnly={!softwareSectionExist}
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
				service="nis2"
			/>
			{thirdSectionExist && (
				<CombinedComponents>
					{(thirdSectionExist) && (
						<ThirdSection
							addToTOC={addToTOC}
							thirdSectionExist={thirdSectionExist}
						/>
					)}

					{practicesSection && (
						<Practices
							llmResponseForPractices={llmResponseForPractices}
							practicesGraphPath={practicesGraphPath}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
							edit={edit}
						/>
					)}

					{softwareSectionExist && (<SectionHeader id="3.2" number="3.2" title="Software" addToTOC={addToTOC} level={1} />)}

					{sastSection && (
						<Sast
							sast={sast}
							llmSastResponse={llmSastResponse}
							sastGraphPath={sastGraphPath}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
							edit={edit}
						/>
					)}

					{vulnerabilitiesSection && (
						<Vulnerabilities
							vulnerabilities={vulnerabilities}
							vulnerabilityGraphPath={vulnerabilityGraphPath}
							llmVulnerabilityResponse={llmVulnerabilityResponse}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
							edit={edit}
						/>
					)}

					{violationsSection && (
						<SecurityViolations
							violations={violations.securityViolations}
							llmViolationResponse={llmSecurityViolationResponse}
							violationsGraphPath={securityViolationsGraphPath}
							addToTOC={addToTOC}
							sectionsNumber={sectionsNumber}
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

const getNis2Report = async (
	violations,
	vulnerabilities,
	sast,
	nis2Practices,
	customSections,
	fileName,
	questionnaireName,
	secVioResponse,
	vulResponse,
	sastResponse,
	practicesResponse,
	conclusionResponse,
	edit,
	token,
	nis2Id,
	stream = false,
) => {
	// get LLM messages
	// the edit variable is to know if the message is from the admin panel
	const llmSastResponse = edit ? await renderEditedContent(sastResponse, token, nis2Id, "Sast") : (sast?.totalSast > 0 ? await getMessageFromLlmForSast(sast) : "");
	const llmResponseForVulnerabilities = edit ? await renderEditedContent(vulResponse, token, nis2Id, "Vulnerabilities") : (vulnerabilities?.totalVulnerabilities > 0 ? await getMessageFromLlmForVulnerabilities(vulnerabilities) : "");
	const llmResponseForSecurityViolations = edit ? await renderEditedContent(secVioResponse, token, nis2Id, "Security_Violations") : (violations?.securityViolations?.totalViolations > 0 ? await getMessageFromLlmForSecurityViolations(violations.securityViolations) : "");
	let llmResponseForPractices = {};
	if (edit) {
		const tempResponses = {};
		for (const key in practicesResponse) {
			if (Object.prototype.hasOwnProperty.call(practicesResponse, key)) {
				const subsection = nis2SubsectionsMapping[key].replace(/\s+/g, "_");
				const fieldName = `Practices_${subsection}`;
				tempResponses[nis2SubsectionsMapping[key]] = await renderEditedContent(practicesResponse[key], token, nis2Id, `${fieldName}`);
			}
		}

		llmResponseForPractices = Object.keys(nis2Practices).length > 0
			? await createNis2PracticesSectionsMessages(nis2Practices, tempResponses) : {};
	} else {
		llmResponseForPractices = Object.keys(nis2Practices).length > 0
			? await createNis2PracticesSectionsMessages(nis2Practices) : {};
	}

	let llmResponseForConclusion = "";
	if (edit) {
		llmResponseForConclusion = await renderEditedContent(conclusionResponse, token, nis2Id, "Conclusion");
	} else {
		const llmResponses = {
			sast: llmSastResponse,
			vulnerabilities: llmResponseForVulnerabilities,
			securityViolations: llmResponseForSecurityViolations,
			practices: llmResponseForPractices.Overall.message,
		};

		const analysisFindings = { sast, vulnerabilities, violations };

		const { conclusionData, sections, llmRole } = prepareDataForConclusion(customSections, llmResponses, analysisFindings, "tdd");

		llmResponseForConclusion = await getMessageFromLlmForConclusion(conclusionData, sections, llmRole);
	}

	// path to store the graphs
	const graphPath = "src/components/nis2-report/tmp-graph-forlder";

	// created Plot graphs
	// sast
	const internalIdSast = generateRandomId();
	let sastGraphPath = null;
	if ((sast?.graphData?.xAxis?.length > 0 && sast?.graphData?.yAxis?.length > 0) && !edit) {
		sastGraphPath = path.join(graphPath, `${internalIdSast}.png`);
		generateChart(sast.graphData.xAxis, sast.graphData.yAxis, sastGraphPath, "sast");
		// await createdPlotGraph(sast.graphData.xAxis, sast.graphData.yAxis, "Vulnerability Type (CWE)", imageNameSast);
	}

	// vulnerabilities
	const internalIdVulnerabilities = generateRandomId();
	let vulnerabilityGraphPath = null;
	if ((vulnerabilities?.graphData?.xAxis?.length > 0 && vulnerabilities?.graphData?.yAxis?.length > 0) && !edit) {
		vulnerabilityGraphPath = path.join(graphPath, `${internalIdVulnerabilities}.png`);
		generateChart(vulnerabilities.graphData.xAxis, vulnerabilities.graphData.yAxis, vulnerabilityGraphPath, "vulnerabilities");
	}

	// create graph for security violations
	const internalIdSecurityViolations = generateRandomId();
	let securityViolationsGraphPath = null;
	if ((violations?.securityViolations?.graphData?.xAxis?.length > 0
		&& violations?.securityViolations?.graphData?.yAxis?.length > 0)) {
		securityViolationsGraphPath = path.join(graphPath, `${internalIdSecurityViolations}.png`);
		generateChart(violations.securityViolations.graphData.xAxis,
			violations.securityViolations.graphData.yAxis,
			securityViolationsGraphPath,
			"security violations");
	}

	// practices
	const internalIdPractices = generateRandomId();
	let practicesGraphPath = null;
	if (Object.keys(llmResponseForPractices).length > 0 && !edit) {
		practicesGraphPath = path.join(graphPath, `${internalIdPractices}.png`);
		const xAxis = Object.keys(llmResponseForPractices);
		const yAxis = Object.values(llmResponseForPractices).map((category) => category.overallScorePercentage);
		generateChart(xAxis, yAxis, practicesGraphPath, "cybersecurity practices");
	}

	const sectionsNumber = getSectionNumbers(customSections, llmResponseForPractices);
	// DO NOT REMOVE THIS
	// This handles Table Of Contents
	const report = await ReactPDF.renderToStream(
		<Nis2Report
			violations={violations}
			vulnerabilities={vulnerabilities}
			sast={sast}
			llmSecurityViolationResponse={llmResponseForSecurityViolations}
			llmVulnerabilityResponse={llmResponseForVulnerabilities}
			llmSastResponse={llmSastResponse}
			llmResponseForPractices={llmResponseForPractices}
			llmResponseForConclusion={llmResponseForConclusion}
			securityViolationsGraphPath={securityViolationsGraphPath}
			vulnerabilityGraphPath={vulnerabilityGraphPath}
			sastGraphPath={sastGraphPath}
			practicesGraphPath={practicesGraphPath}
			sectionsNumber={sectionsNumber}
			customSections={customSections}
			fileName={fileName}
			questionnaireName={questionnaireName}
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
		<Nis2Report
			violations={violations}
			vulnerabilities={vulnerabilities}
			sast={sast}
			llmSecurityViolationResponse={llmResponseForSecurityViolations}
			llmVulnerabilityResponse={llmResponseForVulnerabilities}
			llmSastResponse={llmSastResponse}
			llmResponseForPractices={llmResponseForPractices}
			llmResponseForConclusion={llmResponseForConclusion}
			securityViolationsGraphPath={securityViolationsGraphPath}
			vulnerabilityGraphPath={vulnerabilityGraphPath}
			sastGraphPath={sastGraphPath}
			practicesGraphPath={practicesGraphPath}
			tmpSections={sortedSections}
			sectionsNumber={sectionsNumber}
			customSections={customSections}
			fileName={fileName}
			questionnaireName={questionnaireName}
			edit={edit}
			token={token}
		/>,
	);

	if (stream) return finalReport;
	const finalResponseReport = await getStream(finalReport, { encoding: "base64" });

	return {
		report: finalResponseReport,
		llmResponseForSecurityViolations,
		llmResponseForVulnerabilities,
		llmSastResponse,
		llmResponseForPractices,
		llmResponseForConclusion,
		sastGraphPath,
		vulnerabilityGraphPath,
		securityViolationsGraphPath,
		practicesGraphPath,
	};
};

Nis2Report.propTypes = {
	violations: PropTypes.object,
	vulnerabilities: PropTypes.object,
	sast: PropTypes.object,
	llmSecurityViolationResponse: PropTypes.any,
	llmVulnerabilityResponse: PropTypes.any,
	llmSastResponse: PropTypes.any,
	llmResponseForPractices: PropTypes.object,
	llmResponseForConclusion: PropTypes.any,
	sastGraphPath: PropTypes.string,
	securityViolationsGraphPath: PropTypes.string,
	vulnerabilityGraphPath: PropTypes.string,
	practicesGraphPath: PropTypes.string,
	tmpSections: PropTypes.array,
	customSections: PropTypes.object,
	sectionsNumber: PropTypes.object,
	fileName: PropTypes.string,
	questionnaireName: PropTypes.string,
	edit: PropTypes.bool,
};

export default getNis2Report;

