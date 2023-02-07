
import dotenv from "dotenv";
dotenv.config({
	path: ".env.local",
});
import dbConnect from "../lib/dbConnect";
import data from "./cars.json";
import Car from "../models/Car";

const seed = async () => {
	
	console.log("Seeding...");

	try {
		await dbConnect();
		console.log("Database connected");

		await Car.deleteMany({});
		console.log("Cars deleted");

		await Car.insertMany(data.cars);
		console.log("Cars inserted");

	} catch (e) {
		console.log(e);
	}

	process.exit(0);

};

seed();

export default seed;