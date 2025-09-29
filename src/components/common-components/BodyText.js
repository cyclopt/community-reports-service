import { Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

const BodyText = ({ children }) => (
	<Text style={styles.body}>
		{children}
	</Text>
);

BodyText.propTypes = {
	children: PropTypes.node.isRequired,
};

export default BodyText;
