import { ICar } from "@/common/types";
import HttpError from "@/errors/HttpError";
import useSWR, { Key, Fetcher } from "swr";

const fetcher = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		const errorMessage = await res.json();
		throw new HttpError(errorMessage.message, res.status);
	}

	return res.json();
};

export const useCars = (filter: string = '') => {
	const { data, error, mutate } = useSWR(filter === '' ? '/api/cars' : `/api/cars${filter}`, fetcher);

	return {
		data,
		loading: !error && !data,
		error,
		mutate,
	};
};

export const useMakes = () => {
	const { data, error, mutate } = useSWR<string[]>('/api/makes', fetcher);

	return {
		makes: data,
		loading: !error && !data,
		error,
		mutate,
	};
};

export const useModels = (make: string | undefined) => {
	const { data, error, mutate } = useSWR<string[]>(!make ? '/api/models' : `/api/models?make=${make}`, fetcher);

	return {
		models: data,
		loading: !error && !data,
		error,
		mutate,
	};
};

export const useColors = () => {
	const { data, error, mutate } = useSWR<string[]>('/api/colors', fetcher);

	return {
		colors: data,
		loading: !error && !data,
		error,
		mutate,
	};
};