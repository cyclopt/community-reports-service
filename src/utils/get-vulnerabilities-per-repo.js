import groupArrayByProperty from "./group-by-properties.js";
import sortVulnerabilities from "./sort-vulnerabilities.js";
import { vulnerabilitiesFocus, violationsFocus } from "./vulnerabilities-focus.js";

function mergeViolations(arr) {
	const result = {};

	for (const entry of arr.filter(Boolean)) {
		for (const key of Object.keys(entry)) {
			if (entry[key]?.category === "Security") {
				if (result[key]) {
					const existingFiles = new Set(result[key].files?.map((file) => `${file.filePath}:${file.line}`));
					const newFiles = entry[key].files?.filter((file) => !existingFiles.has(`${file.filePath}:${file.line}`));
					result[key].files?.push(...newFiles);

					result[key].count = result[key].files?.length ?? 0;
				} else {
					result[key] = { ...entry[key] };
				}
			}
		}
	}

	return result;
}

function getVulnerabilitiesPerRepo(data) {
	const groupedData = groupArrayByProperty(data, ["name", "owner"]);

	return groupedData.map((repos) => {
		const existingVulnerabilities = new Set();

		const vulnerabilities = repos.flatMap((repo) => {
			const analysis = repo?.analyses?.find(
				(analysisS) => analysisS?.commit?._id === repo.lastCommit?._id,
			);

			if (analysis) {
				const repoVulnerabilities = analysis.vulnerabilities || [];

				// Check for existing vulnerabilities and add only unique ones
				for (const vulnerability of repoVulnerabilities) {
					existingVulnerabilities.add(`${vulnerability.moduleName}${vulnerability.version}`);
				}

				return repoVulnerabilities;
			}

			return [];
		});

		const uniqueVulnerabilities = [...existingVulnerabilities]
			.map((moduleID) => vulnerabilities.find((vulnerability) => `${vulnerability.moduleName}${vulnerability.version}` === moduleID));

		const mergedViolations = mergeViolations(repos.flatMap(
			(repo) => repo?.analyses?.find((analysis) => analysis?.commit?._id === repo.lastCommit?._id)?.violationsInfo?.violations,
		));

		const uniqueViolations = Object.keys(mergedViolations)?.map((k) => ({
			severity: mergedViolations[k].severity,
			count: mergedViolations[k].count,
			title: mergedViolations[k].title,
			explanation: mergedViolations[k].explanation,
		}));

		return {
			name: repos[0]?.name,
			owner: repos[0]?.owner,
			vulnerabilities: sortVulnerabilities(uniqueVulnerabilities, vulnerabilitiesFocus),
			securityViolations: sortVulnerabilities(uniqueViolations, violationsFocus),
		};
	});
}

export default getVulnerabilitiesPerRepo;
