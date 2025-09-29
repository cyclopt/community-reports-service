import { Image, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import BodyText from "./BodyText.js";
import BulletPoint from "./BulletPoint.js";
import EnhancedSeverityText from "./EnhancedSeverityText.js";
import SectionHeader from "./SectionHeader.js";

const SecurityViolations = ({ violations, llmViolationResponse, violationsGraphPath, addToTOC, sectionsNumber, edit }) => (
	<>
		{/* Security Coding Violations Header */}
		<SectionHeader
			id={sectionsNumber.thirdSectionNumbers.securityViolations.toString()}
			number={sectionsNumber.thirdSectionNumbers.securityViolations.toString()}
			title="Security Coding Violations"
			addToTOC={addToTOC}
			level={2}
		/>
		{edit ? (
			<>
				{llmViolationResponse.length > 0 ? (
					llmViolationResponse.map((l, i) => (
						<div key={i}>{l}</div>
					))
				) : (
					<BodyText>
						{"No violations categorized under Security were detected during the evaluation. The codebase appears to be in compliance with relevant security requirements."}
					</BodyText>
				)}

				{Object.entries(violations?.violationsPerSeverity).map(([severity, items]) => {
					if (items?.length > 0) {
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
			<>
				{Object.values(violations?.violationsPerSeverity).some((viol) => viol.length > 0) ? (
					<>
						<BodyText>{llmViolationResponse}</BodyText>

						<Text styles={{ paddingTop: 1 }}> </Text>

						{violations?.graphData?.xAxis?.length > 0 && violations?.graphData?.yAxis?.length > 0 && (
							<>
								<Image src={violationsGraphPath} style={{ width: "auto" }} />
								<Text styles={{ paddingTop: 3 }}>
									{" "}
								</Text>
							</>
						)}

						{Object.entries(violations?.violationsPerSeverity).map(([severity, items]) => {
							if (items?.length > 0) {
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
						{"No violations categorized under Security were detected during the evaluation. The codebase appears to be in compliance with relevant security requirements."}
					</BodyText>
				)}
			</>
		)}
	</>
);

SecurityViolations.propTypes = {
	violations: PropTypes.object.isRequired,
	llmViolationResponse: PropTypes.any,
	violationsGraphPath: PropTypes.string,
	addToTOC: PropTypes.func.isRequired,
	sectionsNumber: PropTypes.object,
	edit: PropTypes.bool,
};

export default SecurityViolations;
