import constructUrl from "@iamnapo/construct-url";
import * as dotenv from "dotenv";
import got from "got";

dotenv.config();

const { SERVER_URL } = process.env;

const api = (token) => {
	const gotInstance = got.extend({
		prefixUrl: constructUrl(SERVER_URL, "api/"),
		headers: {
			"x-access-token": token,
		},
	});

	return gotInstance;
};

export default api;
