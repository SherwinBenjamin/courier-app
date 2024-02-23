import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/userModel";

// Extending Express Request to include user
declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.header("Authorization");
		if (!authorizationHeader) {
			throw new Error("Authorization header is required");
		}

		const token = authorizationHeader.replace("Bearer ", "");
		if (!token) {
			throw new Error("Token is required");
		}

		// Verifying token
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
		}; // Assuming your token stores an object with userId
		if (!decoded) {
			throw new Error("Invalid token");
		}

		// Finding user
		const user = await User.findOne({ _id: decoded.userId });
		if (!user) {
			throw new Error("User not found");
		}

		// Adding user to the request object
		req.user = user;
		next();
	} catch (error:any) {
		res.status(401).send({ message: error.message});
	}
};

export { auth };
