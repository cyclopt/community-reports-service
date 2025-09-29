import { Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

const BoldText = ({ children }) => <Text style={styles.boldText}>{children}</Text>;

BoldText.propTypes = {
	children: PropTypes.node.isRequired,
};

export default BoldText;
