import { Text, View, Link } from "@react-pdf/renderer";
import React from "react";

import styles from "../common-report/styles.js";

const FooterReference = () => (
	<View wrap={false} style={styles.container}>
		<View style={styles.row}>
			<Text style={styles.number}>{"6"}</Text>
			<Link src="https://simian.quandarypeak.com/" style={styles.link}>
				{"https://simian.quandarypeak.com/"}
			</Link>
		</View>
		<View style={styles.row}>
			<Text style={styles.number}>{"7"}</Text>
			<Link src="https://github.com/kucherenko/jscpd" style={styles.link}>
				{"https://github.com/kucherenko/jscpd"}
			</Link>
		</View>
	</View>
);

export default FooterReference;
