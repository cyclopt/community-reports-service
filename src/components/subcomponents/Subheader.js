import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

const Subheader = ({ title, style }) => (
	<View style={{ fontSize: "12px", marginTop: "40px", marginBottom: "20px", ...style }}>
		<Text style={{ color: "#005792", fontStyle: "medium" }}>{title}</Text>
	</View>
);

Subheader.propTypes = {
	title: PropTypes.string,
	style: PropTypes.object,
};

export default Subheader;
