import { Image, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import BodyText from "./BodyText.js";
import BulletPoint from "./BulletPoint.js";
import SectionHeader from "./SectionHeader.js";
import Table from "./Table.js";

const Vulnerabilities = ({
	vulnerabilities,
	llmVulnerabilityResponse,
	vulnerabilityGraphPath,
	addToTOC,
	sectionsNumber,
	edit,
}) => (
	<>
		<SectionHeader
			id={sectionsNumber.thirdSectionNumbers.vulnerabilities.toString()}
			number={sectionsNumber.thirdSectionNumbers.vulnerabilities.toString()}
			title="Security Dependencies Vulnerabilities"
			addToTOC={addToTOC}
			level={2}
		/>

		{/* if edit mode */}
		{edit ? (
			<>
				{llmVulnerabilityResponse.length > 0 ? (
					llmVulnerabilityResponse.map((l, i) => (
						<div key={i}>{l}</div>
					))
				) : (
					<BodyText>
						{"No security vulnerabilities were identified during the assessment. The codebase demonstrates strong security posture based on the evaluated parameters."}
					</BodyText>
				)}

				{vulnerabilities?.cwe?.length > 0
				&& vulnerabilities.cwe.map((c, index) => (
					<BulletPoint
						key={index}
						component
						title={c.name}
						description={c.description}
						vulnerableVersion={c.range}
					/>
				))}
			</>
		) : (
			<>
				{/* if no edit mode */}
				{(vulnerabilities?.graphData?.xAxis?.length > 0
				&& vulnerabilities?.graphData?.yAxis?.length > 0)
				|| vulnerabilities?.cwe?.length > 0
					? (
						<>
							<BodyText>{llmVulnerabilityResponse}</BodyText>

							<Text styles={{ paddingTop: 1 }}> </Text>

							{vulnerabilities?.graphData?.xAxis?.length > 0 && vulnerabilities?.graphData?.yAxis?.length > 0 && (
								<>
									<Image src={vulnerabilityGraphPath} style={{ width: "auto" }} />
									<Text styles={{ paddingTop: 3 }}> </Text>
								</>
							)}

							{vulnerabilities?.cwe?.length > 0
									&& vulnerabilities.cwe.map((c, index) => (
										<React.Fragment key={index}>
											<BulletPoint
												component
												title={c.name}
												description={c.description}
											/>
											<Table rows={c.metaData} addIntroducedViaColumn={c.metaData.some((entry) => entry.introducedVia)} />
										</React.Fragment>
									))}
						</>
					) : (
						<BodyText>
							{"No security vulnerabilities were identified during the assessment. The codebase demonstrates strong security posture based on the evaluated parameters."}
						</BodyText>
					)}
			</>
		)}
	</>
);

Vulnerabilities.propTypes = {
	vulnerabilities: PropTypes.object.isRequired,
	llmVulnerabilityResponse: PropTypes.any,
	vulnerabilityGraphPath: PropTypes.string,
	addToTOC: PropTypes.func.isRequired,
	sectionsNumber: PropTypes.object,
	edit: PropTypes.bool,
};

export default Vulnerabilities;
