import { IProduct, Product } from "../models/orderModel";
import { Request, Response } from "express";

async function createProduct(
	productData: IProduct,
	req: Request
): Promise<IProduct> {
	try {
		console.log("-----------------");
		console.log(req.body.user);
		const userId = req.body.user.userId;
		const product = new Product({ ...productData, createdBy: userId });
		return await product.save();
	} catch (error: any) {
		throw new Error(error.message);
	}
}

async function getProductById(productId: string): Promise<IProduct | null> {
	try {
		return await Product.findById(productId);
	} catch (error: any) {
		throw new Error(error.message);
	}
}


async function getProducts(req: Request, res: Response) {
	const userId = req.body.user.userId;
	const userType = req.body.user.type;

	try {
		if (userType === "client") {
			return res
				.status(200)
				.json({ products: await Product.find({ createdBy: userId }) });
		} else if (userType === "deliveryPartner") {
			return res
				.status(200)
				.json({ products: await Product.find({ assignedTo: userId }) });
		}
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
}

// async function updateProduct(
// 	productId: string,
// 	updatedData: Partial<IProduct>
// ): Promise<IProduct | null> {
// 	try {
// 		return await Product.findByIdAndUpdate(productId, updatedData, {
// 			new: true,
// 		});
// 	} catch (error: any) {
// 		throw new Error(error.message);
// 	}
// }

//update product status



//assign product to delivery partner




async function deleteProduct(productId: string): Promise<IProduct | null> {
	try {
		return await Product.findByIdAndDelete(productId);
	} catch (error: any) {
		throw new Error(error.message);
	}
}
export {
	createProduct,
	getProductById,
	getProducts,
	updateProduct,
	deleteProduct
};
