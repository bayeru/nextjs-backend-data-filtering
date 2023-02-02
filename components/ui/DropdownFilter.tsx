import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Menu, Popover } from "@headlessui/react";
import Preloader from "./Preloader";

export interface DropdownFilterState {
	[key: string]: {
		label: string;
		value: boolean;
	};
}

interface DropdownFilterParams {
	title: string;
	className?: string;
	disabled?: boolean;
	options?: {
		[key: string]: {
			label: string;
			value: boolean;
		};
	};
	onValueChange: (key: string, value: boolean) => void;
	loading?: boolean;
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
	let numSelected = 0;

	for (const key in props.options) {
		if (props.options.hasOwnProperty(key)) {
			if (props.options[key].value) {
				numSelected++;
			}

			options.push(
				<label
					key={key}
					htmlFor={key}
					className="flex items-center hover:bg-slate-100 px-4 cursor-pointer"
				>
					<input
						id={key}
						type="checkbox"
						checked={props.options[key].value || false}
						className="rounded h-4 w-4 shadow-sm border-slate-300 cursor-pointer"
						onChange={(event) => {
							console.log("==>", event.target.checked);
							props.onValueChange(key, event.target.checked);
						}}
					/>
					<span className="whitespace-nowrap py-2 px-3 text-sm pr-8">
						{props.options[key].label}
					</span>
				</label>
			);
		}
	}

	return (
		<div className={props.className + ` text-left text-sm`}>
			<Popover className="relative">
				<Popover.Button
					disabled={props.disabled}
					className={`inline-flex rounded bg-white px-3 ${props.loading ? "py-2.5" : "py-2"} font-medium text-slate-600  border border-slate-200 shadow-sm justify-center items-center  whitespace-nowrap ${
						props.disabled ? "opacity-60" : "hover:bg-slate-50"
					}`}
				>
					{props.loading ? (
						<div className="flex">
							<Preloader
								className="flex w-5 h-5 items-center mr-2"
								fillColor="fill-slate-400"
								backgroundColor="fill-slate-200"
							/>
							<span>Loading...</span>
						</div>
					) : (
						<>
							<span>{props.title}</span>
							<span className="rounded-full bg-slate-100 text-slate-600 py-0.5 px-3 ml-2 text-sm inline-flex justify-center items-center">
								{numSelected === 0 ? "All" : numSelected}
							</span>
						</>
					)}
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
}
