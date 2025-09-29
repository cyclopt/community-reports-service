import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import ContentHeader from "../ContentHeader.js";

const Conclusion = ({ text }) => (
	<View break>
		<ContentHeader title="5. CONCLUSIONS" />
		<View style={{ fontSize: "12px", padding: "0 50px" }}>
			<Text>
				{text}
			</Text>
		</View>
	</View>
);

Conclusion.propTypes = {
	text: PropTypes.string,
};

export default Conclusion;
