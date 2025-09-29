import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.js";

const numberFormatter = Intl.NumberFormat("en-US");

const FindingsTable = ({
	analyzedLOC,
	sourceCodeFiles,
	sourceCodeClasses,
	duplicateCode,
	maintanabilityIndex,
	cyclomaticComplexity,
	violations,
	commentsDensity,
}) => (
	<View wrap={false}>
		<View style={[styles.processTable, { width: "80%", margin: "auto" }]}>
			<View style={styles.processTableHeaders}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", fontSize: "12px", borderRight: "0", fontStyle: "medium" }]}>
					{"Metric"}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", fontSize: "12px", textAlign: "center", fontStyle: "medium" }]}>
					{"Value"}
				</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", borderRight: "0", fontStyle: "medium" }]}>
					{"Line Of Code Analyzed"}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", textAlign: "center" }]}>
					{numberFormatter.format(Math.round((analyzedLOC * 100) / 100))}
				</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", borderRight: "0", fontStyle: "medium" }]}>
					{`Number of ${Number.isInteger(sourceCodeFiles) ? "Source Code Files" : "Classes"}`}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", textAlign: "center" }]}>
					{Math.round(Number.isInteger(sourceCodeFiles) ? sourceCodeFiles : sourceCodeClasses)}
				</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", borderRight: "0", fontStyle: "medium" }]}>
					{"Duplicate Code"}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", textAlign: "center" }]}>
					{`${Math.round((duplicateCode * 100) / 100)}%`}
				</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", borderRight: "0", fontStyle: "medium" }]}>
					{"Maintainability Index"}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", textAlign: "center" }]}>
					{numberFormatter.format(Math.round((maintanabilityIndex * 100) / 100))}
				</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", borderRight: "0", fontStyle: "medium" }]}>
					{"Cyclomatic Complexity"}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", textAlign: "center" }]}>
					{numberFormatter.format(Math.round(cyclomaticComplexity * 100) / 100)}
				</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", borderRight: "0", fontStyle: "medium" }]}>
					{"Total Number of Violations"}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", textAlign: "center" }]}>
					{numberFormatter.format(Math.round(violations))}
				</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", borderRight: "0", fontStyle: "medium" }]}>
					{"Comments Density"}
				</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "80%", borderRight: "0", textAlign: "center" }]}>
					{`${Math.round((commentsDensity * 100) / 100)}%`}
				</Text>
			</View>
		</View>
	</View>
);

FindingsTable.propTypes = {
	analyzedLOC: PropTypes.number,
	sourceCodeFiles: PropTypes.number,
	sourceCodeClasses: PropTypes.number,
	duplicateCode: PropTypes.number,
	maintanabilityIndex: PropTypes.number,
	cyclomaticComplexity: PropTypes.number,
	violations: PropTypes.number,
	commentsDensity: PropTypes.number,
};

export default FindingsTable;
