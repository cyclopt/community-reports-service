import constructUrl from "@iamnapo/construct-url";
import * as dotenv from "dotenv";
import got from "got";

dotenv.config();

const { SERVER_URL } = process.env;

const downloadReportGraph = async (token, data, service) => {
	const { body } = await got.post(constructUrl(SERVER_URL, `/api/admin/${service}/download-${service}-graph`), {
		json: {
			data,
		},
		headers: {
			"x-access-token": token,
		},
		responseType: "json",
	});

	return body;
};

export default downloadReportGraph;
