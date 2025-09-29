import ReactPDF, { Document, Text } from "@react-pdf/renderer";
import getStream from "get-stream";
import PropTypes from "prop-types";
import React from "react";

import { FirstPage, LastPage, Vulnerabilities, SecurityViolations } from "../subcomponents/index.js";

const VulnerabilitiesReport = ({ projects, data, fileName }) => (
	<Document>
		<FirstPage
			projects={projects}
			fileName={fileName}
			title={<Text style={{ marginBottom: "8px" }}>{"SOFTWARE SECURITY REPORT"}</Text>}
		/>
		<Vulnerabilities headerIndex={1} data={data} />
		<SecurityViolations headerIndex={2} data={data} />
		<LastPage />
	</Document>
);

VulnerabilitiesReport.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	projects: PropTypes.array,
	fileName: PropTypes.string,
};

const getVulnerabilitiesReport = async (projects, data, stream = true, fileName = "") => {
	const report = await ReactPDF.renderToStream(
		<VulnerabilitiesReport
			projects={Array.isArray(projects) ? projects : [projects]}
			data={data}
			fileName={fileName}
		/>,
	);

	if (stream) return report;
	return getStream(report, { encoding: "base64" });
};

export default getVulnerabilitiesReport;

