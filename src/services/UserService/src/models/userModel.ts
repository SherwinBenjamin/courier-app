import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
	phoneNo: number;
	email: string;
	password: string;
	userType: "client" | "deliveryPartner";
}

interface IDeliveryPartner extends IUser {
	vehicleType: "bike" | "car" | "truck";
	vehicleNo: string;
	vehicleColor: string;
	vehicleBrand: string;
	vehicleModel: string;
	radiusOfService: number;
	serviceablePincode: string;
	lat: string;
	long: string;
}

const userSchema = new Schema<IUser>({
	phoneNo: { type: Number, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	userType: {
		type: String,
		required: true,
		enum: ["client", "deliveryPartner"],
	},
});

const deliveryPartnerSchema = new Schema<IDeliveryPartner>({
	vehicleType: { type: String, required: true, enum: ["bike", "car", "truck"] },
	vehicleNo: { type: String, required: true },
	vehicleColor: { type: String, required: true },
	vehicleBrand: { type: String, required: true },
	vehicleModel: { type: String, required: true },
	radiusOfService: { type: Number, required: true },
	serviceablePincode: { type: String, required: true },
	lat: { type: String, required: true },
	long: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);
const DeliveryPartner = User.discriminator<IDeliveryPartner>(
	"DeliveryPartner",
	deliveryPartnerSchema
);

export { User, DeliveryPartner, IUser };