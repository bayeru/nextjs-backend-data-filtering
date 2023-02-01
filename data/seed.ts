
import dotenv from "dotenv";
dotenv.config({
	path: ".env.local",
});
import dbConnect from "../lib/dbConnect";
import data from "./cars.json";
import fs from "fs";
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

// const createFile = async () => {

// 	fs.readFile("./data/cars.json", "utf8", (err, data) => {
// 		if (err) {
// 			console.error(err);
// 			return;
// 		}

// 		const cars = JSON.parse(data);
// 		const newCars = [];
		
// 		for (let car of cars.cars) {

// 			const newCar = {
// 				make: car.brand,
// 				model: car.model,
// 				color: car.color,
// 				year: car.year,
// 				price: car.price,
// 				available: car.available
// 			};

// 			console.log(newCar);

// 			newCars.push(newCar);

// 		}

// 		fs.writeFile("./data/newCars.json", JSON.stringify({ cars: newCars }), (err) => {
// 			if (err) {
// 				console.error(err);
// 				return;
// 			}

// 			console.log("File has been created");
// 		});

// 	});

// };

seed();

//createFile();

export default seed;