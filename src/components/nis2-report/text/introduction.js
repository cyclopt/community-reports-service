const introductionText = {
	introduction: {
		purpose: ". The purpose of this assessment is to provide an in-depth evaluation of the organization’s compliance with the requirements of the NIS2 Directive, focusing primarily on cybersecurity posture, risk management practices, and organizational readiness.",
		importance: "The objective is to identify compliance gaps, assess the effectiveness of existing technical and organizational measures, and evaluate the codebase’s resilience against cyber threats in accordance with the obligations set forth in the NIS2 Directive.",
		goal: "This report may also serve as a practical roadmap for achieving alignment with NIS2, offering prioritized recommendations, identifying high-risk areas, and highlighting required improvements. It can be used as a reference for both internal security planning and external audits, as well as future strategic development.",
	},
	scope: {
		practicesOnly: {
			introduction: "The scope of this report is focused on a comprehensive evaluation of the organizational and technical practices in the context of the NIS2 Directive. Emphasizing on cybersecurity and risk management, the assessment examines the effectiveness of internal policies, procedures, and operational measures that support cybersecurity governance.",
			conclusion: "By concentrating on these critical practices, the report offers insights into the project’s alignment with regulatory requirements and supports informed decision-making for enhancing its overall security posture.",
		},
		softwareAndPractices: {
			introduction: "The scope of this report extends to a thorough evaluation of the project, encompassing all technical components within the context of the NIS2 Directive. Given the directive’s emphasis on cybersecurity and risk management, this assessment focuses primarily on two critical dimensions:",
			firstAxis: {
				title: "Security: ",
				description: "Evaluating vulnerabilities in source code, dependencies, and security policies, ensuring the system is protected from potential exploits and unauthorized access.",
			},
			secondAxis: {
				title: "Organizational and Technical Practices: ",
				description: "Assessing the effectiveness of internal policies and operational practices related to cybersecurity governance.",
			},
			conclusion: "By addressing these key aspects, this report provides a holistic view of the portal’s technical strength, helping stakeholders make well-informed decisions regarding its future.",
		},
	},
	process: {
		practicesOnly: {
			firstParagraph: "The NIS2 compliance assessment comprises of a structured and systematic approach centered on the completion of a detailed NIS2 practices questionnaire. This questionnaire is specifically designed to capture critical organizational and technical measures required by the directive.",
			secondParagraph: "Key stakeholders were engaged in this process to provide accurate and comprehensive input, ensuring that the assessment reflects the current state of cybersecurity governance and operational practices within the organization.",
		},
		softwareAndPractices: {
			firstParagraph: "The NIS2 compliance assessment follows a structured and methodical approach to ensure completeness, accuracy, and confidentiality. As an initial step, the relevant stakeholders completed a detailed NIS2 practices questionnaire, designed to capture key organizational and technical measures mandated by the directive. In parallel, we secured access to essential technical data, including the core code repository, to analyze the source code’s structure, quality, and security.",
			secondParagraph: "A combination of automated analysis tools and manual reviews was employed to ensure a comprehensive evaluation. The findings from this process are presented in this document, allowing for continuous monitoring of progress and improvements.",
		},

	},
	structure: {
		practicesOnly: {
			firstAxis: {
				title: "Evaluation Axes: ",
				description: "A detailed breakdown of the primary focus area: the effectiveness of technical and organizational cybersecurity practices in alignment with the NIS2 Directive.",
			},
			secondAxis: {
				title: "Review Phase: ",
				description: "The evaluation cycle, identifying bad practices.",
			},
			thirdAxis: {
				title: "Conclusions: ",
				description: "A summary of findings, outlining the overall maturity level of the organization’s cybersecurity posture, highlighting both strengths and areas for improvement, and providing actionable recommendations to achieve full alignment with NIS2 requirements.",
			},
		},
		softwareAndPractices: {
			firstAxis: {
				title: "Evaluation Axes: ",
				description: "A detailed breakdown of the two primary focus areas, namely security compliance with the NIS2 Directive and the effectiveness of technical and organizational cybersecurity practices.",
			},
			secondAxis: {
				title: "Review Phase: ",
				description: "The evaluation cycle, identifying key security vulnerabilities and bad practices.",
			},
			thirdAxis: {
				title: "Conclusions: ",
				description: "A summary of findings, outlining the overall maturity level of the organization’s cybersecurity posture, highlighting both strengths and areas for improvement, and providing actionable recommendations to achieve full alignment with NIS2 requirements.",
			},
		},
	},
};

export default introductionText;

