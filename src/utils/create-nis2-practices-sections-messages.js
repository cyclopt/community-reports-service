import {
	getMessageFromLlmForNis2AllSections,
	getMessageFromLlmForNis2Section,
} from "#utils";

/**
 * Generates messages for each NIS2 section and an overall message, using provided or LLM-generated content.
 *
 * @async
 * @param {Object} nis2Practices - NIS2 practices data.
 * @param {Object} [providedMessages={}] - Optional messages keyed by section or "Overall". They are provided in case of edit mode
 * @returns {Promise<Object>} Object mapping section names and "Overall" to their messages and stats.
 */
const createNis2PracticesSectionsMessages = async (nis2Practices, providedMessages = {}) => {
	const { generalStats: { overallScore, overallScorePercentage, overallRisk }, sections } = nis2Practices;
	const sectionsMessages = {};

	for (const [key, value] of Object.entries(sections)) {
		const {
			generalStats: {
				overallScore: overallSectionScore,
				overallScorePercentage: overallSectionScorePercentage,
				overallRisk: overallSectionRisk,
			},
			questions,
		} = value;

		let message;
		if (providedMessages[key]) {
			message = providedMessages[key];
		} else {
			const llmResponse = await getMessageFromLlmForNis2Section(key, questions, overallSectionRisk);
			message = llmResponse;
		}

		sectionsMessages[key] = {
			message,
			overallScore: overallSectionScore,
			overallScorePercentage: overallSectionScorePercentage,
			overallRisk: overallSectionRisk,
		};
	}

	let message;
	if (providedMessages.Overall) {
		message = providedMessages.Overall;
	} else {
		const sectionsRisk = Object.fromEntries(
			Object.entries(sectionsMessages).map(([key, val]) => [key, val.overallRisk]),
		);
		const llmResponse = await getMessageFromLlmForNis2AllSections(sectionsRisk, overallRisk);
		message = llmResponse;
	}

	sectionsMessages.Overall = {
		message,
		overallScore,
		overallScorePercentage,
		overallRisk,
	};

	return sectionsMessages;
};

export default createNis2PracticesSectionsMessages;
