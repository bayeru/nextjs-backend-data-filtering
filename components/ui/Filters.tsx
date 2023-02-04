import { AppContext } from "@/context/app-context";
import {
	updateColorQuery,
	updateMakeQuery,
	updateMaxPriceQuery,
	updateMinPriceQuery,
	updateModelQuery,
	updateYearQuery,
} from "@/lib/query-update";
import React, { useContext } from "react";
import { useEffect } from "react";
import DropdownFilter, { DropdownFilterState } from "./DropdownFilter";
import SelectMenu from "./SelectMenu";

export default function Filters() {
	const {
		makeOptions,
		make,
		setMake,
		makesLoading,
		model,
		setModel,
		modelsLoading,
		color,
		setColor,
		year,
		setYear,
		colorsLoading,
		yearLoading,
		minPrice,
		setMinPrice,
		maxPrice,
		setMaxPrice,
	} = useContext(AppContext);
	const [dirty, setDirty] = React.useState<string | boolean>(false);

	useEffect(() => {
		if (dirty) {
			if (dirty === "make") {
				setDirty(false);
				updateMakeQuery(make);
			} else if (dirty === "model") {
				setDirty(false);
				updateModelQuery(model);
			} else if (dirty === "color") {
				setDirty(false);
				updateColorQuery(color);
			} else if (dirty === "year") {
				setDirty(false);
				updateYearQuery(year);
			} else if (dirty === "minPrice") {
				setDirty(false);
				updateMinPriceQuery(minPrice);
			} else if (dirty === "maxPrice") {
				setDirty(false);
				updateMaxPriceQuery(maxPrice);
			}
		}
	}, [dirty]);

	const onModelChange = (key: string, value: boolean) => {
		setModel((prevState) => {
			return {
				...prevState,
				[key]: {
					...prevState[key],
					value: value,
				},
			};
		});

		setDirty("model");
	};

	const onMakeChange = (value: string | undefined) => {
		setMake(value);
		setDirty("make");
	};

	const onColorChange = (key: string, value: boolean) => {
		setColor((prevState) => {
			return {
				...prevState,
				[key]: {
					...prevState[key],
					value: value,
				},
			};
		});
		setDirty("color");
	};

	const onYearChange = (key: string, value: boolean) => {

		setYear((prevState) => {
			return {
				...prevState,
				[key]: {
					...prevState[key],
					value: value,
				},
			};
		});
		setDirty("year");

	};

	const onMinPriceChange = (value: string | undefined) => {
		if (value) {
			const price = value.replace("$", "");
			setMinPrice(parseInt(price));
			setDirty("minPrice");
		} else {
			setMinPrice(undefined);
			setDirty("minPrice");
		}
	};

	const onMaxPriceChange = (value: string | undefined) => {
		if (value) {
			const price = value.replace("$", "");
			setMaxPrice(parseInt(price));
			setDirty("maxPrice");
		} else {
			setMaxPrice(undefined);
			setDirty("maxPrice");
		}
	};

	const buildPriceArray = (start: number = 1000, end: number = 5000) => {
		const priceArray: string[] = [];

		for (let i = start; i <= end; i += 500) {
			priceArray.push("$" + i.toString());
		}

		return priceArray;
	};


	console.log("model", model);

	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex">
				<SelectMenu
					default={"Make (All)"}
					value={make}
					options={makeOptions}
					onValueChange={onMakeChange}
					loading={makesLoading}
					className="w-44"
				/>
				<DropdownFilter
					title={"Model"}
					options={model}
					onValueChange={onModelChange}
					disabled={make === undefined}
					className="ml-2"
					loading={modelsLoading}
				/>
				<DropdownFilter
					title={"Color"}
					options={color}
					onValueChange={onColorChange}
					className="ml-2"
					loading={colorsLoading}
				/>
				<DropdownFilter
					title={"Year"}
					options={year}
					onValueChange={onYearChange}
					className="ml-2"
					loading={yearLoading}
				/>
			</div>
			<div className="flex">
				<SelectMenu
					default={"Min Price"}
					value={minPrice ? "$" + minPrice : undefined}
					options={buildPriceArray(1000, maxPrice)}
					onValueChange={onMinPriceChange}
					className="w-32"
					loading={false}
				/>
				<SelectMenu
					default={"Max Price"}
					value={maxPrice ? "$" + maxPrice : undefined}
					options={buildPriceArray(minPrice)}
					onValueChange={onMaxPriceChange}
					className="w-32 ml-2"
					loading={false}
				/>
			</div>
		</div>
	);
}
