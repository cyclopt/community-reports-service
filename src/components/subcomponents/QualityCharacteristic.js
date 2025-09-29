import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.js";

const QualityCharacteristic = ({ maintainability, security, readability, reuseability }) => (
	<View wrap={false} style={styles.qualityCharacteristicContainer}>
		<View style={{ padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%", margin: "auto" }}>
			<Text style={{ fontSize: "11px", fontStyle: "medium" }}>
				{"Maintainability"}
			</Text>
			<Text style={{ fontSize: "11px", width: "20px" }}>
				{maintainability}
			</Text>
		</View>
		<View style={{ padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%", margin: "auto" }}>
			<Text style={{ fontSize: "11px", fontStyle: "medium" }}>
				{"Security"}
			</Text>
			<Text style={{ fontSize: "11px", width: "20px" }}>
				{security}
			</Text>
		</View>
		<View style={{ padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%", margin: "auto" }}>
			<Text style={{ fontSize: "11px", fontStyle: "medium" }}>
				{"Readability"}
			</Text>
			<Text style={{ fontSize: "11px", width: "20px" }}>
				{readability}
			</Text>
		</View>
		<View style={{ padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%", margin: "auto" }}>
			<Text style={{ fontSize: "11px", fontStyle: "medium" }}>
				{"Reuseability"}
			</Text>
			<Text style={{ fontSize: "11px", width: "20px" }}>
				{reuseability}
			</Text>
		</View>
		<View style={{ transform: "rotate(-90deg)", backgroundColor: "white", position: "absolute", top: "40%", left: "-60px", padding: "10px" }}>
			<View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "12px", fontStyle: "light" }}>
				<Text>
					{"QUALITY"}
				</Text>
				<Text>
					{"CHARACTERISTIC"}
				</Text>
			</View>
		</View>
		<View style={{ transform: "rotate(-90deg)", backgroundColor: "white", position: "absolute", top: "40%", right: "-60px", padding: "10px" }}>
			<View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "12px", fontStyle: "light" }}>
				<Text>
					{"CYCLOPT SCORE"}
				</Text>
			</View>
		</View>
	</View>
);

QualityCharacteristic.propTypes = {
	maintainability: PropTypes.string,
	security: PropTypes.string,
	readability: PropTypes.string,
	reuseability: PropTypes.string,
};

export default QualityCharacteristic;
