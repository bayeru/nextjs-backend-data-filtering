import { DropdownFilterState } from "@/components/ui/DropdownFilter";
import { useColors, useMakes, useModels } from "@/hooks/swr-hooks";
import { NextRouter, useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

interface AppContextProps {
	makeOptions?: string[];
	make?: string;
	setMake: (make: string | undefined) => void;
	makesLoading?: boolean;
	model?: DropdownFilterState;
	setModel: (value: React.SetStateAction<DropdownFilterState>) => void;
	modelsLoading?: boolean;
	color?: DropdownFilterState;
	setColor: (value: React.SetStateAction<DropdownFilterState>) => void;
	year?: DropdownFilterState;
	setYear: (value: React.SetStateAction<DropdownFilterState>) => void;
	yearLoading?: boolean;
	colorsLoading?: boolean;
	minPrice?: number;
	setMinPrice: (price: number | undefined) => void;
	maxPrice?: number;
	setMaxPrice: (price: number | undefined) => void;
}

interface AppContextProviderProps {
	children: React.ReactNode;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default function AppContextProvider(props: AppContextProviderProps) {
	const [make, setMake] = useState<string>();
	const { makes: makeOptions, loading: makesLoading } = useMakes();
	const [model, setModel] = useState<DropdownFilterState>({});
	const { models, loading: modelsLoading } = useModels(make);
	const [color, setColor] = useState<DropdownFilterState>({});
	const { colors, loading: colorsLoading } = useColors();
	const [year, setYear] = useState<DropdownFilterState>({});
	const [yearLoading, setYearLoading] = useState<boolean>(true);
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
	const router = useRouter();

	// Update make when make query changes
	useEffect(() => {
		if (router.isReady && router.query.make) {
			const make = router.query.make as string;

			if (make.length > 0) {
				setMake(make);
			}
		}
	}, [router.query.make]);

	// Update model options when models ready
	useEffect(() => {
		if (models) {
			let modelQuery: string[] = parseModelQuery(router);
			let modelOptions: DropdownFilterState = {};

			// For each model, create a new option
			models.map((model) => {
				modelOptions[model] = {
					label: model,
					value: modelQuery.includes(model),
				};
			});

			setModel(modelOptions);
		}
	}, [models /*router.isReady, make*/]);

	// Update color options when colors ready
	useEffect(() => {
		if (colors) {
			let colorQuery: string[] = parseColorQuery(router);
			let colorOptions: DropdownFilterState = {};

			// For each color, create a new option
			colors.map((color) => {
				colorOptions[color] = {
					label: color,
					value: colorQuery.includes(color),
				};
			});

			setColor(colorOptions);
		}
	}, [colors /*router.isReady, make*/]);

	// Update year options
	useEffect(() => {
		if (router.isReady) {
			let yearQuery: string[] = parseYearQuery(router);
			let yearOptions: DropdownFilterState = {};

			for (let i = 1963; i <= 2013; i++) {
				yearOptions[i] = {
					label: i.toString(),
					value: yearQuery.includes(i.toString()),
				};
			}

			setYear(yearOptions);
			setYearLoading(false);
		}
	}, [router.isReady]);

	// Update min price when minPrice query changes
	useEffect(() => {
		if (router.isReady && router.query["min-price"]) {
			const minPrice = router.query["min-price"] as string;

			if (minPrice.length > 0) {
				setMinPrice(parseInt(minPrice));
			}
		}
	}, [router.query["min-price"]]);

	// Update max price when maxPrice query changes
	useEffect(() => {
		if (router.isReady && router.query["max-price"]) {
			const maxPrice = router.query["max-price"] as string;

			if (maxPrice.length > 0) {
				setMaxPrice(parseInt(maxPrice));
			}
		}
	}, [router.query["max-price"]]);

	return (
		<AppContext.Provider
			value={{
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
				year,
				setYear,
				yearLoading,
				minPrice,
				setMinPrice,
				maxPrice,
				setMaxPrice,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

const parseModelQuery = (router: NextRouter) => {
	if (router.query.model) {
		const result: string[] = [];
		const model = router.query.model as string;
		return model.split("-");
	}

	return [];
};

const parseColorQuery = (router: NextRouter) => {
	if (router.query.color) {
		const result: string[] = [];
		const color = router.query.color as string;
		return color.split("-");
	}

	return [];
};

const parseYearQuery = (router: NextRouter) => {
	if (router.query.year) {
		const result: string[] = [];
		const year = router.query.year as string;
		return year.split("-");
	}

	return [];
};