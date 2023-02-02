import errorHandler from "@/errors/error-handler";
import dbConnect from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
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

		const { color } = req.query;
		const colors = await Car.distinct("color");
		res.status(200).json(colors);

	} catch (err) {
		errorHandler(err, res);
	}

};

export default handler;