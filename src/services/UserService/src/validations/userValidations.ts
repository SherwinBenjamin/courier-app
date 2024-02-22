import joi from "joi";
//add messages to the validations

const userSchema = joi.object({
	phoneNo: joi.number().required().messages({
		"number.base": "Phone number must be a number",
		"any.required": "Phone number is a required field",
	}),
	email: joi.string().required().messages({
		"string.base": "Email must be a string",
		"any.required": "Email is a required field",
	}),
	password: joi.string().required().min(6).max(50).messages({
		"string.base": "Password must be a string",
		"string.min": "Password must be at least 6 characters long",
		"string.max": "Password must be at most 50 characters long",
		"any.required": "Password is a required field",
	}),
	userType: joi
		.string()
		.valid("client", "deliveryPartner")
		.required()
		.messages({
			"string.base": "User type must be a string",
			"any.only": 'User type must be either "client" or "deliveryPartner"',
			"any.required": "User type is a required field",
		}),
});

const deliveryPartnerSchema = userSchema.keys({
	vehicleType: joi.string().valid("bike", "car", "truck").required().messages({
		"string.base": "Vehicle type must be a string",
		"any.only": 'Vehicle type must be either "bike", "car", or "truck"',
		"any.required": "Vehicle type is a required field",
	}),
	vehicleNo: joi.string().required().messages({
		"string.base": "Vehicle number must be a string",
		"any.required": "Vehicle number is a required field",
	}),
	vehicleColor: joi.string().required().messages({
		"string.base": "Vehicle color must be a string",
		"any.required": "Vehicle color is a required field",
	}),
	vehicleBrand: joi.string().required().messages({
		"string.base": "Vehicle brand must be a string",
		"any.required": "Vehicle brand is a required field",
	}),
	vehicleModel: joi.string().required().messages({
		"string.base": "Vehicle model must be a string",
		"any.required": "Vehicle model is a required field",
	}),
	radiusOfService: joi.number().required().messages({
		"number.base": "Radius of service must be a number",
		"any.required": "Radius of service is a required field",
	}),
});

export { userSchema, deliveryPartnerSchema };
