import ReactPDF, { Document, Text } from "@react-pdf/renderer";
import getStream from "get-stream";
import PropTypes from "prop-types";
import React from "react";

import getProjectStatistics from "../../utils/get-project-statistics.js";
import { FirstPage, LastPage, AnalysisInformation, EvaluationAxes, Findings, Vulnerabilities } from "../subcomponents/index.js";

const ProjectReport = ({ projects, data, date, options, fileName }) => {
	const statistics = getProjectStatistics(data);

	return (
		<Document>
			<FirstPage
				projects={projects}
				fileName={fileName}
				title={(
					<>
						<Text style={{ marginBottom: "8px" }}>{"SOFTWARE QUALITY"}</Text>
						<Text style={{ marginTop: "8px" }}>{"EVALUATION REPORT"}</Text>
					</>
				)}
			/>
			<AnalysisInformation projects={projects} statistics={statistics} date={date} fileName={fileName} />
			<EvaluationAxes />
			<Findings data={data} options={options} />
			<Vulnerabilities headerIndex={4} data={data} />
			<LastPage />
		</Document>
	);
};

ProjectReport.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	projects: PropTypes.array,
	date: PropTypes.string,
	options: PropTypes.object,
	fileName: PropTypes.string,
};

const getProjectReport = async (projects, data, options, date, stream = true, fileName = "") => {
	const report = await ReactPDF.renderToStream(
		<ProjectReport
			projects={Array.isArray(projects) ? projects : [projects]}
			data={data}
			date={date}
			options={options}
			fileName={fileName}
		/>,
	);

	if (stream) return report;
	return getStream(report, { encoding: "base64" });
};

export default getProjectReport;

