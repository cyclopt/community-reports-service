import { Text, View, Page } from "@react-pdf/renderer";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import styles from "../styles.js";

const contents = [
	{
		title: "Invoicing Plan & Payment Terms",
		pageNum: "3",
		color: "#00426E",
	},
	{
		title: "Invoicing plan",
		pageNum: "3",
		color: "#000000",
	},
	{
		title: "Payment method",
		pageNum: "3",
		color: "#000000",
	},
	{
		title: "Proposal's validity",
		pageNum: "3",
		color: "#000000",
	},
	{
		title: "Confidentiality",
		pageNum: "3",
		color: "#000000",
	},
	{
		title: "Order Assignment",
		pageNum: "3",
		color: "#000000",
	},
	{
		title: "Platform Module & Feature Configurator",
		pageNum: "4",
		color: "#00426E",
	},
	{
		title: "CYCLOPT Services Configurator",
		pageNum: "5",
		color: "#00426E",
	},
	{
		title: "Annual Support Kit Configurator",
		pageNum: "6",
		color: "#00426E",
	},
];

const TableOfContents = () => (
	<Page wrap size="A4" orientation="portrait" style={styles.page}>
		<Header />
		<ContentHeader title="TABLE OF CONTENTS" />
		<View style={{ marginLeft: "40px", marginRight: "40px" }}>
			<View wrap={false} style={{ padding: "10px" }}>
				{contents.map((cont, index) => (
					<View key={index} style={{ display: "flex", flexDirection: "row", fontSize: "10px", color: cont.color, marginBottom: "10px", fontStyle: "medium" }}>
						<Text style={{ width: "80%" }}>
							{cont.title}
						</Text>
						<Text style={{ width: "20%", textAlign: "right" }}>
							{cont.pageNum}
						</Text>
					</View>
				))}
			</View>
		</View>
		<Footer />
	</Page>
);

export default TableOfContents;
