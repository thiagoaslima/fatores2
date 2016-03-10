export function sortById(a, b) {
	return a.Id - b.Id;
}

export function sortByProp(prop) {
    return function sortByPropBinded(a, b) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    }
}