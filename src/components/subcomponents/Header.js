import { Text, View, Image } from "@react-pdf/renderer";
import React from "react";

import styles from "./styles.js";

const Header = () => (
	<View fixed style={styles.headerContainer}>
		<View>
			<Image
				src="./assets/images/project-report/cyclopt_logo_with_text_black.png"
				style={{ opacity: "0.6", width: "120px", padding: "2px" }}
			/>
		</View>
		<View style={{ fontSize: "9px", alignItems: "center", color: "#005792", fontStyle: "light" }}>
			<Text style={{ marginBottom: "2px" }}>{"Your software"}</Text>
			<Text style={{ marginBottom: "2px" }}>{"Our priority"}</Text>
		</View>
	</View>
);

export default Header;
