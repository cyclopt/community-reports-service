const breakWords = (text, maxLength) => {
	const words = text.split(" ");

	const result = words.map((word) => {
		if (word.length > maxLength) {
			const slicedWord = [];
			for (let i = 0; i < word.length; i += maxLength) {
				slicedWord.push(word.slice(i, i + maxLength));
			}

			return slicedWord.join(" ");
		}

		return word;
	});

	return result.join(" ");
};

export default breakWords;
