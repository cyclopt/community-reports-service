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
	firstPage: {
		fontFamily: "Commissioner",
		textAlign: "justify",
	},
	lastPage: {
		fontFamily: "Commissioner",
	},
	page: {
		textAlign: "justify",
		fontFamily: "Commissioner",
		fontStyle: "light",
		position: "relative",
		paddingBottom: `${(40 + 0.7)}px`,
		fontSize: "10px",
	},
	pageBackground: {
		position: "absolute",
		minWidth: "100%",
		minHeight: "100%",
		display: "block",
		height: "75%",
		width: "100%",
		zIndex: "-9999",
	},
	headerContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		margin: "20px 20px 0.7px 20px",
		borderBottom: "0.7px solid #005792",
		zIndex: "9999",
	},
	footerContainer: {
		color: "#005792",
		position: "absolute",
		bottom: "0",
		height: "30px",
		width: "93%",
		margin: "10px 20px 10px 20px",
		paddingTop: "3px",
		borderTop: "0.7px solid #005792",
		zIndex: "9999",
	},
	analysisContainer: {
		backgroundColor: "#d2d2d2",
		borderRadius: "10px",
		width: "80%",
		padding: "10px 20px 10px 20px",
		fontSize: "11px",
		margin: "auto",
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
	transparentBulletPoint: {
		textAlign: "justify",
		width: "6px",
		height: "6px",
		borderRadius: "100%",
		border: "0.8px solid black",
		marginLeft: "15px",
		marginRight: "10px",
		marginTop: "5px",
	},
	paragraphContained: {
		textAlign: "justify",
		padding: "10px",
		backgroundColor: "#d2d2d2",
		borderRadius: "10px",
		marginTop: "8px",
		marginBottom: "8px",
	},
	paragraph: {
		padding: "10px",
		borderRadius: "10px",
		marginTop: "8px",
		marginBottom: "8px",
	},
	processTable: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		border: "0.8px solid black",
		borderBottom: "0",
		marginTop: "20px",
		marginBottom: "20px",
	},
	processTableHeaders: {
		color: "white",
		display: "flex",
		flexDirection: "row",
		backgroundColor: "#005792",
		justifyContent: "center",
		alignItems: "center",
		borderBottom: "0.8px black solid",
	},
	processTableRow: {
		color: "black",
		display: "flex",
		flexDirection: "row",
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		borderBottom: "0.8px black solid",
	},
	processTableHeaderCell: {
		padding: "8px",
		alignText: "center",
		margin: "auto",
		borderRight: "0.8px solid black",
		display: "flex",
	},
	qualityScore: {
		height: "60px",
		width: "50%",
		margin: "auto",
		marginTop: "20px",
		marginBottom: "20px",
		borderRadius: "10px",
		border: "1.8px solid #005792",
		display: "flex",
		flexDirection: "row",
	},
	qualityCharacteristicContainer: {
		width: "70%",
		borderRadius: "10px",
		border: "1.2px solid black",
		padding: "10px",
		margin: "auto",
		marginTop: "20px",
		marginBottom: "20px",
		position: "relative",
	},
	recommendationsContainer: {
		marginTop: "20px",
		marginBottom: "20px",
		padding: "8px 5px",
		backgroundColor: "#d2d2d2",
		borderLeft: "5px solid #005792",
	},
	boldText: {
		fontFamily: "Commissioner",
		fontStyle: "bold",
	},
});

export default styles;
