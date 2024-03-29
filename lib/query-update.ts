import { DropdownFilterState } from "@/components/ui/DropdownFilter";
import Router from "next/router";

export const updateMakeQuery = (make: string | undefined) => {
	let query = Router.query;

	// Update the make query parameter
	if (make !== undefined) {
		query["make"] = make;
	} else {
		delete query["make"];
	}

	// Reset the model query parameter
	delete query["model"];

	// Change the URL without reloading the page
	Router.push(
		{
			pathname: "/",
			query: query,
		},
		undefined,
		{ shallow: true }
	);
};

export const updateModelQuery = (model: DropdownFilterState | undefined) => {
	let query = Router.query;

	// Create an array to hold the selected models
	const modelArr = [];

	// Push all selected models into an array
	for (const key in model) {
		if (model[key].value === true) {
			modelArr.push(model[key].label);
		}
	}

	// Set the model query parameter to the array of selected models by
	// joining them with a hyphen such as (Fiesta-Focus)
	if (modelArr.length > 0) {
		query["model"] = modelArr.join("-");
	} else {
		delete query["model"];
	}

	// Change the URL without reloading the page
	Router.push(
		{
			pathname: "/",
			query: query,
		},
		undefined,
		{ shallow: true }
	);
};

export const updateColorQuery = (color: DropdownFilterState | undefined) => {
	let query = Router.query;

	// Create an array to hold the selected colors
	const colorArr = [];

	// Push all selected colors into an array
	for (const key in color) {
		if (color[key].value === true) {
			colorArr.push(color[key].label);
		}
	}

	// Set the color query parameter to the array of selected colors by
	// joining them with a hyphen such as (Blue-White)
	if (colorArr.length > 0) {
		query["color"] = colorArr.join("-");
	} else {
		delete query["color"];
	}

	// Change the URL without reloading the page
	Router.push(
		{
			pathname: "/",
			query: query,
		},
		undefined,
		{ shallow: true }
	);
};

export const updateMinPriceQuery = (minPrice: number | undefined) => {

	let query = Router.query;

	// Update the minPrice query parameter
	if (minPrice !== undefined) {
		query["min-price"] = minPrice.toString();
	} else {
		delete query["min-price"];
	}

	// Change the URL without reloading the page
	Router.push(
		{
			pathname: "/",
			query: query,
		},
		undefined,
		{ shallow: true }
	);

};

export const updateMaxPriceQuery = (maxPrice: number | undefined) => {

	let query = Router.query;

	// Update the maxPrice query parameter
	if (maxPrice !== undefined) {
		query["max-price"] = maxPrice.toString();
	} else {
		delete query["max-price"];
	}

	// Change the URL without reloading the page
	Router.push(
		{
			pathname: "/",
			query: query,
		},
		undefined,
		{ shallow: true }
	);

};

export const updateYearQuery = (year: DropdownFilterState | undefined) => {
	let query = Router.query;

	// Create an array to hold the selected years
	const yearArr = [];

	// Push all selected years into an array
	for (const key in year) {
		if (year[key].value === true) {
			yearArr.push(year[key].label);
		}
	}

	// Set the year query parameter to the array of selected years by
	// joining them with a hyphen such as (1950-1957)
	if (yearArr.length > 0) {
		query["year"] = yearArr.join("-");
	} else {
		delete query["year"];
	}

	// Change the URL without reloading the page
	Router.push(
		{
			pathname: "/",
			query: query,
		},
		undefined,
		{ shallow: true }
	);
};