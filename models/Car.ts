import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
	brand: {
		type: String,
	},

	model: {
		type: String,
	},

	color: {
		type: String,
	},

	year: {
		type: Number,
	},

	price: {
		type: Number,
	},

	available: {
		type: Boolean,
	}
});

carSchema.index({ brand: 1, model: 1, color: 1, year: 1, price: 1, available: 1 });
export default mongoose.models.Car || mongoose.model("Car", carSchema);