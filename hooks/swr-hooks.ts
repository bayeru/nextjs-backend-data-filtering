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

export const useBrands = () => {
	const { data, error, mutate } = useSWR<string[]>('/api/brands/', fetcher);

	return {
		brands: data,
		loading: !error && !data,
		error,
		mutate,
	};
};