function groupArrayByProperty(arr, keys = ["default"]) {
	const map = new Map();

	for (const obj of arr) {
		const key = keys.map((k) => String(obj[k])).join("|");
		const bucket = map.get(key) ?? [];
		bucket.push(obj);
		map.set(key, bucket);
	}

	return Array.from(map.values());
}

export default groupArrayByProperty;
