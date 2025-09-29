import { Text, View, Page } from "@react-pdf/renderer";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";

import BodyText from "../common-components/BodyText.js";
import BoldText from "../common-components/BoldText.js";
import BulletPoint from "../common-components/BulletPoint.js";
import Footer from "../common-components/Footer.js";
import SectionHeader from "../common-components/SectionHeader.js";
import SubHeader from "../common-components/SubHeader.js";
import styles from "../common-report/styles.js";

const FirstSection = ({ addToTOC, fileName, questionnaireName, text, practicesOnly }) => {
	const textSelector = practicesOnly ? "practicesOnly" : "softwareAndPractices";
	return (
		<Page size="A4" orientation="portrait">
			<SubHeader />

			<View style={styles.container}>

				<SectionHeader id="1" number="1." title="INTRODUCTION" addToTOC={addToTOC} level={0} />

				<BodyText>
					{"This document constitutes the comprehensive "}
					<BoldText>{"NIS 2 Compliance"}</BoldText>
					{" report for the "}
					<BoldText>{questionnaireName}</BoldText>
					{" questionnaire"}
					{!practicesOnly && (
						<>
							{" and " }
							<BoldText>{fileName}</BoldText>
							{" source code" }
						</>
					)}
					{" with creation date "}
					<BoldText>{dayjs().format("DD/MM/YYYY")}</BoldText>

					{" prepared by "}
					<BoldText>{"Cyclopt"}</BoldText>
					{text.introduction.purpose}
				</BodyText>

				<Text styles={{ paddingTop: 1 }}>
					{" "}
				</Text>

				<BodyText>
					{text.introduction.importance}
				</BodyText>

				<Text styles={{ paddingTop: 1 }}>
					{" "}
				</Text>

				<BodyText>
					{text.introduction.goal}
				</BodyText>

				<SectionHeader id="1.1" number="1.1" title="Scope" addToTOC={addToTOC} level={1} />
				<BodyText>
					{text.scope[textSelector].introduction}
				</BodyText>

				<Text styles={{ paddingTop: 1 }}>
					{" "}
				</Text>

				{/* Bullet Points */}
				{text.scope[textSelector]?.firstAxis && text.scope[textSelector]?.secondAxis && (
					<>
						<BulletPoint
							title={text.scope[textSelector].firstAxis.title}
							description={text.scope[textSelector].firstAxis.description}
						/>
						<BulletPoint
							title={text.scope[textSelector].secondAxis.title}
							description={text.scope[textSelector].secondAxis.description}
						/>
						<Text styles={{ paddingTop: 1 }}>
							{" "}
						</Text>
					</>
				)}

				<BodyText>
					{text.scope[textSelector].conclusion}
				</BodyText>

				<SectionHeader id="1.2" number="1.2" title="Process" addToTOC={addToTOC} level={1} />

				{/* Process Section Paragraphs */}
				{Object.values(text.process[textSelector]).map((value, idx, arr) => (
					<React.Fragment key={idx}>
						<BodyText>
							{value}
						</BodyText>
						{idx < arr.length - 1 && (
							<Text styles={{ paddingTop: 1 }}>
								{" "}
							</Text>
						)}
					</React.Fragment>
				))}

				<SectionHeader id="1.3" number="1.3" title="Report Structure" addToTOC={addToTOC} level={1} />

				<BodyText>{"This report is divided into the following sections:"}</BodyText>

				{/* Report Structure Bullet Points */}
				{Object.values(text.structure[textSelector]).map((value, idx) => (
					<React.Fragment key={idx}>
						<BulletPoint
							title={value.title}
							description={value.description}
						/>
					</React.Fragment>
				))}

				{/* <BulletPoint
				title="Mid-Term Review: "
				description="A follow-up assessment, tracking progress on previously identified issues and any new concerns."
			/>

			<BulletPoint
				title="Final Review: "
				description="The concluding evaluation,
				ensuring that all critical issues have been addressed and providing final recommendations."
			/> */}

				<Text styles={{ paddingTop: 1 }}>
					{" "}
				</Text>

				<BodyText>{"This structured approach ensures that stakeholders receive a comprehensive and transparent evaluation of the portal’s technical foundation, enabling data-driven decision-making."}</BodyText>

			</View>

			<View
				fixed
				render={({ pageNumber }) => (
					<Footer pageNumber={pageNumber} />
				)}
			/>

		</Page>
	);
};

FirstSection.propTypes = {
	addToTOC: PropTypes.func.isRequired,
	fileName: PropTypes.string,
	questionnaireName: PropTypes.string,
	text: PropTypes.object,
	practicesOnly: PropTypes.bool,
};

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

BulletPoint.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
};

export default FirstSection;
