import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
	phoneNo: {
		type: Number,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	userType: {
		type: String,
		required: true,
		enum: ["client", "deliveryPartner"],
	},
});

const deliveryPartnerSchema = new mongoose.Schema({
	vehicleType: {
		type: String,
		required: true,
		enum: ["bike", "car", "truck"],
	},
	vehicleNo: {
		type: String,
		required: true,
	},
	vehicleColor: {
		type: String,
		required: true,
	},
	vehicleBrand: {
		type: String,
		required: true,
	},
	vehicleModel: {
		type: String,
		required: true,
	},
	radiusOfService: {
		type: Number,
		required: true,
	},
	serviceablePincode: {
		type: String,
		required: true,
	},
	lat: {
		type: String,
		required: true,
	},
	long: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

const deliveryPartner = User.discriminator(
	"deliveryPartner",
	deliveryPartnerSchema
);
