import {Request, Response} from 'express';
import {createProduct, deleteProduct, getProductById, getProducts, updateProduct} from '../services/orderService';
import {IProduct} from '../models/orderModel';

async function addProduct(req: Request, res: Response){
    const productData: IProduct = req.body;
    try{
        const product = await createProduct(productData, req);
        res.status(201).json(product);
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

async function fetchProducts(req: Request, res: Response){
    try{
        const products = await getProducts(req, res);
        res.status(200).json(products);
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

async function modifyProduct(req: Request, res: Response){
    const productId = req.params.productId;
    const updatedData = req.body;
    try{
        const product = await updateProduct(productId, updatedData);
        if(product) res.status(200).json(product);
        else res.status(404).json({message: 'Product not found'});
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

async function removeProduct(req: Request, res: Response){
    const productId = req.params.productId;
    try{
        const product = await deleteProduct(productId);
        if(product) res.status(200).json(product);
        else res.status(404).json({message: 'Product not found'});
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

export {addProduct, fetchProducts, modifyProduct, removeProduct};