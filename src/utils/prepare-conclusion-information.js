/**
 * Prepares structured conclusion data for a report based on custom section toggles,
 * LLM-generated content, and static analysis findings.
 *
 * This function supports different service types (e.g., "tdd", "secure") and returns:
 * - Combined analysis data for each selected section
 * - A formatted string of included section names
 * - A role prompt suitable for guiding LLM output generation
 *
 * @param {Object} customSections - An object indicating which report sections are enabled.
 *
 * @param {Object} llmResponses - Object containing all LLM-generated textual content.
 *
 * @param {Object} analysisFindings - Object containing analysis results.
 *
 * @param {string} service - The type of service ("tdd" or "nis2") used to generate the proper LLM role prompt.
 *
 * @returns {Object} result
 * @returns {Object} result.conclusionData - Final structured data per section, ready for report rendering.
 * @returns {string} result.sectionsText - Comma-separated list of included section titles.
 * @returns {string} result.llmRole - A predefined role prompt for guiding LLM behavior.
 */
const prepareDataForConclusion = (
	customSections,
	llmResponses,
	analysisFindings,
	service,
) => {
	const conclusionData = {};
	const sectionsText = [];

	// Handle SAST section
	if (customSections?.sast && analysisFindings?.sast) {
		const sast = analysisFindings.sast;
		conclusionData.securityCodeVulnerabilities = {
			text: llmResponses.sast,
			counts: Object.fromEntries(sast.graphData.xAxis.map((key, i) => [key, sast.graphData.yAxis[i]])),
			severityInformation: sast.cwe,
		};
		sectionsText.push("Security Code Vulnerabilities");
	}

	// Handle dependency vulnerabilities
	if (customSections?.vulnerabilities && analysisFindings?.vulnerabilities) {
		const vulns = analysisFindings.vulnerabilities;
		conclusionData.securityDependenciesVulnerabilities = {
			text: llmResponses.vulnerabilities,
			counts: Object.fromEntries(vulns.graphData.xAxis.map((key, i) => [key, vulns.graphData.yAxis[i]])),
			severityInformation: vulns.cwe,
		};
		sectionsText.push("Security Dependencies Vulnerabilities");
	}

	// Handle security coding violations
	if (customSections?.violations && analysisFindings?.violations?.securityViolations) {
		const secViolations = analysisFindings.violations.securityViolations;
		conclusionData.securityCodingViolations = {
			text: llmResponses.securityViolations,
			counts: Object.fromEntries(secViolations.graphData.xAxis.map((key, i) => [key, secViolations.graphData.yAxis[i]])),
			severityInformation: secViolations.violationsPerSeverity,
		};
		sectionsText.push("Security Coding Violations");
	}

	// Handle general coding violations
	if (customSections?.metrics && analysisFindings?.violations) {
		const metrics = analysisFindings.violations;
		conclusionData.codingViolations = {
			text: llmResponses.violations,
			counts: Object.fromEntries(metrics.graphData.xAxis.map((key, i) => [key, metrics.graphData.yAxis[i]])),
			severityInformation: metrics.severityViolations?.violationsPerSeverity || {},
		};
		sectionsText.push("Coding Violations");

		// Optionally include maintainability
		if (llmResponses.maintainability) {
			conclusionData.maintainability = llmResponses.maintainability;
			sectionsText.push("Maintainability");
		}
	}

	// Handle cybersecurity practices (common in secure service)
	if (customSections?.practices && llmResponses?.practices) {
		conclusionData.cybersecurityPractices = llmResponses.practices;
		sectionsText.push("Cybersecurity Practices");
	}

	// Create role of llm based on service
	const llmRole = service === "tdd"
		? "You are a senior software enginner performing a technical due dilligence analysis."
		: "You are a cybersecurity expert analyzing the compliance of an organization with the NIS2 Directive.";

	return {
		conclusionData,
		sectionsText: sectionsText.join(", "),
		llmRole,
	};
};

export default prepareDataForConclusion;
