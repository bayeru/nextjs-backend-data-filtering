export const shallowEqual = (objA: any, objB: any) => {
	const aKeys = Object.keys(objA);
	const bKeys = Object.keys(objB);

	if (aKeys.length !== bKeys.length) {
		return false;
	}

	for (const key of aKeys) {
		if (objA[key] !== objB[key]) {
			return false;
		}
	}

	return true;
};
