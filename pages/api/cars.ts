import errorHandler from "@/errors/error-handler";
import dbConnect from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { PipelineStage } from "mongoose";
import Car from "@/models/Car";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		res.status(405).end(`Method ${req.method} Not Allowed`);
		return;
	}

	return filter(req, res);
};

const filter = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();

		// Get the query params
		let { page, make, model, color, year, "min-price": minPrice, "max-price": maxPrice } = req.query;

		// Page as a number
		let pageNum = 1;

		// Validate the page number
		if (page) {
			const val = parseInt(page as string);

			if (!isNaN(val)) {
				pageNum = val;
			}
		}

		// Build the match filter
		const matchFilter: {
			make?: string;
			model?: { $in: string[] };
			color?: { $in: string[] };
			year?: { $in: number[] };
			price?: { $gte?: number; $lte?: number };
		} = {};

		// Make
		if (make && make.length > 0) {
			// Matches any of the brands in the brand array
			matchFilter["make"] = make as string;
		}

		// Model
		if (model && model.length > 0) {
			// Split the brand string into an array
			model = (model as string).split("-");

			// Matches any of the brands in the brand array
			matchFilter["model"] = { $in: model };
		}

		// Color
		if (color && color.length > 0) {
			// Split the color string into an array
			color = (color as string).split("-");

			// Matches any of the colors in the color array
			matchFilter["color"] = { $in: color };
		}

		// Year
		if (year && year.length > 0) {			
			// Split the year string into an array
			year = (year as string).split("-");

			const yearNums: number[] = [];

			// Convert the year strings to numbers
			for (let i = 0; i < year.length; i++) {
				const val = parseInt(year[i]);

				if (!isNaN(val)) {
					yearNums.push(val);
				}
			}

			// Matches any of the years in the year array
			matchFilter["year"] = { $in: yearNums };
		}

		// Min Price
		if (minPrice && minPrice.length > 0) {
			const val = parseFloat(minPrice as string);

			if (!isNaN(val) && isPriceValid(val)) {
				matchFilter["price"] = { $gte: val };
			}
		}

		// Max Price
		if (maxPrice && maxPrice.length > 0) {
			const val = parseFloat(maxPrice as string);

			if (!isNaN(val) && isPriceValid(val)) {
				if (matchFilter["price"]) {
					matchFilter["price"] = { ...matchFilter["price"], $lte: val };
				} else {
					matchFilter["price"] = { $lte: val };
				}
			}
		}

		const aggregate: PipelineStage[] = [];

		aggregate.push({ $match: matchFilter });
		aggregate.push({
			$facet: {
				cars: [{ $skip: (pageNum - 1) * 10 }, { $limit: 10 }],
				metadata: [{ $count: "count" }, { $addFields: { page: pageNum } }],
			},
		});
		aggregate.push({ $limit: 10 });

		const cars = await Car.aggregate(aggregate);
		res.status(200).json(cars);
	} catch (err) {
		errorHandler(err, res);
	}
};

/**
 * Checks if the price is valid.
 */
const isPriceValid = (minPrice: number) => {
	const minPricePoints = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
	return minPricePoints.includes(minPrice);
};

export default handler;
