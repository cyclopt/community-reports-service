import { Text, View, Link } from "@react-pdf/renderer";
import React from "react";

import styles from "./styles.js";

const Footer = () => (
	<View fixed style={styles.footerContainer}>
		<View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
			<Link href="https://www.cyclopt.com/" style={{ textDecoration: "none" }}>
				<Text style={{ fontSize: "10px", color: "#005792", fontStyle: "light" }}>
					{"www.cyclopt.com"}
				</Text>
			</Link>
			<Text
				style={{ position: "absolute", fontSize: "10px", right: "10px" }}
				render={({ pageNumber }) => pageNumber}
			/>
		</View>
	</View>
);

export default Footer;
