import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

// PDF Document
const Footer = ({ pageNumber }) => (
	<View fixed style={styles.footer}>
		<View style={{
			borderBottom: "2px solid #00426e",
			marginTop: 10,
			marginBottom: 5,
			marginLeft: 20,
			marginRight: 20,
			flexDirection: "row",
			alignItems: "center",
		}}
		/>
		<View style={styles.footerContent}>
			<Text>{" "}</Text>
			<Text style={styles.link}>{"www.cyclopt.com"}</Text>
			<Text>{pageNumber}</Text>
		</View>
	</View>
);

Footer.propTypes = {
	pageNumber: PropTypes.number,
};

export default Footer;
