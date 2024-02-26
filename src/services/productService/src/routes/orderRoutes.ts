import express from "express";
import { addProduct, fetchProducts, fetchProductById, modifyProduct, removeProduct  } from "../controllers/orderController";
import { validateOrder } from "../middlewares/validateOrder";
import { createProductSchema } from "../validations/orderValidations";

const router = express.Router();

router.post("/", validateOrder, addProduct);
router.get("/", fetchProducts);
router.get("/:productId", fetchProductById);
router.put("/:productId", validateOrder, modifyProduct);
router.delete("/:productId", removeProduct);

export default router;
