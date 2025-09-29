import { View, Page } from "@react-pdf/renderer";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import styles from "../styles.js";
import { TableHeaderBeta, TableConc, TableSubHeader, TableContainerBeta } from "../TableContainer.js";

const tableContent = {
	"DEPLOYMENT MANAGEMENT": [{
		code: "CLPT-PM",
		body: {
			title: "Platform Deployment Management",
			text: "Project analysis and solution design, periodic implementation progress meetings",
		},
		mu: "Per Project",
		prc: "500",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-PD",
		body: {
			title: "Evaluation Analysis",
			text: "Project quality analysis report",
		},
		mu: "Per Doc",
		prc: "700",
		qty: "0",
		value: "0",
	},
	],
	"PROJECT IMPLEMENTATION & TUNING": [{
		code: "CLPT-PS",
		body: {
			title: "Platform Setup",
			text: "Platform deployment",
		},
		mu: "Per Setup",
		prc: "1500",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-PR",
		body: {
			title: "Special In-Platform Report",
			text: "Specialized report in platform ",
		},
		mu: "Per Report",
		prc: "400",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-CI",
		body: {
			title: "In Platform Custom Implementation",
			text: "Other services/analyses/platform integrations",
		},
		mu: "Per Day",
		prc: "530",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-PI",
		body: {
			title: "Interface Modification",
			text: "Changes to platform",
		},
		mu: "Per Day",
		prc: "530",
		qty: "0",
		value: "0",
	},
	],
	"PROJECT TRAINING AND LIVE PHASE SUPPORT": [{
		code: "CLPT-TR",
		body: {
			title: "Platform Onboarding Training",
			text: "Users Seminar securing platform adoption",
		},
		mu: "Per Session",
		prc: "400",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-RS",
		body: {
			title: "LIVE Phase Support",
			text: "Supporting the LIVE period of operations",
		},
		mu: "Per Hour",
		prc: "70",
		qty: "0",
		value: "0",
	},
	],
	"SPECIALIST SERVICES": [{
		code: "CLPT-TD",
		body: {
			title: "Testing Strategy",
			text: "Design of a testing strategy",
		},
		mu: "Per SW Line",
		prc: "2500",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-CI",
		body: {
			title: "Continuous Integration / Continuous Deployment",
			text: "Design of a continuous Integration and Continuous Deployment strategy",
		},
		mu: "Per SW Line",
		prc: "3500",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-TI",
		body: {
			title: "Testing Implementation",
			text: "Implementation & enablement of testing API",
		},
		mu: "Per Project",
		prc: "1000",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-DA",
		body: {
			title: "Dynamic Analysis",
			text: "Analysis of executables",
		},
		mu: "Per Day",
		prc: "530",
		qty: "0",
		value: "0",
	},
	{
		code: "CLPT-EV",
		body: {
			title: "Repo Report",
			text: "Evaluation reports for repos",
		},
		mu: "3 repo pack",
		prc: "900",
		qty: "0",
		value: "0",
	},
	],
};

const CycloptServicesConf = () => (
	<Page size="A4" orientation="portrait" style={styles.page}>
		<Header />
		<ContentHeader title="CYCLOPT SERVICES CONFIGURATOR" style={{ marginBottom: "20px", marginTop: "20px" }} />
		<View style={{ flexDirection: "column", marginLeft: "40px", marginRight: "40px", borderBottom: "1px solid #000000" }}>
			<TableHeaderBeta />
			<TableSubHeader text="1.DEPLOYMENT MANAGEMENT" style={{ alignItems: "flex-start", paddingLeft: "2px" }} />
			<TableContainerBeta data={tableContent["DEPLOYMENT MANAGEMENT"]} />
			<TableSubHeader text="2.PROJECT IMPLEMENTATION & TUNING" style={{ alignItems: "flex-start", paddingLeft: "2px" }} />
			<TableContainerBeta data={tableContent["PROJECT IMPLEMENTATION & TUNING"]} />
			<TableSubHeader text="3.PROJECT TRAINING AND LIVE PHASE SUPPORT" style={{ alignItems: "flex-start", paddingLeft: "2px" }} />
			<TableContainerBeta data={tableContent["PROJECT TRAINING AND LIVE PHASE SUPPORT"]} />
			<TableSubHeader text="4.SPECIALIST SERVICES" style={{ alignItems: "flex-start", paddingLeft: "2px" }} />
			<TableContainerBeta data={tableContent["SPECIALIST SERVICES"]} />
			<TableConc text="FULL PROJECT IMPLEMENTATION VALUE:" num="0" />
		</View>
		<Footer />
	</Page>
);

export default CycloptServicesConf;
