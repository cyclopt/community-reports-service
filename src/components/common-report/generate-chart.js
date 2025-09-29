import fs from "node:fs";

import { createCanvas } from "canvas"; // Using the canvas package
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from "chart.js";

// Register the necessary components for the bar chart
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Custom label plugin for double columns
const columnLabels = {
	id: "doubleColumnLabels",
	afterDatasetsDraw(chart) {
		const { ctx, data } = chart;
		ctx.save();

		const meta = chart.getDatasetMeta(0);
		const padding = 10;

		for (let i = 0; i < meta.data.length; i++) {
			const bar = meta.data[i];
			const label = data.labels[i];
			const value = data.datasets[0].data[i];

			// Font for label
			ctx.font = "18px commissioner";
			const labelWidth = ctx.measureText(label).width;

			// Draw label (category name)
			ctx.fillStyle = "#000";
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			ctx.fillText(label, bar.base + padding, bar.y);

			// Font for value
			ctx.font = "bold 18px commissioner";
			const valueText = value.toString();
			const valueWidth = ctx.measureText(valueText).width;

			const barLength = bar.x - bar.base;

			// Total left area used by label + padding
			const occupiedLeftSpace = labelWidth + padding * 2;

			const valueX = barLength > valueWidth + padding * 2 && barLength > occupiedLeftSpace ? bar.x + padding : bar.base + labelWidth + padding * 4;

			ctx.fillStyle = "#000";
			ctx.fillText(valueText, valueX, bar.y);
		}
	},
};

// Graph title mapping
const graphTitleMapping = {
	sast: { title: "# of SAST Violations", maximumValue: null },
	violations: { title: "# of Violations", maximumValue: null },
	"security violations": { title: "# of Security Violations", maximumValue: null },
	vulnerabilities: { title: "# of Security Vulnerabilities", maximumValue: null },
	"cybersecurity practices": { title: "Cybersecurity Practices Score (%)", maximumValue: 100 },
};

const graphTitleViolationsMapping = {
	sast: { title: "SAST Violations" },
	violations: { title: "Violations" },
	"security violations": { title: "Security Violations" },
	vulnerabilities: { title: "Security Vulnerabilities" },
};

// Modified chart function
export const generateChart = (xData, yData, graphPath, graphTitle) => {
	try {
		// Prevent excessive chart height to avoid rendering issues (e.g., infinite rendering in PDF if height > 1540)
		const MAX_CANVAS_HEIGHT = 1540;
		const MIN_CANVAS_HEIGHT = 300;
		const HEIGHT = 40;
		const HEIGHT_MULTIPLIER = 1.5;
		// Calculate the estimated canvas height based on data length
		const estimatedHeight = yData.length * HEIGHT * HEIGHT_MULTIPLIER;

		// Apply upper and lower bounds to ensure canvas height stays within limits
		const clampedHeight = Math.min(estimatedHeight, MAX_CANVAS_HEIGHT);
		const canvasHeight = Math.max(clampedHeight, MIN_CANVAS_HEIGHT);
		const canvasWidth = 1000;

		// Create canvas
		const canvas = createCanvas(canvasWidth, canvasHeight);
		const ctx = canvas.getContext("2d");

		const chart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: xData,
				datasets: [{
					label: graphTitleViolationsMapping[graphTitle]?.title,
					data: yData,
					backgroundColor: "#00cbc4",
					barThickness: HEIGHT - 4,
					borderRadius: 5,
				}],
			},
			options: {
				indexAxis: "y",
				responsive: false,
				maintainAspectRatio: false,
				scales: {
					x: {
						beginAtZero: true,
						max: Math.max(...yData) * 1.2,
						ticks: {
							display: false,
						},
					},
					y: {
						ticks: {
							display: false,
						},
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: true,
						text: graphTitleMapping[graphTitle]?.title || "# of Violations",
						font: {
							size: 18,
						},
					},
					tooltip: {
						enabled: false,
					},
				},
			},
			plugins: [columnLabels],
		});

		const buffer = canvas.toBuffer("image/png");
		fs.writeFileSync(graphPath, buffer);
		console.log("2-column chart saved!");

		return chart;
	} catch (error) {
		console.error("Chart generation failed:", error);
		return null;
	}
};
