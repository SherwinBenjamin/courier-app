import { IProduct, Product } from "../models/orderModel";

async function createProduct(productData: IProduct): Promise<IProduct> {
	try {
		const product = new Product(productData);
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

async function getProducts(): Promise<IProduct[]> {
	try {
		return await Product.find();
	} catch (error: any) {
		throw new Error(error.message);
	}
}

async function updateProduct(
	productId: string,
	updatedData: Partial<IProduct>
): Promise<IProduct | null> {
	try {
		return await Product.findByIdAndUpdate(productId, updatedData, {
			new: true,
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
}

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
	deleteProduct,
};
