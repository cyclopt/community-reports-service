import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.js";

const QualityScore = ({ score }) => (
	<View wrap={false} style={styles.qualityScore}>
		<View style={{ width: "70%", fontStyle: "medium", fontSize: "11px", padding: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Text>
				{"Overall Repository Rating: "}
			</Text>
		</View>
		<View style={{ padding: "5px", border: "2px solid #005792", display: "flex", justifyContent: "center", alignItems: "center", fontStyle: "medium", fontSize: "25px", color: "white", backgroundColor: "#005792", width: "30%", borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}>
			<Text>
				{score}
			</Text>
		</View>
	</View>
);

QualityScore.propTypes = {
	score: PropTypes.string,
};

export default QualityScore;
