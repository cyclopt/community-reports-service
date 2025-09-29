import { View, Page } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

import BodyText from "./BodyText.js";
import Footer from "./Footer.js";
import SectionHeader from "./SectionHeader.js";
import SubHeader from "./SubHeader.js";

 
import { extractParagraphs } from "#utils";

const ConclusionSection = ({ addToTOC, llmResponseForConclusion, edit }) => {
	const messageParagraphs = edit ? "" : extractParagraphs(llmResponseForConclusion);
	return (
		<Page size="A4" orientation="portrait">
			<SubHeader />
			<View style={styles.container}>
				<SectionHeader id="4" number="4. " title="CONCLUSION" addToTOC={addToTOC} level={0} />
				{edit ? (
					llmResponseForConclusion.map((l, i) => (
						<div key={i}>{l}</div>
					))
				) : (
					messageParagraphs.map((paragraph, index) => (
						<BodyText key={index}>{paragraph}</BodyText>
					))
				)}
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

ConclusionSection.propTypes = {
	addToTOC: PropTypes.func.isRequired,
	llmResponseForConclusion: PropTypes.any,
	edit: PropTypes.bool,
};

export default ConclusionSection;
