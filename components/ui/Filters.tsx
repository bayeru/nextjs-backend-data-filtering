import { useModels } from "@/hooks/swr-hooks";
import { shallowEqual } from "@/util/Util";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import DropdownFilter, { DropdownFilterState } from "./DropdownFilter";
import SelectMenu from "./SelectMenu";

interface Filter {
	[key: string]: string[];
}

interface FiltersProps {
	makeOptions: string[] | null;
}

export default function Filters(props: FiltersProps) {
	const router = useRouter();
	const [model, setModel] = React.useState<DropdownFilterState>({});
	const [make, setMake] = React.useState<string>();
	const { models } = useModels(make);
	const [dirty, setDirty] = React.useState(false);

	// useEffect(() => {
	// 	if (props.brandOptions) {
	// 		setBrandState(props.brandOptions);
	// 	}
	// }, [props.brandOptions]);

	// useEffect(() => {

	// 	if (router.isReady && props.brandOptions && router.query.brand) {

	// 		const brand = router.query.brand as string;

	// 		if (brand.length > 0) {
	// 			const brands = brand.split("-");
	// 			const newState = { ...props.brandOptions };

	// 			brands.map((brand) => {
	// 				newState[brand].value = true;
	// 			});

	// 			setBrandState(newState);
	// 		}
	// 	}

	// }, [router.isReady, props.brandOptions]);

	const parseModelQuery = () => {		

		if (router.query.model) {
			const result: string[] = [];
			const model = router.query.model as string;
			return model.split("-");
		}

		return [];

	};

	useEffect(() => {
		if (models && router.isReady) {
			let modelQuery: string[] = parseModelQuery();
			let modelOptions: DropdownFilterState = {};

			models.map((model) => {
				modelOptions[model] = {
					label: model,
					value: modelQuery.includes(model),
				};
			});

			setModel(modelOptions);
		}
	}, [make, models, router.isReady]);

	useEffect(() => {
		if (router.isReady && props.makeOptions && router.query.make) {
			const make = router.query.make as string;

			if (make.length > 0) {
				setMake(make);
			}
		}
	}, [router.isReady, props.makeOptions]);

	useEffect(() => {
		if (dirty) {
			setDirty(false);
			updateQuery();
		}
	}, [dirty]);

	const onModelChange = (key: string, value: boolean) => {
		console.log("onModelChange", key, value);
		setModel((prevState) => {
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

	const onMakeChange = (value: string | undefined) => {
		setMake(value);
		setDirty(true);
	};

	const updateQuery = () => {
		let query = router.query;

		if (make !== undefined) {
			query["make"] = make;
		} else {
			delete query["make"];
		}

		const modelArr = [];

		// Push all selected brands into an array
		for (const key in model) {
			if (model[key].value === true) {
				modelArr.push(model[key].label);
			}
		}

		// Set the brand query parameter to the array of selected brands
		if (modelArr.length > 0) {
			query["model"] = modelArr.join("-");
		} else {
			delete query["model"];
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

	console.log("model", model);

	return (
		<>
			<SelectMenu
				default={"Make (All)"}
				value={make}
				options={props.makeOptions}
				onValueChange={onMakeChange}
			/>
			<DropdownFilter
				title={"Model"}
				options={model}
				onValueChange={onModelChange}
				className="ml-2"
				disabled={make === undefined}
			/>
			{/* <DropdownFilter title={"Model"} className="ml-2" />
			<DropdownFilter title={"Color"} className="ml-2" />
			<DropdownFilter title={"Year"} className="ml-2" />
			<DropdownFilter title={"Price"} className="ml-2" /> */}
		</>
	);
}
