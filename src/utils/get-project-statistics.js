import average from "./average.js";
import round from "./round.js";

const getProjectStatistics = (data) => {
	const statistics = {
		totalAnalyses: 0,
		meanViolations: 0,
		totalLOC: 0,
		recommendations: [],
		violations: [],
		perProjectStats: [],
	};

	for (const r of data) {
		let minorViolations = 0;
		let majorViolations = 0;
		let criticalViolations = 0;
		statistics.totalAnalyses += r?.analyses?.length || 0;
		const violations = new Map();

		if (r?.analyses?.length > 0) {
			for (const analysis of r.analyses) {
				statistics.totalLOC += analysis?.totalLocAnalyzed || 0;
				if (analysis?.violationsInfo?.generalStats) {
					for (const generalStat of Object.keys(analysis?.violationsInfo?.generalStats)) {
						const analysisMinorViolations = analysis?.violationsInfo?.generalStats[generalStat]?.Minor || 0;
						const analysisMajorViolations = analysis?.violationsInfo?.generalStats[generalStat]?.Major || 0;
						const analysisCriticalViolations = analysis?.violationsInfo?.generalStats[generalStat]?.Critical || 0;

						minorViolations += analysisMinorViolations;
						majorViolations += analysisMajorViolations;
						criticalViolations += analysisCriticalViolations;
						statistics.violations.push(analysisMinorViolations + analysisMajorViolations + analysisCriticalViolations);
					}
				}
			}
		}

		statistics.perProjectStats.push({
			name: r?.name,
			owner: r?.owner,
			root: r?.root,
			language: r?.language,
			csProjects: r?.csProjects,
			minorViolations: round(minorViolations),
			majorViolations: round(majorViolations),
			criticalViolations: round(criticalViolations),
			totalViolations: round(minorViolations + majorViolations + criticalViolations),
			totalAnalyses: r?.analyses?.length || 0,
			violations,
		});
	}

	statistics.meanViolations = average(statistics?.violations);
	statistics.totalAnalyses = round(statistics.totalAnalyses);
	statistics.totalLOC = round(statistics.totalLOC);

	return statistics;
};

export default getProjectStatistics;
