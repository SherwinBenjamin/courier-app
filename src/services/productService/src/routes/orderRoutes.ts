import express from "express";
import {
	addProduct,
	fetchProducts,
	modifyProduct,
	removeProduct,
} from "../controllers/orderController";
import validateOrder from "../middlewares/validateOrder";
import authenticateOrder from "../middlewares/authenticateOrder";

const router = express.Router();

router.post("/",authenticateOrder, validateOrder, addProduct);
router.get("/",authenticateOrder, fetchProducts);
// router.get("/:productId", fetchProductById);
router.put("/:productId", authenticateOrder, validateOrder, modifyProduct);
router.delete("/:productId", authenticateOrder, removeProduct);

export default router;
