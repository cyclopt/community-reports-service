import { Text, View, Page } from "@react-pdf/renderer";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import styles from "../styles.js";

const AnalysisInformation = ({ projects, statistics, date, fileName }) => (
	<Page wrap size="A4" orientation="portrait" style={{ ...styles.page, textAlign: "left" }}>
		<Header />
		<View>
			<ContentHeader title="1. ANALYSIS INFORMATION" />
			<View style={styles.analysisContainer}>
				<View wrap={false} style={{ padding: "7px" }}>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<Text style={{ marginRight: "10px" }}>
							<Text style={{ fontStyle: "medium" }}>
								{"Date of Analysis:  "}
							</Text>
							<Text>
								{`${dayjs(date)?.format("DD/MM/YYYY")} - ${dayjs().format("DD/MM/YYYY")}`}
							</Text>
						</Text>
					</View>
				</View>
				<View wrap={false} style={{ padding: "7px" }}>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<Text style={{ marginRight: "10px" }}>
							<Text style={{ fontStyle: "medium" }}>
								{"Analysis Type:  "}
							</Text>
							<Text>
								{projects.some((p) => p.analytics.quality) && "Product Quality"}
							</Text>
						</Text>
					</View>
				</View>
				<View style={{ padding: "7px" }}>
					<View wrap={false} style={{ display: "flex", flexDirection: "row" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<Text style={{ marginRight: "10px" }}>
							<Text style={{ fontStyle: "medium" }}>
								{"Project:  "}
							</Text>
							<Text>
								{projects.length > 1 ? fileName : projects[0].name }
							</Text>
						</Text>
					</View>
				</View>
				<View wrap={false} style={{ padding: "7px" }}>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<Text style={{ marginRight: "10px" }}>
							<Text style={{ fontStyle: "medium" }}>
								{"Code Hosting Facility:  "}
							</Text>
							<Text>
								{projects[0].hostingFacility}
							</Text>
						</Text>
					</View>
				</View>
				{projects.length < 2
				&& (
					<View style={{ padding: "7px" }}>
						<View wrap={false} style={{ display: "flex", flexDirection: "row" }}>
							<View wrap={false} style={styles.bulletPoint} />
							<Text style={{ marginRight: "10px" }}>
								<Text style={{ fontStyle: "medium" }}>
									{"Repositories:  "}
								</Text>
							</Text>
						</View>
						{projects.flatMap((p) => p.linkedRepositories).map((repo, index) => {
							const repoStats = statistics?.perProjectStats.find((r) => r?.name === repo?.name
							&& r?.owner === repo?.owner
							&& r?.root === repo?.root
							&& r?.language === repo?.language
							&& r?.csProjects === repo?.csProjects);
							return (
								<View key={index} wrap={false} style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
									<View style={{ display: "flex", flexDirection: "row" }}>
										<View wrap={false} style={styles.transparentBulletPoint} />
										<Text style={{ marginRight: "10px" }}>
											<Text>
												{`${repo?.owner}/${repo?.name}  `}
												{(repo?.root && repo?.root !== ".") && (
													<Text>
														{"("}
														<Text style={{ fontStyle: "medium" }}>{"module:  "}</Text>
														{`${repo.root})`}
													</Text>
												)}
												{`- ${repo.language} - (${repoStats?.totalAnalyses || 0}  analyses in last ${dayjs().diff(dayjs(date), "day")} days)`}
											</Text>
										</Text>
									</View>
								</View>
							);
						})}
					</View>
				)}
				<View wrap={false} style={{ padding: "7px" }}>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<Text style={{ marginRight: "10px" }}>
							<Text style={{ fontStyle: "medium" }}>
								{"Total Number of Analyses:  "}
							</Text>
							<Text>
								{statistics.totalAnalyses}
							</Text>
						</Text>
					</View>
				</View>
				<View wrap={false} style={{ padding: "7px" }}>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<Text style={{ marginRight: "10px" }}>
							<Text style={{ fontStyle: "medium" }}>
								{"Mean Number of Identified Violations per Analysis:  "}
							</Text>
							<Text>
								{statistics.meanViolations}
							</Text>
						</Text>
					</View>
				</View>
				<View wrap={false} style={{ padding: "7px" }}>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<View wrap={false} style={styles.bulletPoint} />
						<Text style={{ marginRight: "10px" }}>
							<Text style={{ fontStyle: "medium" }}>
								{"Total Lines Of Code Analyzed:  "}
							</Text>
							<Text>
								{statistics.totalLOC}
							</Text>
						</Text>
					</View>
				</View>
			</View>
		</View>
		<Footer />
	</Page>
);

AnalysisInformation.propTypes = {
	projects: PropTypes.array,
	statistics: PropTypes.object,
	date: PropTypes.string,
	fileName: PropTypes.string,
};

export default AnalysisInformation;
