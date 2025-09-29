import { Text, View, Page } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import getRepoStatistics from "../../../utils/get-repo-statistics.js";
import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import QualityCharacteristic from "../QualityCharacteristic.js";
import QualityScore from "../QualityScore.js";
import styles from "../styles.js";
import ViolationsChart from "../ViolationsChart.js";

const Findings = ({ data, options }) => (
	<>
		{data?.map((r, index) => {
			const repoStats = getRepoStatistics(r);

			return (
				<React.Fragment key={`findings-${index}`}>
					<Page wrap size="A4" orientation="portrait" style={styles.page}>
						<Header />
						<View style={{ paddingLeft: "50px", paddingRight: "50px" }}>
							{(index === 0) && <ContentHeader title="3. FINDINGS" />}
							<View>
								<Text style={{ marginTop: (index === 0) ? "0" : "30px", marginBottom: "10px" }}>
									{`The following table summarizes the results of the Cyclopt static quality analysis on the repository "${repoStats?.name}"`}
									{(repoStats?.root && repoStats?.root !== ".") && <Text style={{ fontStyle: "medium" }}>{` (module:  ${repoStats?.root})`}</Text>}
								</Text>
								<View style={{ padding: "7px" }}>
									<View style={{ display: "flex", flexDirection: "row" }}>
										<View wrap={false} style={styles.bulletPoint} />
										<Text style={{ marginRight: "10px" }}>
											<Text style={{ fontStyle: "medium" }}>
												{"Codebase Lines of Code:  "}
											</Text>
											<Text style={{ marginLeft: "10px" }}>
												{`${repoStats?.last?.linesOfCode}  `}
												{!["0", "+0", "0%"].includes(repoStats?.linesOfCode?.difference) && <Text style={{ fontSize: "8px" }}>{`(${repoStats?.linesOfCode?.difference})`}</Text>}
											</Text>
										</Text>
									</View>
								</View>
								<View style={{ padding: "7px" }}>
									<View style={{ display: "flex", flexDirection: "row" }}>
										<View wrap={false} style={styles.bulletPoint} />
										<Text style={{ marginRight: "10px" }}>
											<Text style={{ fontStyle: "medium" }}>
												{"Last Analysis:  "}
											</Text>
											<Text style={{ marginLeft: "10px" }}>
												{`${repoStats?.lastAnalysis}`}
											</Text>
										</Text>
									</View>
								</View>
								<View style={{ padding: "7px" }}>
									<View style={{ display: "flex", flexDirection: "row" }}>
										<View wrap={false} style={styles.bulletPoint} />
										<Text style={{ marginRight: "10px" }}>
											<Text style={{ fontStyle: "medium" }}>
												{"Commit SHA:  "}
											</Text>
											<Text>
												{`${repoStats?.sha}  `}
												{(repoStats?.author !== "") && (
													<>
														{"("}
														<Text style={{ fontStyle: "medium" }}>{"author: "}</Text>
														<Text>{`${repoStats?.author})`}</Text>
													</>
												)}
											</Text>
										</Text>
									</View>
								</View>
								<View style={{ padding: "7px" }}>
									<View style={{ display: "flex", flexDirection: "row", marginBottom: "7px" }}>
										<View wrap={false} style={styles.bulletPoint} />
										<Text style={{ marginRight: "10px" }}>
											<Text style={{ fontStyle: "medium" }}>
												{"Total Violations:  "}
											</Text>
											<Text>{`${repoStats?.last?.totalViolations}  `}</Text>
											{!["0", "+0", "0%"].includes(repoStats?.totalViolations?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.totalViolations?.adornment }}>{`(${repoStats?.totalViolations?.difference})`}</Text>}
										</Text>
									</View>
									<View style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<View wrap={false} style={styles.transparentBulletPoint} />
											<Text style={{ marginRight: "10px" }}>
												<Text style={{ fontStyle: "medium" }}>
													{"Minor:  "}
												</Text>
												<Text>{`${repoStats?.last?.minorViolations}  `}</Text>
												{!["0", "+0", "0%"].includes(repoStats?.minorViolations?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.minorViolations?.adornment }}>{`(${repoStats?.minorViolations?.difference})`}</Text>}
											</Text>
										</View>
									</View>
									<View style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<View wrap={false} style={styles.transparentBulletPoint} />
											<Text style={{ marginRight: "10px" }}>
												<Text style={{ fontStyle: "medium" }}>
													{"Major:  "}
												</Text>
												<Text>{`${repoStats?.last?.majorViolations}  `}</Text>
												{!["0", "+0", "0%"].includes(repoStats?.majorViolations?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.majorViolations?.adornment }}>{`(${repoStats?.majorViolations?.difference})`}</Text>}
											</Text>
										</View>
									</View>
									<View style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<View wrap={false} style={styles.transparentBulletPoint} />
											<Text style={{ marginRight: "10px" }}>
												<Text style={{ fontStyle: "medium" }}>
													{"Critical:  "}
												</Text>
												<Text>{`${repoStats?.last?.criticalViolations}  `}</Text>
												{!["0", "+0", "0%"].includes(repoStats?.criticalViolations?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.criticalViolations?.adornment }}>{`(${repoStats?.criticalViolations?.difference})`}</Text>}
											</Text>
										</View>
									</View>
								</View>
								<View style={{ padding: "7px" }}>
									<View style={{ display: "flex", flexDirection: "row", marginBottom: "7px" }}>
										<View wrap={false} style={styles.bulletPoint} />
										<Text style={{ marginRight: "10px" }}>
											<Text style={{ fontStyle: "medium" }}>
												{"Total Vulnerabilities:  "}
											</Text>
											<Text>{`${repoStats?.last?.totalVulnerabilities}  `}</Text>
											{!["0", "+0", "0%"].includes(repoStats?.totalVulnerabilities?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.totalVulnerabilities?.adornment }}>{`(${repoStats?.totalVulnerabilities?.difference})`}</Text>}
										</Text>
									</View>
									<View style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<View wrap={false} style={styles.transparentBulletPoint} />
											<Text style={{ marginRight: "10px" }}>
												<Text style={{ fontStyle: "medium" }}>
													{"Minor:  "}
												</Text>
												<Text>{`${repoStats?.last?.minorVulnerabilities}  `}</Text>
												{!["0", "+0", "0%"].includes(repoStats?.minorVulnerabilities?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.minorVulnerabilities?.adornment }}>{`(${repoStats?.minorVulnerabilities?.difference})`}</Text>}
											</Text>
										</View>
									</View>
									<View style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<View wrap={false} style={styles.transparentBulletPoint} />
											<Text style={{ marginRight: "10px" }}>
												<Text style={{ fontStyle: "medium" }}>
													{"Moderate:  "}
												</Text>
												<Text>{`${repoStats?.last?.moderateVulnerabilities}  `}</Text>
												{!["0", "+0", "0%"].includes(repoStats?.moderateVulnerabilities?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.moderateVulnerabilities?.adornment }}>{`(${repoStats?.moderateVulnerabilities?.difference})`}</Text>}
											</Text>
										</View>
									</View>
									<View style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<View wrap={false} style={styles.transparentBulletPoint} />
											<Text style={{ marginRight: "10px" }}>
												<Text style={{ fontStyle: "medium" }}>
													{"Major:  "}
												</Text>
												<Text>{`${repoStats?.last?.majorVulnerabilities}  `}</Text>
												{!["0", "+0", "0%"].includes(repoStats?.majorVulnerabilities?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.majorVulnerabilities?.adornment }}>{`(${repoStats?.majorVulnerabilities?.difference})`}</Text>}
											</Text>
										</View>
									</View>
									<View style={{ padding: "7px", paddingLeft: "30px", paddingRight: "30px" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<View wrap={false} style={styles.transparentBulletPoint} />
											<Text style={{ marginRight: "10px" }}>
												<Text style={{ fontStyle: "medium" }}>
													{"Critical:  "}
												</Text>
												<Text>{`${repoStats?.last?.criticalVulnerabilities}  `}</Text>
												{!["0", "+0", "0%"].includes(repoStats?.criticalVulnerabilities?.difference) && <Text style={{ fontSize: "8px", color: repoStats?.criticalVulnerabilities?.adornment }}>{`(${repoStats?.criticalVulnerabilities?.difference})`}</Text>}
											</Text>
										</View>
									</View>
								</View>
								<QualityScore score={repoStats?.last?.overallProjectRating} />
								<QualityCharacteristic
									maintainability={repoStats?.last?.maintainability}
									security={repoStats?.last?.security}
									readability={repoStats?.last?.readability}
									reuseability={repoStats?.last?.reuseability}
								/>
								{(String(options?.criticalViolations) === "true") && <ViolationsChart violations={repoStats?.last?.violations} />}
							</View>
						</View>
						<Footer />
					</Page>
				</React.Fragment>
			);
		})}
	</>
);

Findings.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	options: PropTypes.object,
};

export default Findings;
