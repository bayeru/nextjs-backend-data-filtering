import { ICar } from "@/common/types";
import HttpError from "@/errors/HttpError";
import useSWR, { Key, Fetcher } from "swr";

/**
 * Fetcher function for useSWR
 */
const fetcher = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		const errorMessage = await res.json();
		throw new HttpError(errorMessage.message, res.status);
	}

	return res.json();
};

/**
 * Fetches the cars from the API.
 * 
 * @param filter The filter to apply to data.
 */
export const useCars = (filter: string = '') => {
	const { data, error, mutate } = useSWR(filter === '' ? '/api/cars' : `/api/cars${filter}`, fetcher);

	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	};
};

/**
 * Fetches all of the makes from the API. 
 */
export const useMakes = () => {
	const { data, error, mutate } = useSWR<string[]>('/api/makes', fetcher);

	return {
		makes: data,
		loading: !error && !data,
		error,
		mutate,
	};
};

/**
 * Fetches all of the models from the API.
 * 
 * @param make Make to filter by.
 * @returns 
 */
export const useModels = (make: string | undefined) => {
	const { data, error, mutate } = useSWR<string[]>(!make ? '/api/models' : `/api/models?make=${make}`, fetcher);

	return {
		models: data,
		loading: !error && !data,
		error,
		mutate,
	};
};

/**
 * Fetches all of the colors from the API.
 */
export const useColors = () => {
	const { data, error, mutate } = useSWR<string[]>('/api/colors', fetcher);

	return {
		colors: data,
		loading: !error && !data,
		error,
		mutate,
	};
};