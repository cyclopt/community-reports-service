import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

const ContentHeader = ({ title, style }) => (
	<View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "25px", marginBottom: "25px", ...style }}>
		<View style={{ width: "5px", height: "5px", margin: "30px", backgroundColor: "#005792" }} />
		<Text style={{ fontSize: "20px" }}>{title}</Text>
		<View style={{ width: "5px", height: "5px", margin: "30px", backgroundColor: "#005792" }} />
	</View>
);

ContentHeader.propTypes = {
	title: PropTypes.string,
	style: PropTypes.object,
};

export default ContentHeader;
