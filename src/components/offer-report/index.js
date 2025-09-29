import ReactPDF, { Document } from "@react-pdf/renderer";
import getStream from "get-stream";
import PropTypes from "prop-types";
import React from "react";

import { FirstPageOffer, InvoicingPlan, TableOfContents, PlatformModule, CycloptServicesConf, AnnualSupport, LastPage } from "../subcomponents/index.js";

const OfferReport = (props) => (
	<Document>
		<FirstPageOffer />
		<TableOfContents />
		<InvoicingPlan />
		<PlatformModule data={props.data} />
		<CycloptServicesConf />
		<AnnualSupport />
		<LastPage />
	</Document>
);

OfferReport.propTypes = {
	data: PropTypes.object,
};

const getOfferReport = async (data, stream) => {
	const offer = await ReactPDF.renderToStream(<OfferReport data={data} />);

	if (stream) return offer;
	return getStream(offer, { encoding: "base64" });
};

export default getOfferReport;
