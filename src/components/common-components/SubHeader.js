import { View, Image } from "@react-pdf/renderer";
import React from "react";

const SubHeader = () => (
	<View
		fixed
		style={{ paddingBottom: 15,
			paddingTop: 25 }}
	>
		<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
			<Image src="./assets/images/common-tdd-nis2-report/cyclopt_logo_with_text_black.png" style={{ width: "100px", paddingLeft: 20, objectFit: "contain" }} />
			<Image src="./assets/images/common-tdd-nis2-report/sub-header-final-right-image.png" style={{ width: "100px", paddingRight: 25, objectFit: "contain" }} />
		</View>
		<View style={{
			borderBottom: "2px solid #00426e",
			marginTop: 10,
			marginBottom: 5,
			marginLeft: 20,
			marginRight: 20,
			flexDirection: "row",
			alignItems: "center",
		}}
		/>

	</View>
);

export default SubHeader;
