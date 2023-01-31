"use client";

import { shallowEqual } from "@/util/Util";
import { useRouter } from "next/router";
import React, { useTransition } from "react";
import { useEffect, useState } from "react";
import DropdownFilter, { DropdownFilterState } from "./DropdownFilter";

interface Filter {
	[key: string]: string[];
}

interface FiltersProps {
	brandOptions: DropdownFilterState | null;
}

export default function Filters(props: FiltersProps) {

	const router = useRouter();
	const [brandState, setBrandState] = React.useState<DropdownFilterState>({});
	const [dirty, setDirty] = useState(false);

	useEffect(() => {
		if (props.brandOptions) {
			setBrandState(props.brandOptions);
		}
	}, [props.brandOptions]);

	useEffect(() => {

		if (router.isReady && props.brandOptions && router.query.brand) {

			const brand = router.query.brand as string;

			if (brand.length > 0) {
				const brands = brand.split("-");
				const newState = { ...props.brandOptions };

				brands.map((brand) => {
					newState[brand].value = true;
				});

				setBrandState(newState);
			}
		}

	}, [router.isReady, props.brandOptions]);

	useEffect(() => {

		if (dirty) {
			setDirty(false);
			updateQuery();
		}

	}, [dirty]);

	const onBrandChange = (key: string, value: boolean) => {

		setBrandState((prevState) => {
			const newState = {
				...prevState,
				[key]: {
					...prevState[key],
					value: value,
				},
			};			

			return newState;
		});

		setDirty(true);

	};

	const updateQuery = () => {
		let query = router.query;
		
		const brand = [];

		// Push all selected brands into an array
		for (const key in brandState) {
			if (brandState[key].value === true) {
				brand.push(brandState[key].label);
			}
		}

		// Set the brand query parameter to the array of selected brands
		if (brand.length > 0) {
			query["brand"] = brand.join("-");
		} else {
			delete query["brand"];
		}

		console.log("Updating query", query);

		router.push(
			{
				pathname: "/",
				query: query,
			},
			undefined,
			{ shallow: true }
		);

	};

	console.log("Rendering filters", brandState);

	return (
		<>
			<DropdownFilter title={"Brand"} options={brandState} onValueChange={onBrandChange} />
			{/* <DropdownFilter title={"Model"} className="ml-2" />
			<DropdownFilter title={"Color"} className="ml-2" />
			<DropdownFilter title={"Year"} className="ml-2" />
			<DropdownFilter title={"Price"} className="ml-2" /> */}
		</>
	);
}
