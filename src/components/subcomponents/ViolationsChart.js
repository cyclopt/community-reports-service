import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.js";

const ViolationsChart = ({ violations }) => (
	<View>
		{violations?.length > 0 && (
			<View style={{ marginTop: "14px", marginBottom: "6px" }}>
				<Text style={{ marginBottom: "6px" }}>{"Critical violations can affect the proper functionality if the code. Some commonly found violations are listed below:"}</Text>
				{violations?.map((violationInfo, vIndex) => (
					<View key={`v-${vIndex}`} wrap={false}>
						<View wrap={false} style={{ display: "flex", flexDirection: "row" }}>
							<View wrap={false} style={styles.bulletPoint} />
							<Text style={{ marginRight: "10px" }}>
								<Text style={{ fontStyle: "medium" }}>
									{violationInfo?.title}
								</Text>
							</Text>
						</View>
						<View wrap={false} style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
							<View style={{ display: "flex", flexDirection: "row" }}>
								<View wrap={false} style={styles.transparentBulletPoint} />
								<Text style={{ marginRight: "10px" }}>{violationInfo.explanation}</Text>
							</View>
						</View>
					</View>
				))}
			</View>
		)}
	</View>
);

ViolationsChart.propTypes = {
	violations: PropTypes.array,
};

export default ViolationsChart;
