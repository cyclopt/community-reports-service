import Plotly from "plotly";
import puppeteer from "puppeteer";

const createdPlotGraph = async (xAxisData, yAxisData, title, imageName) => {
// Launch a headless browser
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Set the content of the page
	await page.setContent(`
		<!DOCTYPE html>
		<html>
		<head>
			<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
		</head>
		<body>
			<div id="chart"></div>
		</body>
		</html>
	`);

	// Define the data and layout for the bar chart
	const data = [
		{
			x: xAxisData,
			y: yAxisData,
			type: "bar",
			marker: {
				color: "#00cbc4", // Set the background color of the bars (example: red)
			},
		},
	];

	const layout = {
		xaxis: { title },
		yaxis: { title: "Count" },
	};

	// Render the chart
	await page.evaluate((pageData, pagelayout) => {
		Plotly.newPlot("chart", pageData, pagelayout);
	}, data, layout);

	// Wait for the chart to render
	await page.waitForSelector("#chart .main-svg");

	// Capture the screenshot
	const chartElement = await page.$("#chart");
	await chartElement.screenshot({ path: imageName });

	// Close the browser
	await browser.close();

	console.log(`Bar chart has been saved as ${imageName}`);
};

export default createdPlotGraph;
