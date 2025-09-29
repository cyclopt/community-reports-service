import { Text, Image } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import extractParagraphs from "../../utils/extract-paragraphs.js";
import BodyText from "../common-components/BodyText.js";
import BulletPoint from "../common-components/BulletPoint.js";
import EnhancedSeverityText from "../common-components/EnhancedSeverityText.js";
import SectionHeader from "../common-components/SectionHeader.js";

const Maintainability = ({ violations,
	llmMaintainabilityResponse,
	llmViolationResponse,
	violationsGraphPath,
	addToTOC,
	sectionsNumber,
	metricsSection,
	edit,
}) => {
	const messageParagraphs = edit ? "" : extractParagraphs(llmMaintainabilityResponse);
	return (
		<>
			<Text styles={{ paddingTop: 3 }}>
				{" "}
			</Text>

			<SectionHeader id={sectionsNumber.thirdSectionNumbers.maintainability} number={sectionsNumber.thirdSectionNumbers.maintainability} title="Maintainability" addToTOC={addToTOC} level={1} />

			{metricsSection && (
				<>
					<SectionHeader
						id={sectionsNumber.thirdSectionNumbers["Static Analysis Metrics"]}
						number={sectionsNumber.thirdSectionNumbers["Static Analysis Metrics"]}
						title="Static Analysis Metrics"
						addToTOC={addToTOC}
						level={2}
					/>

					{edit ? (
						<BodyText>{llmMaintainabilityResponse}</BodyText>
					) : (
						messageParagraphs.map((paragraph, index) => (
							<BodyText key={index}>{paragraph}</BodyText>
						))
					)}

					<Text styles={{ paddingBottom: 1 }}>
						{" "}
					</Text>
				</>
			)}

			{edit ? (
				<>

					<Text styles={{ paddingTop: 1 }}>
						{" "}
					</Text>

					{/* Coding Violations */}
					<SectionHeader
						id={sectionsNumber.thirdSectionNumbers["Coding Violations"]}
						number={sectionsNumber.thirdSectionNumbers["Coding Violations"].toString()}
						title="Coding Violations"
						addToTOC={addToTOC}
						level={2}
					/>

					{llmViolationResponse.map((l, i) => (
						<div key={i}>{l}</div>
					))}

					{llmViolationResponse.length > 0 ? (
						llmViolationResponse.map((l, i) => (
							<div key={i}>{l}</div>
						))
					) : (
						<BodyText>
							{"No violations classified as Critical or Major severity were identified in the reviewed codebase. This indicates an absence of high-impact risks at the time of assessment."}
						</BodyText>
					)}

					{Object.values(violations?.severityViolations?.generalStats || {}).some((count) => count > 0) && (
						<>
							<BodyText>
								{"The respective violation types categorized by severity:"}
							</BodyText>

							{Object.entries(violations.severityViolations.violationsPerSeverity).map(([severity, items]) => {
								if (items.length > 0) {
									return (
										<React.Fragment key={severity}>
											<EnhancedSeverityText severity={severity} />
											{items.map((c, index) => (
												<BulletPoint key={index} component title={c.name} description={c.description} />
											))}
										</React.Fragment>
									);
								}

								return null;
							})}
						</>
					)}
				</>
			) : (
				<>
					<Text styles={{ paddingTop: 1 }}>
						{" "}
					</Text>

					{/* Coding Violations */}
					<SectionHeader
						id={sectionsNumber.thirdSectionNumbers["Coding Violations"]}
						number={sectionsNumber.thirdSectionNumbers["Coding Violations"].toString()}
						title="Coding Violations"
						addToTOC={addToTOC}
						level={2}
					/>

					{llmViolationResponse?.length > 0 && (
						<>

							<BodyText>{llmViolationResponse}</BodyText>
							<Text styles={{ paddingTop: 1 }}>
								{" "}
							</Text>
						</>
					)}

					{violations?.graphData?.xAxis?.length > 0 && violations?.graphData?.yAxis?.length > 0 && (
						<>
							<Image src={violationsGraphPath} style={{ width: "auto" }} />
							<Text styles={{ paddingTop: 3 }}>
								{" "}
							</Text>
						</>
					)}

					{Object.values(violations?.severityViolations?.generalStats || {}).some((count) => count > 0) ? (
						<>
							<BodyText>
								{"The respective violation types categorized by severity:"}
							</BodyText>

							{Object.entries(violations.severityViolations.violationsPerSeverity).map(([severity, items]) => {
								if (items.length > 0) {
									return (
										<React.Fragment key={severity}>
											<EnhancedSeverityText severity={severity} />
											{items.map((c, index) => (
												<BulletPoint key={index} component title={c.name} description={c.description} />
											))}
										</React.Fragment>
									);
								}

								return null;
							})}
						</>
					) : (
						<BodyText>
							{"No violations classified as Critical or Major severity were identified in the reviewed codebase. This indicates an absence of high-impact risks at the time of assessment."}
						</BodyText>
					)}
				</>
			)}

		</>

	);
};

Maintainability.propTypes = {
	llmMaintainabilityResponse: PropTypes.any,
	addToTOC: PropTypes.func.isRequired,
	llmViolationResponse: PropTypes.any,
	violationsGraphPath: PropTypes.string,
	violations: PropTypes.object.isRequired,
	sectionsNumber: PropTypes.object,
	metricsSection: PropTypes.bool,
	edit: PropTypes.bool,
};

export default Maintainability;
