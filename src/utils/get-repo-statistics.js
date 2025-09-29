import dayjs from "dayjs";

import convertQualityScoreToLetter from "./convert-quality-score-to-letter.js";
import getDifference from "./get-difference.js";
import round from "./round.js";
import sortVulnerabilities from "./sort-vulnerabilities.js";
import { vulnerabilitiesFocus } from "./vulnerabilities-focus.js";

const getRepoStatistics = (repo) => {
	const statistics = {
		name: "",
		root: "",
		lastAnalysis: "",
		sha: "",
		author: "",
		linesOfCode: {},
		totalVulnerabilities: {},
		minorVulnerabilities: {},
		moderateVulnerabilities: {},
		majorVulnerabilities: {},
		criticalVulnerabilities: {},
		totalViolations: {},
		minorViolations: {},
		majorViolations: {},
		criticalViolations: {},
		vulnerabilities: [],
		last: {
			linesOfCode: 0,
			totalViolations: 0,
			minorViolations: 0,
			majorViolations: 0,
			criticalViolations: 0,
			totalVulnerabilities: 0,
			minorVulnerabilities: 0,
			moderateVulnerabilities: 0,
			majorVulnerabilities: 0,
			criticalVulnerabilities: 0,
			overallProjectRating: "",
			maintainability: "",
			readability: "",
			reuseability: "",
			security: "",
		},
		first: {
			linesOfCode: 0,
			totalViolations: 0,
			minorViolations: 0,
			majorViolations: 0,
			criticalViolations: 0,
			totalVulnerabilities: 0,
			minorVulnerabilities: 0,
			moderateVulnerabilities: 0,
			majorVulnerabilities: 0,
			criticalVulnerabilities: 0,
			overallProjectRating: "",
			maintainability: "",
			readability: "",
			reuseability: "",
			security: "",
		},
	};

	const lastCommit = repo?.lastCommit;
	const firstCommit = repo?.firstCommit;

	statistics.name = repo.name;
	statistics.root = repo.root;
	statistics.lastAnalysis = dayjs(lastCommit?.authoredAt).format("DD/MM/YYYY");
	statistics.sha = lastCommit?.hash;
	statistics.author = lastCommit?.author;

	const lastCommitAnalysis = repo?.analyses?.find((analysis) => analysis?.commit?._id === lastCommit?._id);
	const firstCommitAnalysis = repo?.analyses?.find((analysis) => analysis?.commit?._id === firstCommit?._id);

	if (lastCommitAnalysis) {
		for (const generalStat of Object.keys(lastCommitAnalysis?.violationsInfo?.generalStats)) {
			statistics.last.minorViolations += lastCommitAnalysis?.violationsInfo?.generalStats[generalStat]?.Minor || 0;
			statistics.last.majorViolations += lastCommitAnalysis?.violationsInfo?.generalStats[generalStat]?.Major || 0;
			statistics.last.criticalViolations += lastCommitAnalysis?.violationsInfo?.generalStats[generalStat]?.Critical || 0;
		}

		statistics.last.minorVulnerabilities = (lastCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "low").length;
		statistics.last.moderateVulnerabilities = (lastCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "moderate").length;
		statistics.last.majorVulnerabilities = (lastCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "high").length;
		statistics.last.criticalVulnerabilities = (lastCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "critical").length;
	}

	if (firstCommitAnalysis) {
		for (const generalStat of Object.keys(firstCommitAnalysis?.violationsInfo?.generalStats)) {
			statistics.first.minorViolations += firstCommitAnalysis?.violationsInfo?.generalStats[generalStat]?.Minor || 0;
			statistics.first.majorViolations += firstCommitAnalysis?.violationsInfo?.generalStats[generalStat]?.Major || 0;
			statistics.first.criticalViolations += firstCommitAnalysis?.violationsInfo?.generalStats[generalStat]?.Critical || 0;
		}

		statistics.first.minorVulnerabilities = (firstCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "low").length;
		statistics.first.moderateVulnerabilities = (firstCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "moderate").length;
		statistics.first.majorVulnerabilities = (firstCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "high").length;
		statistics.first.criticalVulnerabilities = (firstCommitAnalysis?.vulnerabilities ?? []).filter((vul) => vul?.severity?.toLowerCase() === "critical").length;
	}

	statistics.last.totalViolations = statistics.last.minorViolations
		+ statistics.last.majorViolations
		+ statistics.last.criticalViolations;
	statistics.first.totalViolations = statistics.first.minorViolations
		+ statistics.first.majorViolations
		+ statistics.first.criticalViolations;

	statistics.last.totalVulnerabilities = lastCommitAnalysis?.vulnerabilities.length;
	statistics.first.totalVulnerabilities = firstCommitAnalysis?.vulnerabilities.length;

	statistics.vulnerabilities = sortVulnerabilities(lastCommitAnalysis.vulnerabilities, vulnerabilitiesFocus);
	statistics.totalVulnerabilities = getDifference(statistics?.first?.totalVulnerabilities,
		statistics?.last?.totalVulnerabilities);
	statistics.minorVulnerabilities = getDifference(statistics?.first?.minorVulnerabilities,
		statistics?.last?.minorVulnerabilities);
	statistics.moderateVulnerabilities = getDifference(statistics?.first?.moderateVulnerabilities,
		statistics?.last?.moderateVulnerabilities);
	statistics.majorVulnerabilities = getDifference(statistics?.first?.majorVulnerabilities,
		statistics?.last?.majorVulnerabilities);
	statistics.criticalVulnerabilities = getDifference(statistics?.first?.criticalVulnerabilities,
		statistics?.last?.criticalVulnerabilities);
	statistics.totalViolations = getDifference(statistics?.first?.totalViolations, statistics?.last?.totalViolations);
	statistics.minorViolations = getDifference(statistics?.first?.minorViolations, statistics?.last?.minorViolations);
	statistics.majorViolations = getDifference(statistics?.first?.majorViolations, statistics?.last?.majorViolations);
	statistics.criticalViolations = getDifference(statistics?.first?.criticalViolations, statistics?.last?.criticalViolations);
	statistics.linesOfCode = getDifference(firstCommitAnalysis?.totalLocAnalyzed, lastCommitAnalysis?.totalLocAnalyzed);

	const lastViolations = (lastCommitAnalysis?.violationsInfo?.violations)
		? Object.values(lastCommitAnalysis?.violationsInfo?.violations)?.filter((v) => v.severity === "Critical").sort((a, b) => b.count - a.count)
		: [];
	const firstViolations = (lastCommitAnalysis?.violationsInfo?.violations)
		? Object.values(firstCommitAnalysis?.violationsInfo?.violations)?.filter((v) => v.severity === "Critical").sort((a, b) => b.count - a.count)
		: [];

	statistics.last = {
		...statistics?.last,
		minorViolations: round(statistics?.last?.minorViolations),
		majorViolations: round(statistics?.last?.majorViolations),
		criticalViolations: round(statistics?.last?.criticalViolations),
		totalViolations: round(statistics?.last?.totalViolations),
		linesOfCode: round(lastCommitAnalysis?.totalLocAnalyzed),
		overallProjectRating: convertQualityScoreToLetter(lastCommitAnalysis?.overallQualityScore),
		maintainability: convertQualityScoreToLetter(lastCommitAnalysis?.characteristics?.maintainabilityScore),
		readability: convertQualityScoreToLetter(lastCommitAnalysis?.characteristics?.readabilityScore),
		reuseability: convertQualityScoreToLetter(lastCommitAnalysis?.characteristics?.reusabilityScore),
		security: convertQualityScoreToLetter(lastCommitAnalysis?.characteristics?.securityScore),
		violations: lastViolations,
	};

	statistics.first = {
		...statistics?.first,
		minorViolations: round(statistics?.first?.minorViolations),
		majorViolations: round(statistics?.first?.majorViolations),
		criticalViolations: round(statistics?.first?.criticalViolations),
		totalViolations: round(statistics?.first?.totalViolations),
		linesOfCode: round(firstCommitAnalysis?.totalLocAnalyzed),
		overallProjectRating: convertQualityScoreToLetter(firstCommit?.analysis?.overallQualityScore),
		maintainability: convertQualityScoreToLetter(firstCommit?.analysis?.characteristics?.maintainabilityScore),
		readability: convertQualityScoreToLetter(firstCommit?.analysis?.characteristics?.readabilityScore),
		reuseability: convertQualityScoreToLetter(firstCommit?.analysis?.characteristics?.reusabilityScore),
		security: convertQualityScoreToLetter(firstCommit?.analysis?.characteristics?.securityScore),
		violations: firstViolations,
	};

	return statistics;
};

export default getRepoStatistics;
