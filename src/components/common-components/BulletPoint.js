import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

import BoldText from "./BoldText.js";

const BulletPoint = ({ title, description, component }) => (
	<View wrap={false} style={styles.bulletContainer}>
		<Text style={styles.bulletPoint}>{"•"}</Text>
		<Text style={{ fontSize: 12, color: "#333", textAlign: "justify" }}>
			<BoldText>{title}</BoldText>
			{component ? <Text>{`\n${description}`}</Text> : description}
		</Text>
		<Text>
			{" "}
		</Text>
	</View>
);

BulletPoint.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	component: PropTypes.bool,
};

export default BulletPoint;
