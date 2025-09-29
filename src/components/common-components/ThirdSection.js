import { Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import BodyText from "./BodyText.js";
import BoldText from "./BoldText.js";
import SectionHeader from "./SectionHeader.js";

const ThirdSection = ({ addToTOC }) => (
	<>
		<SectionHeader id="3" number="3." title="REVIEW PHASE" addToTOC={addToTOC} level={0} />
		<BodyText>
			{"The review involved gathering key information about the project, including its objectives, context, and technical environment. This helped surface current development practices, existing challenges, and expectations related to security and maintainability."}
		</BodyText>
		<Text styles={{ paddingTop: 1 }}>
			{" "}
		</Text>
		<BodyText>
			{"Relevant project assets such as code repositories, documentation, and infrastructure were accessed to support a thorough evaluation. The assessment focused on critical areas like security and maintainability, using techniques such as code quality analysis, issue detection, and identification of code duplication. This established a clear view of the project's current state."}
		</BodyText>
		<Text styles={{ paddingTop: 1 }}>
			{" "}
		</Text>
		<BodyText>
			{"The resulting insights provide a reference for tracking progress and identifying priorities for future improvements."}
		</BodyText>
	</>
);

BodyText.propTypes = {
	children: PropTypes.node.isRequired,
};

BoldText.propTypes = {
	children: PropTypes.node.isRequired,
};

SectionHeader.propTypes = {
	number: PropTypes.string,
	title: PropTypes.string,
};

ThirdSection.propTypes = {
	addToTOC: PropTypes.func.isRequired,
};

export default ThirdSection;
