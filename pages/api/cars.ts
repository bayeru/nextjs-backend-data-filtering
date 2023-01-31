// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
		let { page, brand } = req.query;

		// Page as a number
		let pageNum = 1;

		// Validate the page number
		if (page) {
			const val = parseInt(page as string);

			if (!isNaN(val)) {
				pageNum = val;
			}
		}

		console.log("brand", brand);

		
		// Build the match filter
		const matchFilter: {
			brand?: { $in: string[] };
		} = {};

		if (brand && brand.length > 0) {

			// Split the brand string into an array
			brand = (brand as string).split("-");

			// Matches any of the brands in the brand array
			matchFilter["brand"] = { $in: brand };
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

export default handler;
