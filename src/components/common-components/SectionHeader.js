import { Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import styles from "../common-report/styles.js";

import { capitalize } from "#utils";

const subtitleVariants = {
	critical: {
		...styles.Subtitle,
		color: "#ff1a22", // error
	},
	high: {
		...styles.Subtitle,
		color: "#ff9f00", // warning
	},
	medium: {
		...styles.Subtitle,
		color: "#90cb1b", // success
	},
	low: {
		...styles.Subtitle,
		color: "#00cbc4", // secondary
	},
};

const SectionHeader = ({ id: customId,
	number,
	title,
	level,
	addToTOC,
	risk,
}) => (
	<View
		id={customId}
		wrap={false}
		style={styles.headingContainer}
		render={({ pageNumber }) => {
			addToTOC(number, title, customId, pageNumber, level);

			return (
				<Text style={styles.subTitle}>
					{`${number} ${title}`}
					{ risk && (
						<>
							{": "}
							<Text style={subtitleVariants[risk]}>{`${capitalize(risk)} risk`}</Text>
						</>
					)}
				</Text>
			);
		}}
	/>
);

SectionHeader.propTypes = {
	number: PropTypes.string,
	title: PropTypes.string,
	addToTOC: PropTypes.func,
	id: PropTypes.string,
	level: PropTypes.number,
	risk: PropTypes.string,
};

export default SectionHeader;
