export const cellObject = {
	value: null,
	notes: {
		1: { corner: false, center: false },
		2: { corner: false, center: false },
		3: { corner: false, center: false },
		4: { corner: false, center: false },
		5: { corner: false, center: false },
		6: { corner: false, center: false },
		7: { corner: false, center: false },
		8: { corner: false, center: false },
		9: { corner: false, center: false },
	},
	prefilled: false,
};
const prefilledCell = (value) => {
	return {
		value: value,
		notes: {
			1: { corner: false, center: false },
			2: { corner: false, center: false },
			3: { corner: false, center: false },
			4: { corner: false, center: false },
			5: { corner: false, center: false },
			6: { corner: false, center: false },
			7: { corner: false, center: false },
			8: { corner: false, center: false },
			9: { corner: false, center: false },
		},
		prefilled: true,
	};
};

export const boardArray = [
	[
		prefilledCell(1),
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
	[
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
		cellObject,
	],
];
