import { NextFunction, Request, Response } from "express";
import { userSchema, deliveryPartnerSchema } from '../validations/userValidations';


const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { userType } = req.body;
    const schema = userType === "deliveryPartner" ? deliveryPartnerSchema : userSchema;
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export { validateUser };