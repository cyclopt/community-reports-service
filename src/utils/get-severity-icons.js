// This function is used to return severity icons for:
//  i)   sast violations
//  ii)  security vulnerabilities
//  iii) violations
// for TDD and NIS2 reports
const getSeverityIcon = (sev) => {
	switch (sev) {
		case "Minor":
		case "Low": {
			return "https://storage.googleapis.com/cyclopt-user-content/pr_5d94839b3429f7001ef2f243id__YX2YWrLsZmiXcrdIH0QA.png";
		}

		case "Major":
		case "Moderate":
		case "Medium": {
			return "https://storage.googleapis.com/cyclopt-user-content/pr_5d94839b3429f7001ef2f243id_7a1xRfCijgmOGeyiVnMHz.png";
		}

		case "Critical":
		case "Critical/High": {
			return "https://storage.googleapis.com/cyclopt-user-content/pr_5d94839b3429f7001ef2f243id_9lEW7eeEt8H618DgnrkSY.png";
		}

		default: {
			return "";
		}
	}
};

export default getSeverityIcon;
