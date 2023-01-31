"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Menu, Popover } from "@headlessui/react";

export interface DropdownFilterState {

	[key: string]: {
		label: string;
		value: boolean;
	}
	
}

interface DropdownFilterParams {
	title: string;
	className?: string;
	// property: string;
	// initialValue: string;
	initialize?: boolean;
	align?: "start" | "end";
	options: {
		[key: string]: {
			label: string;
			value: boolean;
		};
	};
	onValueChange: (key:string, value:boolean) => void;
}

export default function DropdownFilter(props: DropdownFilterParams) {


	//const [state, setState] = React.useState<DropdownFilterState>({});
	// const router = useRouter();
	// const isValid = props.options[props.initialValue] !== undefined;
	// const [value, setValue] = React.useState(isValid ? props.initialValue : props.property);

	// const handleValueChange = (value: string) => {
	// 	setValue(value);
	// 	props.onValueChange(value);
	// };

	const options = [];

	for (const key in props.options) {
		if (props.options.hasOwnProperty(key)) {
			options.push(
				<label key={key} htmlFor={key} className="flex items-center hover:bg-slate-100 px-4 cursor-pointer">
					<input
						id={key}
						type="checkbox"
						checked={props.options[key].value || false}
						className="rounded h-4 w-4 shadow-sm border-slate-300 cursor-pointer"
						onChange={(event) => {
							
							
							console.log("==>", event.target.checked);
							props.onValueChange(key, event.target.checked);
							//setState({ ...state, [key]: event.target.checked });
							/**
							setState((prevState) => {
								const newState = { ...prevState, [key]: event.target.checked};
								props.onValueChange(newState);
								return newState;
							});

							*/
						}}
					/>
					<span className="whitespace-nowrap py-2 px-3 text-sm pr-8">{props.options[key].label}</span>
				</label>
			);
		}
	}

	return (
		<div className={props.className + ` text-left text-sm`}>
			<Popover className="relative">
				<Popover.Button className="inline-flex rounded bg-white px-3 py-2 font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm justify-center items-center">
					{props.title}
					<span className="rounded-full bg-slate-100 text-slate-600 py-0.5 px-3 ml-2 text-sm inline-flex justify-center items-center">
						3
					</span>
					<span className="inline-flex justify-center items-center ml-2">
						<svg
							className="h-5 w-5 text-slate-400"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
						</svg>
					</span>
				</Popover.Button>
				<Popover.Panel className="absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg flex flex-col py-4 border max-h-96 overflow-auto">
					{options}
				</Popover.Panel>
			</Popover>
		</div>
	);
};
