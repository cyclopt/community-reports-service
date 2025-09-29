import { Text, View, Image, Page } from "@react-pdf/renderer";
import pluralize from "pluralize";
import PropTypes from "prop-types";
import React from "react";

import styles from "../styles.js";

const FirstPage = ({ title, projects, fileName }) => (
	<Page size="A4" orientation="portrait" style={styles.firstPage}>
		<View style={{ color: "white" }}>
			<View style={{ height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<View style={{ fontSize: "33px", display: "flex", justifyContent: "center", alignItems: "center" }}>
					{title}
				</View>
			</View>
			<View style={{ paddingTop: "100px", paddingLeft: "60px", height: "30%", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
				<View style={{ borderLeft: "8px solid #a7a9ac", fontSize: "20px", textAlign: "center" }}>
					<Text style={{ padding: "12px", fontStyle: "medium" }}>
						{projects.length < 2 ? `${pluralize("PROJECT", projects.length)} ${projects.map((p) => p.name).join(", ")}` : fileName}
					</Text>
				</View>
			</View>
		</View>
		<View style={{ position: "relative", top: "-28px", marginTop: "10px", marginBottom: "10px", width: "100%", height: "10px", backgroundColor: "#a7a9ac" }} />
		<View style={{ position: "relative", top: "-20px", margin: "auto" }}>
			<Text style={{ margin: "auto", marginBottom: "10px", color: "black", fontSize: "10px" }}>{"Quality Evaluation Report by"}</Text>
			<Image src="./assets/images/project-report/cyclopt_logo_with_text_black.png" style={{ height: "50px" }} />
		</View>
		<Image src="./assets/images/project-report/report_first_page.jpg" style={styles.pageBackground} />
	</Page>
);

FirstPage.propTypes = {
	projects: PropTypes.array,
	fileName: PropTypes.string,
	title: PropTypes.element,
};

export default FirstPage;
