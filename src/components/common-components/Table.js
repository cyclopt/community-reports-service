import { View, Text, Image } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import { getSeverityIcon } from "../../utils/index.js";
import styles from "../common-report/styles.js";

const Table = ({ rows, addIntroducedViaColumn }) => {
	// Define column widths dynamically based on the category of security vulnerabilities
	// if they belong to "Other Security Vulnerabilities" there is an extra column "Introduced Via"
	const columnWidths = addIntroducedViaColumn ? ["28%", "28%", "28%", "16%"] : ["40%", "40%", "20%"];
	return (
		<View style={styles.table}>
			{/* Table Header */}
			<View style={styles.tableRow} wrap={false}>
				<View style={[styles.tableColHeader, { width: columnWidths[0] }]}><Text style={styles.tableHeaderCell}>{"Vulnerable Package"}</Text></View>
				<View style={[styles.tableColHeader, { width: columnWidths[1] }]}><Text style={styles.tableHeaderCell}>{"Vulnerable Version"}</Text></View>
				{addIntroducedViaColumn && <View style={[styles.tableColHeader, { width: columnWidths[2] }]}><Text style={styles.tableHeaderCell}>{"Introduced Via"}</Text></View>}
				<View style={[styles.tableColHeader, { width: columnWidths[addIntroducedViaColumn ? 3 : 2] }]}><Text style={styles.tableHeaderCell}>{"Severity"}</Text></View>
			</View>

			{/* Table Rows */}
			{rows.map((item, idx) => (
				<View key={idx} style={styles.tableRow} wrap={false}>
					<View style={[styles.tableCol, { width: columnWidths[0] }]}>
						<Text style={styles.tableCell}>{item.packageName}</Text>
					</View>
					<View style={[styles.tableCol, { width: columnWidths[1] }]}><Text style={styles.tableCell}>{item.range}</Text></View>
					{addIntroducedViaColumn
						&& (
							<View style={[styles.tableCol, { width: columnWidths[2] }]}>
								<Text style={styles.tableCell}>{item.introducedVia}</Text>
							</View>
						)}
					<View style={[styles.tableCol, { width: columnWidths[addIntroducedViaColumn ? 3 : 2] }]}>
						<Image
							style={{ width: 15, height: 15, flexShrink: 0 }}
							src={getSeverityIcon(item.severity)}
						/>
					</View>
				</View>
			))}
		</View>
	);
};

Table.propTypes = {
	rows: PropTypes.array.isRequired,
	addIntroducedViaColumn: PropTypes.bool,
};

export default Table;
