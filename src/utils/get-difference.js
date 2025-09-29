import round from "./round.js";

const getDifference = (start, end) => {
	const startInt = Number.parseInt(start, 10) || 0;
	const endInt = Number.parseInt(end, 10) || 0;

	if (!startInt) return { difference: `+${round(endInt)}`, adornment: "red" };
	const percentage = round(((endInt - startInt) / startInt) * 100);

	if (!percentage) return { difference: round(percentage), adornment: "green" };

	return (percentage > 0) ? {
		difference: `+${round(percentage)}%`,
		adornment: "red",
	} : {
		difference: `${round(percentage)}%`,
		adornment: "green",
	};
};

export default getDifference;
