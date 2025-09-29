import { View, Page, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import getVulnerabilitiesPerRepo from "../../../utils/get-vulnerabilities-per-repo.js";
import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import styles from "../styles.js";
import { TableHeaderVulnerabilities, TableContainerVulnerabilities } from "../TableContainer.js";

const Vulnerabilities = ({ data, headerIndex }) => {
	const vulnerabilitiesTable = getVulnerabilitiesPerRepo(data);
	const filteredVul = vulnerabilitiesTable.filter((repo) => repo.vulnerabilities.length > 0);
	return (
		filteredVul?.map((repo, index) => (
			repo.vulnerabilities.length > 0
			&& (
				<React.Fragment key={`findings-${index}`}>
					<Page size="A4" orientation="portrait" style={styles.page}>
						<Header />
						<View style={{ paddingLeft: "50px", paddingRight: "50px" }}>
							<View>
								{(index === 0) && <ContentHeader title={`${headerIndex}. VULNERABILITIES`} />}
								<Text style={{ marginTop: (index === 0) ? "0" : "30px", marginBottom: "10px" }}>
									{`The following table summarizes the vulnerabilities on the repository "${repo.name}"`}
								</Text>
							</View>
							<View style={{ flexDirection: "column", borderBottom: "1px solid #000000" }}>
								<TableHeaderVulnerabilities first="Severity" second="Module" third="Version" fourth="Recommendation" fifth="Description" />
								<TableContainerVulnerabilities data={repo.vulnerabilities} />
							</View>
						</View>
						<Footer />
					</Page>
				</React.Fragment>
			)
		))
	);
};

Vulnerabilities.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	headerIndex: PropTypes.number,
};

export default Vulnerabilities;
