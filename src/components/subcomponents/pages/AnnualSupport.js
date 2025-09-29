import { View, Page, Text } from "@react-pdf/renderer";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import styles from "../styles.js";
import { TableHeaderAlfa, TableContainerGama } from "../TableContainer.js";

const tableContent = [
	{
		SERVICE: "SUPPORT KIT",
		body: {
			title: "Basic (20hrs)",
			text: "Recommended for less than 10 Users",
		},
		select: "BSC",
		annual: "1.400",
	},
	{
		SERVICE: "SUPPORT KIT",
		body: {
			title: "Premium (45hrs)",
			text: "Recommended for less than 20 Users",
		},
		select: "RCM",
		annual: "2.500",
	},
	{
		SERVICE: "SUPPORT KIT",
		body: {
			title: "Ultimate (80hrs)",
			text: "Recommended for more than 20 Users",
		},
		select: "OPT",
		annual: "4000",
	},

];

const AnnualSupport = () => (
	<Page size="A4" orientation="portrait" style={styles.page}>
		<Header />
		<ContentHeader title="ANNUAL SUPPORT KIT CONFIGURATOR " />
		<View style={{ flexDirection: "column", marginLeft: "40px", marginRight: "40px" }}>
			<View style={{ flexDirection: "column", borderBottom: "1px solid #000000" }}>
				<TableHeaderAlfa first="SERVICE" second="DESCRIPTION" third="SELECT" fourth="ANNUAL (€)" />
				<TableContainerGama data={tableContent} />
			</View>
			<Text style={{ marginTop: "15px" }}>{"Support Kit enables support@cyclopt.com mail address so a platform user can dispatch Ticketed Requests while interacting with platform."}</Text>
			<Text style={{ marginTop: "15px" }}>{"A Support Units Balance is visible at all time to Platform Administrator"}</Text>
			<Text style={{ marginTop: "15px" }}>{"Support Services are provided in working days and during business hours, meaning Monday to Friday 9:00 - 17:00."}</Text>
		</View>
		<Footer />
	</Page>
);

export default AnnualSupport;
