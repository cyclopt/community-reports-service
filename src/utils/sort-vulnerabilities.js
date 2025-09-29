const sortVulnerabilities = (array, sortArray) => [...array].sort(
	(a, b) => sortArray.indexOf(b.severity) - sortArray.indexOf(a.severity),
);

export default sortVulnerabilities;
