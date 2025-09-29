import constructUrl from "@iamnapo/construct-url";
import got from "got";

const { LLM_SERVICE_TOKEN, LLM_SERVICE_URL } = process.env;

// Generic function to get a message from the LLM service
// You need to add your own LLM service api
const getMessageFromLlm = async (title, payload) => {
	const { body } = await got.post(constructUrl(LLM_SERVICE_URL, "/api/llm/report"), {
		json: {
			data: { ...payload },
			title,
		},
		headers: {
			Authorization: `Bearer ${LLM_SERVICE_TOKEN}`,
		},
		responseType: "json",
	});

	return body.response;
};

export const getMessageFromLlmForViolations = (data) => getMessageFromLlm("codingViolations", {
	totalViolations: data.totalViolationsCount,
	numberOfCritical: data.severityViolations.numberOfCritical,
	numberOfMajor: data.severityViolations.numberOfMajor,
});

export const getMessageFromLlmForVulnerabilities = (data) => getMessageFromLlm("vulnerabilities", {
	totalVulnerabilities: data.totalVulnerabilities,
	vulnerabilities: data.vulnerabilities,
});

export const getMessageFromLlmForSast = (data) => getMessageFromLlm("sast", {
	totalSast: data.totalSast,
});

export const getMessageFromLlmForMaintainability = (data) => getMessageFromLlm("maintainability", {
	metrics: data,
});

export const getMessageFromLlmForSecurityViolations = (data) => getMessageFromLlm("securityViolations", {
	totalViolations: data.totalViolations,
	severityCounts: data.severityCounts,
	numberOfViolationTypes: data.graphData.xAxis.length,
});

export const getMessageFromLlmForNis2Section = (category, questions, overallRisk) => getMessageFromLlm("nis2SinglePractice", {
	category,
	questions,
	overallRisk,
});

export const getMessageFromLlmForNis2AllSections = (sectionsRisk, overallRisk) => getMessageFromLlm("nis2AllPractices", {
	sectionsRisk,
	overallRisk,
});

export const getMessageFromLlmForConclusion = (conclusionData, sections, role) => getMessageFromLlm("conclusion", {
	conclusionData,
	sections,
	role,
});
