import { View, Page } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import styles from "../styles.js";
import { TableHeaderAlfa, TableSubHeader, TableContainerAlfa, TableConc } from "../TableContainer.js";

const tableContent = (data) => ({
	"BASIC FUNCTIONALITY": [{
		code: "CLPT-PLT-001",
		body: {
			title: "Core Platform",
			text: "Cloud platform including:",
			options: [
				"DevOps Repository integration (Github/Gitlab/Bitbucket/AzureDevOps)",
				"One Coding Language (Java,JavaScript,C#,Python)",
			],
		},
		active: true,
		cash: 250,
	}],
	"QUALITY AND EFFICIENCY ASSESSMENT": [{
		code: "CLPT-EFF-001",
		body: {
			title: "Quality Assessment",
			text: "Quality scores and metrics, violations, recommendations, duplicate analysis",
		},
		active: true,
		cash: "Core",
	},
	{
		code: "CLPT-EFF-002",
		body: {
			title: "Project Management/Analytics",
			text: "Task management and Analytics or Analytics from third-party (GitHub/Gitlab)",
		},
		active: data.plan.ProductManagement,
		cash: 50,

	},
	{
		code: "CLPT-EFF-003",
		body: {
			title: "Team Analytics",
			text: "Team analytics including repo data and Analytics from task management or third-party (GitHub/Gitlab)",
		},
		active: data.plan.TeamManagement,
		cash: 50,

	}],
	"SUPPORTED LANGUAGES": [{
		code: "CLPT-LNG-001",
		body: {
			title: "Additional Language",
			text: "JavaScript",
		},
		active: data.languages.JavaScript,
		cash: 40,
	},
	{
		code: "CLPT-LNG-002",
		body: {
			title: "Additional Language",
			text: "C#",
		},
		active: data.languages.CSharp,
		cash: 50,
	},
	{
		code: "CLPT-LNG-003",
		body: {
			title: "Additional Language",
			text: "PHP",
		},
		active: data.languages.PHP,
		cash: 40,
	},
	{
		code: "CLPT-LNG-004",
		body: {
			title: "Additional Language",
			text: "Java",
		},
		active: data.languages.Java,
		cash: 40,
	},
	{
		code: "CLPT-LNG-005",
		body: {
			title: "Additional Language",
			text: "Python",
		},
		active: data.languages.Python,
		cash: 40,
	},
	{
		code: "CLPT-LNG-006",
		body: {
			title: "Additional Language",
			text: "TS (TypeScript)",
		},
		active: data.languages.Typescript,
		cash: 40,
	}],
	USERS: [{
		code: "CLPT-USR-001",
		body: {
			title: "5 users",
			text: "Team interconnection",
		},
		active: true,
		cash: "Core",
	},
	{
		code: "CLPT-USR-002",
		body: {
			title: "Extra users",
			text: "10% of core value per user",
		},
		active: data.totalSeats > 5,
		cash: Number.parseInt(data.totalSeats, 10) > 5 ? Number.parseInt(data.totalSeats, 10) - 5 : 0,
	},
	],
});

function calUsersTotal(prevSum, totalUsers) {
	let retVal = 0;
	if (totalUsers > 5) {
		retVal = (prevSum * (10 / 100)) * (totalUsers - 5);
	}

	return retVal;
}

function calCoreFeatTotal(data) {
	let sum = 250;
	let count = 0;

	for (let i = 0; i < data["QUALITY AND EFFICIENCY ASSESSMENT"].length; i++) {
		if (data["QUALITY AND EFFICIENCY ASSESSMENT"][i].active && data["QUALITY AND EFFICIENCY ASSESSMENT"][i].cash !== "Core") {
			sum += data["QUALITY AND EFFICIENCY ASSESSMENT"][i].cash;
		}
	}

	for (let i = 0; i < data["SUPPORTED LANGUAGES"].length; i++) {
		if (data["SUPPORTED LANGUAGES"][i].active) {
			count += 1;
		}
	}

	if (count > 1) {
		for (let i = 0; i < data["SUPPORTED LANGUAGES"].length; i++) {
			if (data["SUPPORTED LANGUAGES"][i].active && data["SUPPORTED LANGUAGES"][i].cash !== 50) {
				data["SUPPORTED LANGUAGES"][i].cash = "Core";
				break;
			}
		}
	} else {
		for (let i = 0; i < data["SUPPORTED LANGUAGES"].length; i++) {
			if (data["SUPPORTED LANGUAGES"][i].active) {
				data["SUPPORTED LANGUAGES"][i].cash = "Core";
			}
		}
	}

	for (let i = 0; i < data["SUPPORTED LANGUAGES"].length; i++) {
		if (data["SUPPORTED LANGUAGES"][i].active && data["SUPPORTED LANGUAGES"][i].cash !== "Core") {
			sum += data["SUPPORTED LANGUAGES"][i].cash;
		}
	}

	return sum;
}

const PlatformModule = ({ data }) => {
	const formattedData = tableContent(data);
	return (
		<Page size="A4" orientation="portrait" style={styles.page}>
			<Header />
			<ContentHeader title="PLATFORM MODULE & FEATURE CONFIGURATOR" style={{ marginBottom: "15px" }} />
			<View style={{ flexDirection: "column", marginLeft: "40px", marginRight: "40px", borderBottom: "1px solid #000000" }}>
				<TableHeaderAlfa first="CODE" second="PLATFORM FEATURES" third="ACTIVE" fourth="€/MONTH" />
				<TableSubHeader text="BASIC FUNCTIONALITY" />
				<TableContainerAlfa data={formattedData["BASIC FUNCTIONALITY"]} />
				<TableSubHeader text="QUALITY AND EFFICIENCY ASSESSMENT" />
				<TableContainerAlfa data={formattedData["QUALITY AND EFFICIENCY ASSESSMENT"]} />
				<TableSubHeader text="SUPPORTED LANGUAGES" />
				<TableContainerAlfa data={formattedData["SUPPORTED LANGUAGES"]} />
				<TableConc text="CORE FEATURES TOTAL:" num={calCoreFeatTotal(formattedData)} />
				<TableSubHeader text="USERS" />
				<TableContainerAlfa data={formattedData.USERS} />
				<TableConc text="USERS TOTAL:" num={calUsersTotal(calCoreFeatTotal(formattedData), Number.parseInt(data.totalSeats, 10))} />
				<TableConc text="CYCLOPT MONTHLY FEE:" num={calUsersTotal(calCoreFeatTotal(formattedData), Number.parseInt(data.totalSeats, 10)) + calCoreFeatTotal(formattedData)} />
				<TableConc text="CYCLOPT ANNUAL FEE:" num={10 * (calUsersTotal(calCoreFeatTotal(formattedData), Number.parseInt(data.totalSeats, 10)) + calCoreFeatTotal(formattedData))} />
			</View>
			<Footer />
		</Page>
	);
};

PlatformModule.propTypes = {
	data: PropTypes.object,
};

export default PlatformModule;
