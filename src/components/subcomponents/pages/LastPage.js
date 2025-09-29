import { Text, Link, View, Image, Page } from "@react-pdf/renderer";
import React from "react";

import styles from "../styles.js";

const LastPage = () => (
	<Page size="A4" orientation="portrait" style={styles.lastPage}>
		<View style={{ height: "60%", width: "70%", margin: "auto" }}>
			<Image src="./assets/images/project-report/report_last_page.png" style={{ objectFit: "contain" }} />
		</View>
		<View>
			<View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: "11px", margin: "2px", fontStyle: "light" }}>
					{"FOLLOW US"}
				</Text>
				<Text style={{ fontSize: "10px", color: "#005792", margin: "2px", fontStyle: "light" }}>
					{"@cyclopt"}
				</Text>
				<View style={{ width: "20%", display: "flex", flexDirection: "row", margin: "2px" }}>
					<Link href="https://www.facebook.com/Cyclopt" style={{ margin: "3px" }}>
						<Image src="./assets/images/project-report/facebook.png" style={{ imageRendering: "crisp-edges" }} />
					</Link>
					<Link href="https://www.instagram.com/cyclopt_pc/" style={{ margin: "3px" }}>
						<Image src="./assets/images/project-report/instagram.png" style={{ imageRendering: "crisp-edges" }} />
					</Link>
					<Link href="https://twitter.com/cyclopt" style={{ margin: "3px" }}>
						<Image src="./assets/images/project-report/twitter.png" style={{ imageRendering: "crisp-edges" }} />
					</Link>
				</View>
			</View>
			<View style={{ fontSize: "13px", color: "white", padding: "6px", width: "90%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#005792", margin: "auto", marginTop: "15px", marginBottom: "50px" }}>
				<Text style={{ fontStyle: "light" }}>
					{"info@cyclopt.com "}
				</Text>
				<Text style={{ fontStyle: "medium" }}>
					{" • www.cyclopt.com"}
				</Text>
			</View>
		</View>
	</Page>
);

export default LastPage;
