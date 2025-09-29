import { Image, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import BodyText from "../common-components/BodyText.js";
import SectionHeader from "../common-components/SectionHeader.js";

 
import { extractParagraphs } from "#utils";

const Practices = ({ llmResponseForPractices, practicesGraphPath, addToTOC, sectionsNumber, edit }) => (
	<>
		<SectionHeader id="3.1" number="3.1" title="Cybersecurity Practices" addToTOC={addToTOC} level={1} />
		{edit ? (
			<>
				{Object.keys(llmResponseForPractices).length > 0 && Object.keys(llmResponseForPractices.Overall).length > 0 && (
					<>
						{llmResponseForPractices.Overall.message.map((l, i) => (
							<div key={i}>{l}</div>
						))}
					</>

				)}
				{Object.entries(llmResponseForPractices).map(([key, value]) => {
					if (key === "Overall") return null;
					return (
						<React.Fragment key={key}>
							<SectionHeader
								id={`${sectionsNumber.thirdSectionNumbers[key] || key}`}
								number={`${sectionsNumber.thirdSectionNumbers[key] || key}`}
								title={key}
								addToTOC={addToTOC}
								level={2}
								risk={value.overallRisk}
							/>
							{value.message.map((l, i) => (
								<div key={i}>{l}</div>
							))}
						</React.Fragment>
					);
				})}
			</>
		) : (
			<>
				{Object.keys(llmResponseForPractices).length > 0 && Object.keys(llmResponseForPractices.Overall).length > 0 && (() => {
					const messageParagraphs = extractParagraphs(llmResponseForPractices.Overall.message);
					return (
						<>
							{messageParagraphs.map((paragraph, index) => (
								<BodyText key={index}>{paragraph}</BodyText>
							))}
							<Text styles={{ paddingTop: 1 }}> </Text>
							<Image src={practicesGraphPath} style={{ width: "auto" }} />
							<Text styles={{ paddingTop: 3 }}> </Text>
						</>
					);
				})()}
				{Object.entries(llmResponseForPractices).map(([key, value]) => {
					if (key === "Overall") return null;
					const messageParagraphs = extractParagraphs(value.message);
					return (
						<React.Fragment key={key}>
							<SectionHeader
								id={`${sectionsNumber.thirdSectionNumbers[key] || key}`}
								number={`${sectionsNumber.thirdSectionNumbers[key] || key}`}
								title={key}
								addToTOC={addToTOC}
								level={2}
								risk={value.overallRisk}
							/>
							{messageParagraphs.map((paragraph, index) => (
								<BodyText key={index}>{paragraph}</BodyText>
							))}
						</React.Fragment>
					);
				})}
			</>
		)}
	</>
);

Practices.propTypes = {
	llmResponseForPractices: PropTypes.object.isRequired,
	practicesGraphPath: PropTypes.string,
	addToTOC: PropTypes.func.isRequired,
	sectionsNumber: PropTypes.object,
	edit: PropTypes.bool,
};

export default Practices;
