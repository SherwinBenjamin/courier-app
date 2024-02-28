import { Request, Response, NextFunction } from "express";
// import { Schema } from "joi";
import { createProductSchema } from "../validations/orderValidations";

const validateOrder = (req: Request, res: Response, next: NextFunction) => {
        console.log('validateOrder middleware');
        const schema = createProductSchema;
		const user = req.body.user;
		delete req.body.user;
		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		req.body.user = user;
		next();		
	};
    export default validateOrder;