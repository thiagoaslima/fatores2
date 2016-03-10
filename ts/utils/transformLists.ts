export function mapify(array) {
	return array.reduce( (map, value) => {
		map[value.Id] = value;
		return map;
	}, {});
}

export function arrify(map) {
	return Object.keys(map).sort().map( key => map[key]);
}