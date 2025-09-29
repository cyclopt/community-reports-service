import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.js";

const Paragraph = ({ title, text, contained = false }) => (
	<View wrap={false} style={contained ? styles.paragraphContained : styles.paragraph}>
		<Text style={{ fontStyle: "medium", marginBottom: "5px", fontSize: "12px" }}>
			{title}
		</Text>
		<Text>
			{text}
		</Text>
	</View>
);

Paragraph.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	contained: PropTypes.bool,
};

export default Paragraph;
