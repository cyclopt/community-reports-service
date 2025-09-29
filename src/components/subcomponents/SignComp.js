import { Text, View } from "@react-pdf/renderer";
import React from "react";

const SignComp = () => (
	<View style={{ display: "flex", flexDirection: "column", lineHeight: "2px" }}>
		<Text style={{ display: "flex", textAlign: "center", marginTop: "20px", fontStyle: "medium" }}>{"Order Assignment"}</Text>
		<View style={{ display: "flex", flexDirection: "row" }}>
			<View style={{ display: "flex", flexDirection: "column", width: "15%", textAlign: "left" }}>
				<Text>{"To:"}</Text>
				<Text>{"Date:"}</Text>
				<Text>{"Rel. to:"}</Text>
			</View>
			<View style={{ display: "flex", flexDirection: "column", width: "85%", textAlign: "left" }}>
				<Text>{"CYCLOPT TEAM"}</Text>
				<Text>{"2025"}</Text>
				<Text>{"ENABLING CYCLOPT SOFTWARE DEVELOPMENT METHODOLOGY"}</Text>
			</View>
		</View>
		<Text style={{ display: "flex", width: "85%", alignSelf: "flex-end" }}>{"“” entrusts CYCLOPT to enable operations as they were assessed and presented during the pilot evaluation period"}</Text>
		<View style={{ display: "flex", flexDirection: "row", lineHeight: "3px", width: "85%", alignSelf: "flex-end", padding: "25px", margin: "10px" }}>
			<View style={{ display: "flex", flexDirection: "column", width: "50%", textAlign: "left", fontStyle: "bold", borderRight: "1px solid black" }}>
				<Text>{"(Name):"}</Text>
				<Text>{"(Title):"}</Text>
				<Text>{"(Date):"}</Text>
			</View>
			<View style={{ display: "flex", flexDirection: "column", width: "50%", textAlign: "center", fontStyle: "bold" }}>
				<Text>{"(Sign & Stamp)"}</Text>
			</View>
		</View>
	</View>
);

export default SignComp;
