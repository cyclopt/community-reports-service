import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.js";

const Recommendations = ({ recommendations }) => (
	<View wrap={false} style={styles.recommendationsContainer}>
		<View style={{ fontStyle: "medium" }}>
			<Text>
				{"Notes & Recommendations:"}
			</Text>
		</View>
		{recommendations.map((recommendation, index) => (
			<View key={index} style={{ marginTop: "5px", width: "100%" }}>
				<View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
					<View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<View style={{ width: "93%" }}>
							<Text>
								{recommendation}
							</Text>
						</View>
					</View>
				</View>
			</View>
		))}
	</View>
);

Recommendations.propTypes = {
	recommendations: PropTypes.array,
};

export default Recommendations;
