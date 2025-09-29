import { Image, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import BodyText from "./BodyText.js";
import BulletPoint from "./BulletPoint.js";
import EnhancedSeverityText from "./EnhancedSeverityText.js";
import SectionHeader from "./SectionHeader.js";

const Sast = ({ sast, llmSastResponse, sastGraphPath, addToTOC, sectionsNumber, edit }) => (
	<>
		<SectionHeader
			id={sectionsNumber.thirdSectionNumbers.sast.toString()}
			number={sectionsNumber.thirdSectionNumbers.sast.toString()}
			title="Security Code Vulnerabilities"
			addToTOC={addToTOC}
			level={2}
		/>

		{edit ? (
			<>
				{llmSastResponse.length > 0 ? (
					llmSastResponse.map((l, i) => (
						<div key={i}>{l}</div>
					))
				) : (
					<BodyText>
						{"No Security Code Vulnerabilities were detected during the evaluation. The codebase demonstrates adherence to secure development practices."}
					</BodyText>
				)}

				{Object.keys(sast?.cwe).length > 0 && (
					<>
						<BodyText>
							{"The identified vulnerabilities belong to the following vulnerability types categorized by severity:"}
						</BodyText>

						{Object.entries(sast.cwe).map(([severity, items]) => (
							<React.Fragment key={severity}>
								<EnhancedSeverityText severity={severity} />
								{items.map((c, index) => (
									<BulletPoint key={index} component title={c.name} description={c.description} />
								))}
							</React.Fragment>
						))}
					</>
				)}
			</>
		) : (
			<>
				{(llmSastResponse?.length > 0 || (sast?.graphData?.xAxis?.length > 0 && sast?.graphData?.yAxis?.length > 0)
					|| Object.keys(sast?.cwe)?.length > 0) ? (
						<>
							<BodyText>{llmSastResponse}</BodyText>
							{(sast?.graphData?.xAxis?.length > 0 && sast?.graphData?.yAxis?.length > 0) && (
								<>
									<Image src={sastGraphPath} style={{ width: "auto" }} />
									<Text styles={{ paddingTop: 3 }}>
										{" "}
									</Text>
								</>
							)}

							{Object.keys(sast?.cwe).length > 0 && (
								<>
									<BodyText>
										{"The identified vulnerabilities have been categorized based on the most severe level associated with each type as follows:"}
									</BodyText>

									{Object.entries(sast.cwe).map(([severity, items]) => (
										<React.Fragment key={severity}>
											<EnhancedSeverityText severity={severity} />
											{items.map((c, index) => (
												<BulletPoint key={index} component title={c.name} description={c.description} />
											))}
										</React.Fragment>
									))}
								</>
							)}
						</>
					) : (
						<BodyText>
							{"No Security Code Vulnerabilities were detected during the evaluation. The codebase demonstrates adherence to secure development practices."}
						</BodyText>
					)}
			</>
		)}

	</>
);

Sast.propTypes = {
	sast: PropTypes.object.isRequired,
	llmSastResponse: PropTypes.any,
	sastGraphPath: PropTypes.string,
	addToTOC: PropTypes.func.isRequired,
	sectionsNumber: PropTypes.object,
	edit: PropTypes.bool,
};

export default Sast;
