import { Text, View, Page } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

import BodyText from "./BodyText.js";
import BoldText from "./BoldText.js";
import BulletPoint from "./BulletPoint.js";
import Footer from "./Footer.js";
import SectionHeader from "./SectionHeader.js";
import SubHeader from "./SubHeader.js";

const SecondSection = ({ addToTOC,
	sectionsNumber,
	thirdSectionExist,
	metricsSection,
	violationsSection,
	sastSection,
	vulnerabilitiesSection,
	practicesSection,
	service,
}) => {
	const includeViolations = violationsSection || sastSection || vulnerabilitiesSection;
	const includedBoth = violationsSection && sastSection && vulnerabilitiesSection && (service === "tdd" ? metricsSection : practicesSection);
	return (

		<Page size="A4" orientation="portrait">
			<SubHeader />

			<View style={styles.container}>
				{/* 2. EVALUATION AXES */}
				<SectionHeader id="2" number="2. " title="EVALUATION AXES" addToTOC={addToTOC} level={0} />

				<BodyText>

					{`The Evaluation Axes of this ${service === "tdd" ? "Technical Due Diligence" : "NIS2 Directive Compliance Report"} focus on `}

					{includedBoth ? (
						<BodyText>
							{"two fundamental aspects: "}
							<BoldText>{"Security "}</BoldText>
							{"and "}
							<BoldText>{`${service === "tdd" ? "Maintainability" : "Organizational/Technical Practices"}`}</BoldText>
							{
								service === "tdd"
									? ". These aspects were selected as they play a critical role in ensuring the robustness, reliability, and long-term sustainability of the project."
									: ". These aspects were selected because they directly reflect the core objectives of the NIS2 Directive—ensuring the resilience, reliability, and regulatory compliance of essential and important entities. Together, they form the foundation for assessing both the technical safeguards and the broader governance framework that support the project’s cybersecurity posture."
							}
						</BodyText>
					) : (
						<BodyText>
							{includeViolations ? (
								<BodyText>
									{"one fundamental aspect: "}
									<BoldText>{"Security "}</BoldText>
									{". This aspect was selected as plays a critical role in ensuring the robustness, reliability, and long-term sustainability of the project."}
								</BodyText>
							) : (
								<BodyText>
									{"one fundamental aspect: "}
									<BoldText>{`${service === "tdd" ? "Maintainability" : "Organizational/Technical Practices"}`}</BoldText>
									{
										service === "tdd"
											? ". This aspect was selected as plays a critical role in ensuring the robustness, reliability, and long-term sustainability of the project."
											: ". This focus was selected to assess the maturity of internal cybersecurity governance, risk management procedures, and operational readiness, as outlined in the NIS2 Directive."
									}
								</BodyText>
							)}
						</BodyText>
					)}

				</BodyText>

				<Text styles={{ paddingTop: 1 }}>
					{" "}
				</Text>

				<BodyText>
					{"The evaluation process leverages "}
					<BoldText>{"automated tools"}</BoldText>
					{" "}
					{"and "}
					<BoldText>{"manual code reviews"}</BoldText>
					{" "}
					{"following the "}
					<BoldText>{"ISO/IEC 25010:2023"}</BoldText>
					{" "}
					{"standard for software product quality evaluation. The findings provide insights into the project’s strengths and highlight any areas requiring improvements or mitigations."}
				</BodyText>

				<Text styles={{ paddingTop: 1 }}>
					{" "}
				</Text>

				{includedBoth ? (
					<BodyText>
						{
							service === "tdd"
								? "Security and maintainability are assessed across multiple dimensions, including source code analysis, dependency management, compliance checks, and structural code quality. By focusing on these aspects, this report provides a comprehensive overview of the project’s technical health and necessary improvements."
								: "Security and organizational / technical practices are assessed across multiple dimensions, including secure software development, dependency and supply chain management, regulatory compliance checks, incident response readiness, and internal governance structures. By evaluating these areas, this report provides a comprehensive overview of the project’s alignment with NIS2 compliance requirements and outlines the necessary improvements to strengthen its overall cybersecurity resilience."
						}
					</BodyText>
				) : includeViolations ? (
					<BodyText>
						{"Security is assessed across multiple dimensions, including source code analysis, dependency management, compliance checks, and structural code quality. By focusing on this aspect, this report provides a comprehensive overview of the project’s technical health and necessary improvements."}
					</BodyText>
				)
					: (
						<BodyText>
							{
								service === "tdd"
									? "Maintainability is assessed across multiple dimensions, including source code analysis, dependency management, compliance checks, and structural code quality. By focusing on this aspect, this report provides a comprehensive overview of the project’s technical health and necessary improvements."
									: "Organizational and technical practices are assessed across multiple dimensions, including governance structures, risk management processes, access control mechanisms, incident response capabilities, and supply chain security. By focusing on this aspect, this report provides a comprehensive overview of the project’s alignment with NIS2 requirements and highlights necessary improvements to strengthen its cybersecurity posture."
							}
						</BodyText>
					)}

				{thirdSectionExist && (
					<>
						<SectionHeader id="2.1" number="2.1" title="Security" addToTOC={addToTOC} level={1} />

						<BodyText>
							{"Security is a fundamental quality characteristic, ensuring that data, systems, and user interactions are protected from unauthorized access and potential threats. The security assessment focuses on the following aspects:"}
						</BodyText>

						<BulletPoint title="Confidentiality: " description="Ensures that sensitive information is accessible only to authorized users." />
						<BulletPoint title="Integrity: " description="Protects data from unauthorized modifications, ensuring reliability and consistency." />
						<BulletPoint title="Accountability: " description="Tracks system interactions to ensure that all actions can be traced back to responsible entities." />
						<BulletPoint title="Authentication & Authorization: " description="Evaluates mechanisms to confirm user identities and enforce appropriate access controls." />
						<BulletPoint title="Third-Party Dependencies: " description="Analyzes vulnerabilities in external libraries and frameworks that may pose security risks." />

						<Text styles={{ paddingTop: 3 }}>
							{" "}
						</Text>

						<BodyText>{"The analysis was performed in the following axes:"}</BodyText>

						{sastSection && (
							<>
								{/* 2.1.1 */}
								<SectionHeader id={sectionsNumber.secondSectionNumbers.sast.toString()} number={sectionsNumber.secondSectionNumbers.sast.toString()} title="Security Code Vulnerabilities" addToTOC={addToTOC} level={2} />

								<BodyText>
									{"Code security vulnerabilities are flaws or weaknesses within the source code of an application "}
									{"that can be exploited by attackers to compromise the security of the system. These "}
									{"vulnerabilities can lead to various risks such as unauthorized access, data leakage, or even "}
									{"complete system compromise. For identifying code security vulnerabilities, we utilized automated tools "}
									{"in combination with manual inspection and validation of the "}
									{"findings. We classified the vulnerabilities by their severity levels: "}
								</BodyText>

								<Text styles={{ paddingTop: 1 }}>
									{" "}
								</Text>

								<BulletPoint title="Critical/High: " description="These vulnerabilities dangerously expose the system. Exploitation could lead to destructive effects such as disruptions in system availability, integrity of data, data theft/leakage, unauthorized code execution, etc. Resolving critical vulnerabilities is urgent to prevent potential system breaches." />
								<BulletPoint title="Medium: " description="Medium-severity issues typically arise from misconfigurations or non-optimal coding practices. While exploitation of these vulnerabilities requires specific conditions, they may still allow attackers to gain unauthorized access to sensitive information." />
								<BulletPoint title="Low: " description="Low-severity vulnerabilities generally represent minor issues that have a minimal immediate impact on the system's security. While not urgent, addressing them improves overall code quality and reduces the potential for future exploits." />

								<Text styles={{ paddingTop: 1 }}>
									{" "}
								</Text>

								<BodyText>
									{"Additionally, we categorized vulnerabilities using the Common Weakness Enumeration (CWE), a "}
									{"system that assigns a unique identifier to each type of software vulnerability. This classification " }
									{"helps pinpoint specific weaknesses in the code and provides a standardized framework for "}
									{"discussing and addressing vulnerabilities. CWE is widely recognized across the security industry " }
									{"and serves as a critical resource for identifying, tracking, and mitigating security risks in software development. "}
								</BodyText>
							</>
						)}

						{vulnerabilitiesSection && (
							<>
								{/* 2.1.2. Security Dependencies Vulnerabilities */}
								<SectionHeader id={sectionsNumber.secondSectionNumbers.vulnerabilities.toString()} number={sectionsNumber.secondSectionNumbers.vulnerabilities.toString()} title="Security Dependencies Vulnerabilities" addToTOC={addToTOC} level={2} />

								<BodyText>
									{"Security dependencies vulnerabilities arise when an application relies on third-party libraries, "}
									{"frameworks, or packages that contain weaknesses or flaws. These vulnerabilities can be exploited " }
									{"by attackers to compromise the security of the system, potentially leading to unauthorized "}
									{"access, data leakage, or system disruption. For identifying and assessing security dependencies " }
									{"vulnerabilities, we utilized a combination of our proprietary software and OWASP "}
									{"Dependency-Check, which automatically scans the project's dependencies for known "}
									{"vulnerabilities, combined with manual inspection and validation of the findings. These tools "}
									{"gather valuable data from multiple sources, including the GitHub Advisory Database and the "}
									{"NIST National Vulnerability Database (NVD) to ensure that vulnerabilities are detected and "}
									{"evaluated accurately. By cross-referencing these databases, our tools provide a comprehensive "}
									{"view of the application's dependencies’ security. We classified the detected vulnerabilities by "}
									{"their severity levels:"}
								</BodyText>

								<Text styles={{ paddingTop: 1 }}>
									{" "}
								</Text>

								<BulletPoint title="Critical/High: " description="Critical/High-severity vulnerabilities can lead to severe security breaches, data corruption, or system compromise. Exploitation may cause widespread disruptions or unauthorized access. Immediate resolution is essential to prevent catastrophic outcomes." />
								<BulletPoint title="Medium: " description="Medium-severity vulnerabilities often arise from misconfigurations or outdated dependencies. They do not immediately endanger the system but could be exploited under specific conditions, requiring timely remediation to prevent future risks." />
								<BulletPoint title="Low: " description="Low-severity vulnerabilities have minimal immediate impact but should be addressed to improve security and prevent minor issues from escalating." />

								<Text styles={{ paddingTop: 1 }}>
									{" "}
								</Text>

								<BodyText>
									{"In a similar manner with code vulnerabilities, we further categorized dependencies vulnerabilities using the Common Weakness Enumeration (CWE)."}
								</BodyText>
							</>
						)}

						{violationsSection && (
							<>
								{/* 2.2.2. Security Coding Vulnerabilities */}
								<SectionHeader id={sectionsNumber.secondSectionNumbers.securityViolations.toString()} number={sectionsNumber.secondSectionNumbers.securityViolations.toString()} title="Security Coding Violations" addToTOC={addToTOC} level={2} />

								<BodyText>
									{"Security coding violations occur when developers do not adhere to standard security best "}
									{"practices, potentially introducing vulnerabilities into the system. These violations can lead to" }
									{"risks such as data leakage, unauthorized access, and other security threats that compromise the "}
									{"integrity and confidentiality of the portal."}
								</BodyText>

								{/* <BodyText>
									{"For the assessment of security coding violations in Java repositories, we utilized PMD5"}
									{", a static"}
									{"analysis tool, and other similar tools that help identify deviations from secure coding standards."}
									{"The detected violations are classified into three severity levels:"}
								</BodyText> */}
								<BodyText>
									{"To assess security-related coding violations, we used static analysis tools that detect deviations from established secure coding practices. The identified violations are categorized into three levels of severity."}
								</BodyText>

								<BulletPoint title="Critical: " description="These represent severe issues that can significantly impact system stability, security, or functionality. They require immediate attention and remediation to prevent system failures or security breaches." />
								<BulletPoint title="Major: " description="These issues are important but not immediately system-breaking. They may lead to performance degradation, maintainability challenges, or potential security concerns if left unresolved." />
								<BulletPoint title="Minor: " description="These are less severe but still indicate areas where best practices are not strictly followed. Addressing them improves code quality, readability, and long-term maintainability." />

								<Text styles={{ paddingTop: 1 }}>
									{" "}
								</Text>

								<BodyText>
									{"By categorizing and prioritizing these violations, we ensure that the most critical security risks "}
									{"are addressed first, while also promoting adherence to best practices to maintain a robust and "}
									{"secure codebase."}
								</BodyText>
							</>
						)}

					</>
				)}

				{metricsSection && service === "tdd" && (
					<>
						{/* 2.2. Maintainability */}
						<SectionHeader
							id={sectionsNumber.secondSectionNumbers.maintainability.toString()}
							number={sectionsNumber.secondSectionNumbers.maintainability.toString()}
							title="Maintainability"
							addToTOC={addToTOC}
							level={1}
						/>

						<BodyText>
							{"Maintainability is a key quality characteristic that represents how efficiently a product or system "}
							{"can be modified to improve performance, correct defects, or adapt to changes. This assessment "}
							{"considers several sub-characteristics:"}
						</BodyText>

						<BulletPoint title="Modularity: " description="Evaluates the degree to which the system is composed of discrete, self-contained components that enhance reusability and ease of modification." />
						<BulletPoint title="Analyzability: " description="Measures how easily a developer can diagnose deficiencies, failures, or the root causes of issues within the codebase." />
						<BulletPoint title="Modifiability: " description="Assesses the ease with which changes can be made without introducing new defects." />
						<BulletPoint title="Readability: " description="Examines the clarity of code structure, documentation, and adherence to best practices." />
						<BulletPoint title="Reusability: " description="Determines the extent to which existing code components can be leveraged in multiple contexts without extensive modification." />

						<BodyText>
							{"The analysis was performed in the following axes:"}
						</BodyText>

						{/* 2.2.1. Static Analysis Metrics */}
						<SectionHeader
							id={sectionsNumber.secondSectionNumbers["Static Analysis Metrics"].toString()}
							number={sectionsNumber.secondSectionNumbers["Static Analysis Metrics"].toString()}
							title="Static Analysis Metrics"
							addToTOC={addToTOC}
							level={2}
						/>

						<BodyText>
							{"Static analysis metrics provide quantitative insights into the structural quality of the codebase, "}
							{"helping identify potential maintainability issues before they become significant problems. These "}
							{"analyses are performed using automated static analysis tools, such as Simian or JSCPD"}
							{", which "}
							{"analyze the code without executing it."}
						</BodyText>

						<BodyText>
							{"Static analysis includes metrics such as:"}
						</BodyText>

						<BulletPoint title="Cyclomatic Complexity: " description="Measures the number of independent execution paths within a function or method, indicating its complexity and potential difficulty to maintain." />
						<BulletPoint title="Nesting Level: " description="Evaluates the depth of nested structures, as excessive nesting can reduce code readability and maintainability." />
						<BulletPoint title="Number of Imports: " description="Tracks dependencies, where a high number of imports may suggest tight coupling and reduced modularity." />
						<BulletPoint title="Comments Density: " description="Assesses the proportion of comments to code, ensuring proper documentation and readability." />
						<BulletPoint title="Code Duplications: " description="Occur when identical or similar code fragments appear multiple times within a codebase. These duplications increase technical debt, hinder maintainability, and reduce reusability." />

						<BodyText>
							{"Using the methodology developed by Cyclopt, these individual static analysis metrics are "}
							{"aggregated in a hierarchical model to calculate high-level software quality properties:"}
						</BodyText>

						<BulletPoint title="Maintainability: " description="Represents the ease with which code can be modified, extended, or corrected without introducing defects." />
						<BulletPoint title="Readability: " description="Assesses how easily developers can understand the code, which directly impacts maintainability and debugging efforts." />
						<BulletPoint title="Reusability: " description="Evaluates how effectively code components can be reused in different parts of the system without significant modifications." />

						<Text styles={{ paddingTop: 1 }}>
							{" "}
						</Text>

						<BodyText>
							{"By structuring the evaluation in this hierarchical manner, the analysis provides actionable insights "}
							{"that help developers prioritize improvements and enhance the overall quality of the software "}
							{"system."}
						</BodyText>

						{/* 2.2.2. Security Coding Violations */}
						<SectionHeader
							id={sectionsNumber.secondSectionNumbers["Coding Violations"].toString()}
							number={sectionsNumber.secondSectionNumbers["Coding Violations"].toString()}
							title="Coding Violations"
							addToTOC={addToTOC}
							level={2}
						/>

						<BodyText>
							{"Coding violations refer to instances where the code deviates from best practices, affecting "}
							{"maintainability, readability, reusability, and overall code quality. Similar to Security Coding "}
							{"Violations, these violations "}
							{"are categorized into "}
							<BoldText>{"Critical, "}</BoldText>
							<BoldText>{"Major,"}</BoldText>
							{" and "}
							<BoldText>{"Minor "}</BoldText>
							{"levels, ensuring a structured approach to prioritizing and resolving issues."}
						</BodyText>

						<BodyText>
							{"While Security Coding Violations focus specifically on security-related flaws, Coding Violations "}
							{"encompass a broader spectrum, including poor code structure, inefficient design patterns, and "}
							{"improper use of language features. Addressing these violations improves long-term "}
							{"maintainability and adherence to coding standards."}
						</BodyText>
					</>
				)}

				{practicesSection && (
					<>
						<SectionHeader id="2.2" number="2.2" title="Cybersecurity Practices" addToTOC={addToTOC} level={1} />

						<BodyText>
							{"Effective cybersecurity is built on a foundation of well-defined practices and policies that span all critical areas of an organization’s digital operations. These practices are systematically structured across 19 core thematic domains, each addressing a key aspect of cyber resilience:"}
						</BodyText>

						<BulletPoint title="Cybersecurity Governance and Risk Management: " description="Establishes policies, roles, and responsibilities to manage cybersecurity risks effectively." />
						<BulletPoint title="Asset and Software Inventory: " description="Maintains up-to-date records of hardware and software to ensure visibility and control over IT assets." />
						<BulletPoint title="Secure Configuration of Systems and Applications: " description="Ensures all systems and software are securely configured to reduce exposure to vulnerabilities." />
						<BulletPoint title="Execution Control of Applications and Services: " description="Prevents unauthorized programs from running, helping to reduce malware risks." />
						<BulletPoint title="Account Management and Access Control: " description="Manages user privileges to ensure only authorized personnel can access specific resources." />
						<BulletPoint title="User Authentication: " description="Enforces strong authentication mechanisms to verify user identities securely." />
						<BulletPoint title="Network Security: " description="Protects the organization’s network infrastructure from unauthorized access and threats.." />
						<BulletPoint title="Malware Protection: " description="Implements tools and practices to detect and prevent malicious software." />
						<BulletPoint title="Logging and Event Monitoring: " description="Collects and analyzes system logs to detect and respond to suspicious activities." />
						<BulletPoint title="Web Application Security: " description="Secures online applications against common web-based attacks." />
						<BulletPoint title="Remote Work Security: " description="Ensures secure access and practices for employees working outside the corporate perimeter." />
						<BulletPoint title="Cryptographic Protection: " description="Applies encryption and key management to safeguard data confidentiality and integrity." />
						<BulletPoint title="Security Awareness and Training: " description="Educates staff on cybersecurity risks and best practices to reduce human-related threats." />
						<BulletPoint title="Supply Chain Risk Management: " description="Addresses security risks posed by third-party vendors and suppliers." />
						<BulletPoint title="Technical Security Controls Implementation: " description="Deploys security technologies and measures to protect systems and data." />
						<BulletPoint title="Physical Security of Facilities: " description="Protects physical infrastructure and IT equipment from unauthorized physical access or damage." />
						<BulletPoint title="Data Backup and Recovery: " description="Ensures regular backups and the ability to restore data in the event of loss or corruption." />
						<BulletPoint title="Incident Response and Management: " description="Establishes procedures for detecting, managing, and recovering from cybersecurity incidents." />
						<BulletPoint title="Business Continuity and Disaster Recovery: " description="Ensures that essential operations can continue or quickly resume after a disruption." />
					</>
				)}

			</View>

			<View
				fixed
				render={({ pageNumber }) => (
					<Footer pageNumber={pageNumber} />
				)}
			/>
		</Page>
	);
};

SecondSection.propTypes = {
	addToTOC: PropTypes.func.isRequired,
	sectionsNumber: PropTypes.object,
	thirdSectionExist: PropTypes.bool,
	metricsSection: PropTypes.bool,
	violationsSection: PropTypes.bool,
	vulnerabilitiesSection: PropTypes.bool,
	sastSection: PropTypes.bool,
	practicesSection: PropTypes.bool,
	service: PropTypes.string,
};

export default SecondSection;
