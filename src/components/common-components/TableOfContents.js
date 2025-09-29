import { Text, View, Link, Page } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

import Footer from "./Footer.js";
import SubHeader from "./SubHeader.js";

// Reusable component for TOC entries

const TOCEntry = ({ title, page, link, level = 0 }) => {
	// Apply black color to main sections (level 0)
	const textColor = level === 0 ? "rgb(31, 77, 121)" : "black";

	return (
		<View style={[styles.row, { marginLeft: level * 15, paddingBottom: 5 }]}>
			<Link src={link} style={[styles.text, { color: textColor, textDecoration: "none" }]}>
				{title}
			</Link>
			<Text style={styles.dottedLine} />
			<Text style={styles.pageNumber}>{` ${page}`}</Text>
		</View>
	);
};

const TableOfContents = ({ dynamicSections }) => (
	<Page size="A4" orientation="portrait">
		<SubHeader />
		<View style={styles.container}>
			{/* Title */}
			<Text style={{
				textAlign: "center",
				fontSize: 16,
				textTransform: "uppercase",
				color: "#00426e",
				fontFamily: "Commissioner",
				fontStyle: "bold",
				paddingBottom: 10,
			}}
			>
				{"TABLE OF CONTENTS"}
			</Text>

			{dynamicSections?.length > 0 && dynamicSections.map((section, index) => (
				<TOCEntry
					key={index}
					title={`${section.sectionNumber} ${section.sectionTitle}`}
					page={`${section.pageNumber}`}
					link={`#${section.id}`}
					level={section.level}
				/>
			))}

		</View>

		<View fixed render={({ pageNumber }) => <Footer pageNumber={pageNumber} />} />
	</Page>
);

TableOfContents.propTypes = {
	dynamicSections: PropTypes.arrayOf(
		PropTypes.shape({
			sectionNumber: PropTypes.string,
			sectionTitle: PropTypes.string,
			pageNumber: PropTypes.number,
			id: PropTypes.string,
		}),
	),
};

TOCEntry.propTypes = {
	title: PropTypes.string,
	page: PropTypes.string,
	link: PropTypes.string,
	level: PropTypes.number,
};

export default TableOfContents;
