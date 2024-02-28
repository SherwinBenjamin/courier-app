import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/products", orderRoutes);
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
