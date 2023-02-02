import { AppContext } from "@/context/app-context";
import { updateColorQuery, updateMakeQuery, updateModelQuery } from "@/lib/query-update";
import React, { useContext } from "react";
import { useEffect } from "react";
import DropdownFilter from "./DropdownFilter";
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
		colorsLoading,
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
		
	};

	console.log("model", model);

	return (
		<>
			<SelectMenu
				default={"Make (All)"}
				value={make}
				options={makeOptions}
				onValueChange={onMakeChange}
				loading={makesLoading}
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
				options={{}}
				onValueChange={onYearChange}
				className="ml-2"
				loading={false}
			/>
		</>
	);
}
