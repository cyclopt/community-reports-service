import { Text, View, Page } from "@react-pdf/renderer";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import SignComp from "../SignComp.js";
import styles from "../styles.js";
import Subheader from "../Subheader.js";

const invPla = [
	{
		num: "a)",
		text: "10 months of PLATFORM monthly fee will be invoiced upon signing an annual subscription contract. Next invoice will be issued at the end of subscription period.",
	},
	{
		num: "b)",
		text: "50% of CONSULTANCY services will be invoiced upon signing.",
	},
	{
		num: "c)",
		text: "50% of CONSULTANCY services will be invoiced one week after contacting the Training & pilot Kick off",
	},
	{
		num: "d)",
		text: "100% of SUPPORT will be invoiced upon LIVE Operations. Next invoice will be issued at the end of Support subscription period",
	},
];

const payMeth = [
	{
		num: "a)",
		text: "100% of every PLATFORM invoice will be fully paid, upon Invoicing.",
	},
	{
		num: "b)",
		text: "100% of first CONSULTANCY services invoice will be fully paid upon invoicing",
	},
	{
		num: "c)",
		text: "100% of every next CONSULTANCY services invoice will be fully paid in 7 days.",
	},
	{
		num: "d)",
		text: "100% of every SUPPORT invoice will be fully paid, in 7 days.",
	},
];

const InvoicingPlan = () => (
	<Page size="A4" orientation="portrait" style={styles.page}>
		<Header />
		<ContentHeader title="INVOICING PLAN & PAYMENT TERMS" style={{ marginTop: "5px", marginBottom: "0px" }} />
		<View style={{ marginLeft: "40px", marginRight: "60px" }}>
			<Subheader title="Invoicing plan" style={{ marginTop: "0px", marginBottom: "5px" }} />
			{invPla.map((cont, index) => (
				<View key={index} style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ marginRight: "10px", fontStyle: "medium" }}>{cont.num}</Text>
					<Text style={{ lineHeight: "1.5px" }}>{cont.text}</Text>
				</View>
			))}
			<Subheader title="Payment method" style={{ marginTop: "10px", marginBottom: "5px" }} />
			{payMeth.map((cont, index) => (
				<View key={index} style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ marginRight: "10px", fontStyle: "medium" }}>{cont.num}</Text>
					<Text style={{ lineHeight: "1.5px" }}>{cont.text}</Text>
				</View>
			))}
			<Text style={{ fontSize: "8px", lineHeight: "1px", marginTop: "3px" }}>{"(*) The prices do not include V.A.T"}</Text>
			<Text style={{ fontSize: "8px", lineHeight: "1px" }}>{"(**) V.A.T. will be paid immediately upon issuing any invoice."}</Text>
			<Subheader title="Proposal's validity" style={{ marginTop: "10px", marginBottom: "5px" }} />
			<Text style={{ lineHeight: "1.5px" }}>{"This proposal is valid for one (1) month from its submission date."}</Text>
			<Subheader title="Confidentially" style={{ marginTop: "10px", marginBottom: "5px" }} />
			<Text style={{ lineHeight: "1.5px" }}>{"The information contained in this document is confidential. “” undertakes not to reproduce, use or disclose for any other purpose except the evaluation of this proposal."}</Text>
			<SignComp />
		</View>
		<Footer />
	</Page>
);

export default InvoicingPlan;
