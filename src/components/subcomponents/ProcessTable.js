import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.js";

const ProcessTable = ({ maintainability = false, security = false, readability = false, reuseability = false }) => (
	<View wrap={false}>
		<View style={styles.processTable}>
			<View style={styles.processTableHeaders}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%", fontStyle: "medium", width: "100%", textAlign: "center" }]}>{"Characteristic"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%", fontStyle: "medium", textAlign: "center" }]}>{"Required Data"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%", borderRight: "0", fontStyle: "medium", textAlign: "center" }]}>{"Data Provided"}</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%" }]}>{"Maintainability"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%" }]}>{"Source Code"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%", borderRight: "0", textAlign: "center" }]}>{maintainability ? "Yes" : "No"}</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%" }]}>{"Security"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%" }]}>{"Source Code, Dependencies"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%", borderRight: "0", textAlign: "center" }]}>{security ? "Yes" : "No"}</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%" }]}>{"Readability"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%" }]}>{"Source Code"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%", borderRight: "0", textAlign: "center" }]}>{readability ? "Yes" : "No"}</Text>
			</View>
			<View style={styles.processTableRow}>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%" }]}>{"Reuseability"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "200%" }]}>{"Source Code, Dependencies"}</Text>
				<Text style={[styles.processTableHeaderCell, { flexBasis: "120%", borderRight: "0", textAlign: "center" }]}>{reuseability ? "Yes" : "No"}</Text>
			</View>
		</View>
	</View>
);

ProcessTable.propTypes = {
	maintainability: PropTypes.bool,
	security: PropTypes.bool,
	readability: PropTypes.bool,
	reuseability: PropTypes.bool,
};

export default ProcessTable;
