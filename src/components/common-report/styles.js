import { StyleSheet, Font } from "@react-pdf/renderer";

const maxRetries = 3;

for (let retry = 0; retry < maxRetries; retry++) {
	try {
		Font.register({
			family: "Commissioner",
			fonts: [
				{ src: "https://fonts.gstatic.com/s/commissioner/v10/tDbe2o2WnlgI0FNDgduEk4jAhwgIy5k8SlfU5Oq_EOhjPlmUsaeLhw.woff" },
				{ src: "https://fonts.gstatic.com/s/commissioner/v10/tDbe2o2WnlgI0FNDgduEk4jAhwgIy5k8SlfU5Oq_EOhjPlmUsaeLhw.woff", fontStyle: "medium" },
				{ src: "https://fonts.gstatic.com/s/commissioner/v10/tDbe2o2WnlgI0FNDgduEk4jAhwgIy5k8SlfU5D-4EOhjPlmUsaeLhw.woff", fontStyle: "bold" },
				{ src: "https://fonts.gstatic.com/s/commissioner/v10/tDbe2o2WnlgI0FNDgduEk4jAhwgIy5k8SlfU5Ia_EOhjPlmUsaeLhw.woff", fontStyle: "light" },
			],
		});
		break; // Exit the loop on success
	} catch { /* */ }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 50,
		marginRight: 50,
		backgroundColor: "#fff",
	},
	headingContainer: {
		flexDirection: "row",
		alignItems: "baseline",
		marginBottom: 10,
		marginTop: 10,
	},
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#003366",
	},
	number: {
		fontSize: 20,
		fontWeight: "bold",
		marginRight: 5,
	},
	title: {
		fontSize: 16,
		textTransform: "uppercase",
		color: "#00426E",
		fontStyle: "bold",
	},
	subTitle: {
		fontSize: 14,
		// textTransform: "uppercase",
		color: "#00426E",
		fontStyle: "bold",
	},
	body: {
		fontSize: 12,
		color: "#333",
		textAlign: "justify",
		paddingBottom: 15,
	},
	bulletContainer: {
		flexDirection: "row",
		marginBottom: 8,
		paddingRight: 20,
	},
	boldText: {
		fontFamily: "Commissioner",
		fontStyle: "bold",
	},
	bulletPoint: {
		backgroundColor: "black",
		width: "4px",
		height: "4px",
		borderRadius: "100%",
		marginLeft: "10px",
		marginRight: "10px",
		marginTop: "5px",
	},
	line: {
		width: "25%", // Line is 25% of the page width
		height: 1,
		marginBottom: 5,
		marginTop: 8, // Added space above the line
	},
	link: {
		fontSize: 12,
		color: "#00CFCF",
		textDecoration: "underline",
		flexShrink: 1, // Prevents forced width limitation
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontSize: 12,
		color: "#00426e",
	},
	dottedLine: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomStyle: "dotted",
		borderBottomColor: "#000",
		textDecoration: "none",
		marginTop: 8,
	},
	pageNumber: {
		fontSize: 10,
		fontWeight: "bold",
		color: "black",
		paddingTop: 3,
	},
	subRow: {
		flexDirection: "row",
		width: "80%",
		alignItems: "center",
		paddingLeft: 10,
	},
	inside: {
		paddingLeft: 3,
	},
	footer: {
		position: "fixed",
		bottom: 0, // Adjust this value to fine-tune the footer position
		left: 0,
		right: 0,
		width: "100%",
		textAlign: "center",
		paddingBottom: 25,
		paddingTop: 15,
		fontSize: 11,
	},
	footerLine: {
		borderBottom: "2px solid #003f87", // Dark blue line
		marginBottom: 5,
		marginLeft: 20,
		marginRight: 20,
	},
	footerContent: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "right",
		marginLeft: 20,
		marginRight: 20,
	},
	enhancedSeverityText: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "left",
		paddingBottom: 15,
		paddingTop: 15,
	},
	table: {
		display: "table",
		width: "auto",
		marginHorizontal: "10px",
		marginVertical: "10px",
		borderWidth: 1,
		borderColor: "#00426E",
		borderStyle: "solid",
		minHeight: "53px",
	},
	tableRow: {
		flexDirection: "row",
	},
	tableColHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#00426E",
		backgroundColor: "#00426E",
		padding: 5,
	},
	tableCol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#00426E",
		padding: 5,
	},
	tableCell: {
		fontSize: 10,
	},
	tableHeaderCell: {
		fontSize: 11,
		color: "white",
		fontWeight: "bold",
	},
});

export default styles;
