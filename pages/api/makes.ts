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


		//console.log("Page", pageNum);

		// if (make) {

		// 	filter["make"] = make;

		// }

		// if (model) {

		// 	filter["model"] = model;

		// }

		// if (year) {

		// 	filter["year"] = year;

		// }

		// const aggregate: PipelineStage[] = [];

		// aggregate.push({ $match: filter });
		// aggregate.push({ $facet: {
		// 	"cars": [
		// 		{ $skip: (pageNum - 1) * 10 },
		// 		{ $limit: 10 },
		// 	],
		// 	"metadata": [
		// 		{ $count: "count" },
		// 		{ $addFields: { "page": pageNum } }
		// 	]
		// } });
		// aggregate.push({ $limit: 10});

		const makes = await Car.distinct("make");
		res.status(200).json(makes);

	} catch (err) {
		errorHandler(err, res);
	}

};

export default handler;