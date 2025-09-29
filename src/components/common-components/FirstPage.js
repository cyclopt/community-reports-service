import { Text, View, Image, Page } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

const TddFirstPage = ({ title, service }) => (
	<Page fixed size="A4" orientation="portrait">
		<View style={{ flexDirection: "column", justifyContent: "center" }}>
			<Image src={`./assets/images/${service}-report/${service}_Report_fonto.jpg`} style={{ objectFit: "contain" }} />
			<View style={{ marginTop: 40 }}>
				<Text style={{ margin: "auto", color: "#00426E", fontSize: "20px", fontStyle: "bold", fontFamily: "Commissioner" }}>{`${title} Report`}</Text>
			</View>
		</View>
	</Page>
);

TddFirstPage.propTypes = {
	title: PropTypes.string,
	service: PropTypes.string,
};

export default TddFirstPage;
