import { View, Page } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

import Footer from "./Footer.js";
import SubHeader from "./SubHeader.js";

const CombinedComponents = ({ children }) => (
	<Page size="A4" orientation="portrait">
		<SubHeader />
		<View style={styles.container}>
			{children}
		</View>
		<View
			fixed
			render={({ pageNumber }) => (
				<Footer pageNumber={pageNumber} />
			)}
		/>
	</Page>
);

CombinedComponents.propTypes = {
	children: PropTypes.node.isRequired,
};
export default CombinedComponents;
