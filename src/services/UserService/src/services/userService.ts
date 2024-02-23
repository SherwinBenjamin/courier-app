import{ User, DeliveryPartner } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";


interface UserData {
	email: string;
	password: string;
	userType: "client" | "deliveryPartner";
	vehicleType?: "bike" | "car" | "truck";
	vehicleNo?: string;
	vehicleColor?: string;
	vehicleBrand?: string;
	vehicleModel?: string;
	radiusOfService?: number;
	serviceablePincode?: string;
	lat?: string;
	long?: string;
}

const registerUser = async (req:Request, res:Response) => {
    // console.log("------------");
    console.log(req.body);
    const userData: any= req.body;    
	const { email, password, ...rest } = userData;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error("User already exists");
	}
    let salt = bcrypt.genSaltSync(10);
    console.log(password);
    console.log(salt);
	const hashedPassword = await bcrypt.hash(password,salt);
	let newUser;
	if (userData.userType === "deliveryPartner") {
		newUser = new DeliveryPartner({ email, password: hashedPassword, ...rest });
	} else {
		newUser = new User({ email, password: hashedPassword, ...rest });
	}
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req:Request, res:Response) => {
    const userData: UserData = req.body;
	const { email, password } = userData;
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("User does not exist");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Invalid credentials");
	}
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
		expiresIn: "1h",
	});
	return res.status(200).json({ token });
};

export { registerUser, loginUser };
