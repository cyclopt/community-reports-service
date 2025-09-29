import { View, Text, Image } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import { getSeverityIcon } from "../../utils/index.js";
import styles from "../common-report/styles.js";

import BoldText from "./BoldText.js";

const EnhancedSeverityText = ({ severity }) => (
	<View style={styles.enhancedSeverityText}>
		<Image
			style={{ height: 18, width: 18, marginRight: 6, flexShrink: 0 }}
			src={getSeverityIcon(severity)}
		/>
		<Text style={{ fontSize: 13, color: "#333", textAlign: "justify" }}>
			<BoldText>{severity}</BoldText>
		</Text>
	</View>
);

EnhancedSeverityText.propTypes = {
	severity: PropTypes.string.isRequired,
};

export default EnhancedSeverityText;
