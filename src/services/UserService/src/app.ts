import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/users", userRoutes);
mongoose
	.connect(process.env.MONGO_URI! as string)
	.then(() => {
		console.log("Connected to MongoDB");

		app.listen(PORT, () => {
			console.log(`Server is running on PORT: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
export default app;
