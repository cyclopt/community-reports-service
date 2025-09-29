import { Text, View, Image, Page } from "@react-pdf/renderer";
import React from "react";

import styles from "../styles.js";

const FirstPage = () => (
	<Page size="A4" orientation="portrait" style={styles.firstPage}>
		<View style={{ color: "white" }}>
			<View style={{ height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<View style={{ fontSize: "33px", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Text style={{ marginBottom: "8px" }}>{"TECHNICAL & FINANCIAL"}</Text>
					<Text style={{ marginTop: "8px" }}>{"PROPOSAL"}</Text>
				</View>
			</View>
			<View style={{ paddingTop: "100px", paddingLeft: "60px", height: "30%", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
				<View style={{ borderLeft: "8px solid #D13173", height: "80rem", width: "120rem" }} />
			</View>
		</View>
		<View style={{ position: "relative", top: "-50", marginBottom: "10px", width: "100%", height: "10px", backgroundColor: "#D13173" }} />
		<View style={{ position: "relative", top: "-20px", margin: "auto" }}>
			<Text style={{ margin: "auto", marginBottom: "10px", color: "#00426E", fontSize: "10px" }}>{"Proposal by"}</Text>
			<Image src="./assets/images/project-report/cyclopt_logo_with_text_black.png" style={{ height: "50px" }} />
		</View>
		<Image src="./assets/images/project-report/report_first_page.jpg" style={styles.pageBackground} />
	</Page>
);

export default FirstPage;
