import { View, Text, Image } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import breakWords from "../../utils/break-words.js";

const tik = "./assets/images/project-report/tik.png";
const cross = "./assets/images/project-report/cross.png";
const vulnerabilityIcon = (sev) => {
	switch (sev) {
		case "Minor":
		case "MODERATE": {
			return "./assets/images/project-report/low.png";
		}

		case "Major":
		case "HIGH": {
			return "./assets/images/project-report/moderate.png";
		}

		case "Critical":
		case "CRITICAL": {
			return "./assets/images/project-report/critical.png";
		}

		default: {
			return `./assets/images/project-report/${sev}.png`;
		}
	}
};

// This is the max lenght for the all columns combined
const maxchars = 85;

const TableHeaderAlfa = (data) => (
	<View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#00426E" }}>
		<Text style={{ fontStyle: "medium", display: "flex", width: "25%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{data.first}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "50%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{data.second}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "10%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{data.third}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "15%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", borderRight: "1px solid #000000", padding: "1px" }}>{data.fourth}</Text>
	</View>
);

const TableHeaderBeta = () => (
	<View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#00426E" }}>
		<Text style={{ fontStyle: "medium", display: "flex", width: "15%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{"CODE"}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "40%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{"CONSULTARY SERVICES"}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "15%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{"MU"}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "10%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{"PRC(€)"}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "5%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{"QTY"}</Text>
		<Text style={{ fontStyle: "medium", display: "flex", width: "15%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", borderRight: "1px solid #000000", padding: "1px" }}>{"VALUE (€)"}</Text>
	</View>
);

const vulnerabilitiesTableColumnWidth = ["10%", "15%", "10%", "35%", "30%"];
const vulnerabilitiesHeaderCommonStyle = { fontStyle: "medium", display: "flex", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" };
const vulnerabilitiesContentCommonStyle = { display: "flex", textAlign: "center", fontSize: "10px", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", justifyContent: "center", padding: "5px" };

const securityViolationsTableColumnWidth = ["10%", "10%", "20%", "60%"];
const securityViolationsHeaderCommonStyle = { fontStyle: "medium", display: "flex", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" };
const securityViolationsContentCommonStyle = { display: "flex", textAlign: "center", fontSize: "10px", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", justifyContent: "center", padding: "5px" };

const TableHeaderVulnerabilities = (data) => (
	<View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#00426E" }}>
		<Text style={{ width: vulnerabilitiesTableColumnWidth[0], ...vulnerabilitiesHeaderCommonStyle }}>{data.first}</Text>
		<Text style={{ width: vulnerabilitiesTableColumnWidth[1], ...vulnerabilitiesHeaderCommonStyle }}>{data.second}</Text>
		<Text style={{ width: vulnerabilitiesTableColumnWidth[2], ...vulnerabilitiesHeaderCommonStyle }}>{data.third}</Text>
		<Text style={{ width: vulnerabilitiesTableColumnWidth[3], ...vulnerabilitiesHeaderCommonStyle }}>{data.fourth}</Text>
		<Text style={{ width: vulnerabilitiesTableColumnWidth[4], ...vulnerabilitiesHeaderCommonStyle, borderRight: "1px solid #000000" }}>{data.fifth}</Text>
	</View>
);

const TableHeaderSecurityViolations = (data) => (
	<View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#00426E" }}>
		<Text style={{ width: securityViolationsTableColumnWidth[0], ...securityViolationsHeaderCommonStyle }}>{data.first}</Text>
		<Text style={{ width: securityViolationsTableColumnWidth[1], ...securityViolationsHeaderCommonStyle }}>{data.second}</Text>
		<Text style={{ width: securityViolationsTableColumnWidth[2], ...securityViolationsHeaderCommonStyle }}>{data.third}</Text>
		<Text style={{ width: securityViolationsTableColumnWidth[3], ...securityViolationsHeaderCommonStyle, borderRight: "1px solid #000000" }}>{data.fourth}</Text>
	</View>
);

const TableContainerAlfa = ({ data }) => (
	<>
		{data?.map((cont, index) => (
			<View key={index} style={{ display: "flex", flexDirection: "row" }}>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "25%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont?.code}</Text>
				</View>
				<View wrap={false} style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "50%", justifyContent: "center", padding: "5px", flexDirection: "column", fontSize: "10px" }}>
					<Text style={{ fontStyle: "medium" }}>{cont?.body.title}</Text>
					<Text style={{ color: "#00426E", marginRight: "10px" }}>{cont?.body.text}</Text>
					{cont.body.options && (
						cont.body.options.map((opt, indexP) => <Text key={indexP} style={{ fontSize: "9px", color: "#00426E", marginLeft: "15px", marginRight: "10px" }}>{opt}</Text>)

					)}
				</View>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "10%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont?.active ? <Image src={tik} style={{ width: "20px", height: "20px" }} /> : <Image src={cross} style={{ width: "20px", height: "20px" }} />}</Text>
				</View>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", borderRight: "1px solid #000000", width: "15%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont?.cash}</Text>
				</View>
			</View>
		))}
	</>
);

const TableContainerBeta = ({ data }) => (
	<>
		{data?.map((cont, index) => (
			<View key={index} style={{ display: "flex", flexDirection: "row" }}>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "15%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont.code}</Text>
				</View>
				<View wrap={false} style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "40%", justifyContent: "center", padding: "5px", flexDirection: "column", fontSize: "10px" }}>
					<Text style={{ fontStyle: "medium" }}>{cont.body.title}</Text>
					<Text style={{ color: "#00426E", marginRight: "10px" }}>{cont.body.text}</Text>
				</View>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "15%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont.mu}</Text>
				</View>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "10%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont.prc}</Text>
				</View>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "5%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont.qty}</Text>
				</View>
				<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", borderRight: "1px solid #000000", width: "15%", justifyContent: "center" }}>
					<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont.value}</Text>
				</View>
			</View>
		))}
	</>

);

const TableContainerGama = ({ data }) => (

	<View style={{ display: "flex", flexDirection: "row" }}>
		<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "25%", justifyContent: "center" }}>
			<Text style={{ textAlign: "center", fontSize: "10px" }}>{"SUPPORT KIT"}</Text>
		</View>
		<View style={{ display: "flex", flexDirection: "column", width: "75%" }}>
			{data?.map((cont, index) => (
				<View key={index} style={{ display: "flex", flexDirection: "row" }}>
					<View wrap={false} style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "66.6%", justifyContent: "center", padding: "5px", flexDirection: "column", fontSize: "10px" }}>
						<Text style={{ fontStyle: "medium" }}>{cont.body.title}</Text>
						<Text style={{ color: "#00426E", marginRight: "10px" }}>{cont.body.text}</Text>
					</View>
					<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", width: "13.3%", justifyContent: "center" }}>
						<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont.select}</Text>
					</View>
					<View style={{ display: "flex", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", borderRight: "1px solid #000000", width: "20%", justifyContent: "center" }}>
						<Text style={{ textAlign: "center", fontSize: "10px" }}>{cont.annual}</Text>
					</View>
				</View>
			))}
		</View>
	</View>
);

const TableContainerVulnerabilities = ({ data }) => {
	const roundValueRecommendation = Math.ceil(maxchars * (Number.parseFloat(vulnerabilitiesTableColumnWidth[3]) / 100));
	const roundValueDescription = Math.ceil(maxchars * (Number.parseFloat(vulnerabilitiesTableColumnWidth[4]) / 100));
	return (
		<>
			{data?.map((cont, index) => (
				<View key={index} style={{ display: "flex", flexDirection: "row" }}>
					<View style={{ width: vulnerabilitiesTableColumnWidth[0], ...vulnerabilitiesContentCommonStyle }}>
						<View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
							<Image
								style={{ width: "20px" }}
								src={vulnerabilityIcon(cont.severity)}
							/>
						</View>
					</View>
					<View style={{ width: vulnerabilitiesTableColumnWidth[1], ...vulnerabilitiesContentCommonStyle }}>
						<Text>{cont.moduleName}</Text>
					</View>
					<View style={{ width: vulnerabilitiesTableColumnWidth[2], ...vulnerabilitiesContentCommonStyle }}>
						<Text>{cont.version}</Text>
					</View>
					<View style={{ width: vulnerabilitiesTableColumnWidth[3], ...vulnerabilitiesContentCommonStyle }}>
						<Text>{ breakWords(cont.recommendation, roundValueRecommendation)}</Text>
					</View>
					<View style={{ width: vulnerabilitiesTableColumnWidth[4], ...vulnerabilitiesContentCommonStyle, borderRight: "1px solid #000000" }}>
						<Text>{breakWords(cont.description, roundValueDescription)}</Text>
					</View>
				</View>
			))}
		</>
	);
};

const TableContainerSecurityViolations = ({ data }) => (
	<>
		{data?.map((cont, index) => (
			<View key={index} style={{ display: "flex", flexDirection: "row" }}>
				<View style={{ width: securityViolationsTableColumnWidth[0], ...securityViolationsContentCommonStyle }}>
					<View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
						<Image
							style={{ width: "20px" }}
							src={vulnerabilityIcon(cont.severity)}
						/>
					</View>
				</View>
				<View style={{ width: securityViolationsTableColumnWidth[1], ...securityViolationsContentCommonStyle }}>
					<Text>{cont.count}</Text>
				</View>
				<View style={{ width: securityViolationsTableColumnWidth[2], ...securityViolationsContentCommonStyle }}>
					<Text>{cont.title}</Text>
				</View>
				<View style={{ width: securityViolationsTableColumnWidth[3], ...securityViolationsContentCommonStyle, borderRight: "1px solid #000000" }}>
					<Text>{cont.explanation}</Text>
				</View>
			</View>
		))}
	</>
);

const TableConc = (data) => (
	<View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#00426E" }}>
		<Text style={{ display: "flex", width: "85%", textAlign: "right", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{data.text}</Text>
		<Text style={{ display: "flex", width: "15%", textAlign: "center", fontSize: "10px", color: "white", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", padding: "1px" }}>{data.num}</Text>
	</View>
);

const TableSubHeader = ({ text, style }) => (
	<View style={{ display: "flex", alignItems: "center", backgroundColor: "#d2d2d2", borderTop: "1px solid #000000", borderLeft: "1px solid #000000", borderRight: "1px solid #000000", padding: "1px", ...style }}>
		<Text style={{ textAlign: "center", fontSize: "10px" }}>{text}</Text>
	</View>
);

TableContainerAlfa.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};
TableContainerBeta.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};
TableContainerGama.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};

TableContainerVulnerabilities.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};

TableContainerSecurityViolations.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};

TableSubHeader.propTypes = {
	text: PropTypes.string,
	style: PropTypes.object,
};

export {
	TableHeaderAlfa,
	TableHeaderBeta,
	TableHeaderVulnerabilities,
	TableHeaderSecurityViolations,
	TableSubHeader,
	TableContainerAlfa,
	TableContainerBeta,
	TableContainerGama,
	TableContainerVulnerabilities,
	TableContainerSecurityViolations,
	TableConc,
};

