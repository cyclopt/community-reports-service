import { View, Page, Text } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import getVulnerabilitiesPerRepo from "../../../utils/get-vulnerabilities-per-repo.js";
import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import styles from "../styles.js";
import { TableHeaderSecurityViolations, TableContainerSecurityViolations } from "../TableContainer.js";

const SecurityViolations = ({ data, headerIndex }) => {
	const vulnerabilitiesTable = getVulnerabilitiesPerRepo(data);
	const filteredVul = vulnerabilitiesTable.filter((repo) => repo.securityViolations.length > 0);
	return (
		filteredVul?.map((repo, index) => (
			repo.securityViolations.length > 0
			&& (
				<React.Fragment key={`findings-${index}`}>
					<Page size="A4" orientation="portrait" style={styles.page}>
						<Header />
						<View style={{ paddingLeft: "50px", paddingRight: "50px" }}>
							<View>
								{(index === 0) && <ContentHeader title={`${headerIndex}. SECURITY VIOLATIONS`} />}
								<Text style={{ marginTop: (index === 0) ? "0" : "30px", marginBottom: "10px" }}>
									{`The following table summarizes the security violations on the repository "${repo.name}"`}
								</Text>
							</View>
							<View style={{ flexDirection: "column", borderBottom: "1px solid #000000" }}>
								<TableHeaderSecurityViolations first="Severity" second="Count" third="Title" fourth="Explanation" />
								<TableContainerSecurityViolations data={repo.securityViolations} />
							</View>
						</View>
						<Footer />
					</Page>
				</React.Fragment>
			)
		))
	);
};

SecurityViolations.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	headerIndex: PropTypes.number,
};

export default SecurityViolations;
