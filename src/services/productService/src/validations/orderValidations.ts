import Joi from "joi";

const createProductSchema = Joi.object({
	name: Joi.string().required().messages({
		"string.empty": "Name cannot be empty",
		"any.required": "Name is required",
	}),
	description: Joi.string().required().messages({
		"string.empty": "Description cannot be empty",
		"any.required": "Description is required",
	}),
	price: Joi.number().required().messages({
		"number.base": "Price must be a number",
		"any.required": "Price is required",
	}),
	pickupLocation: Joi.object({
		street: Joi.string().required().messages({
			"string.empty": "Street cannot be empty",
			"any.required": "Street is required",
		}),
		city: Joi.string().required().messages({
			"string.empty": "City cannot be empty",
			"any.required": "City is required",
		}),
		country: Joi.string().required().messages({
			"string.empty": "Country cannot be empty",
			"any.required": "Country is required",
		}),
		pincode: Joi.string().required().messages({
			"string.empty": "Pincode cannot be empty",
			"any.required": "Pincode is required",
		}),
	}).required(),
	deliveryLocation: Joi.object({
		street: Joi.string().required().messages({
			"string.empty": "Street cannot be empty",
			"any.required": "Street is required",
		}),
		city: Joi.string().required().messages({
			"string.empty": "City cannot be empty",
			"any.required": "City is required",
		}),
		country: Joi.string().required().messages({
			"string.empty": "Country cannot be empty",
			"any.required": "Country is required",
		}),
		pincode: Joi.string().required().messages({
			"string.empty": "Pincode cannot be empty",
			"any.required": "Pincode is required",
		}),
	}).required(),
	itemDetails: Joi.object({
		height: Joi.number().required().messages({
			"number.base": "Height must be a number",
			"any.required": "Height is required",
		}),
		width: Joi.number().required().messages({
			"number.base": "Width must be a number",
			"any.required": "Width is required",
		}),
		breadth: Joi.number().required().messages({
			"number.base": "Breadth must be a number",
			"any.required": "Breadth is required",
		}),
		weight: Joi.number().required().messages({
			"number.base": "Weight must be a number",
			"any.required": "Weight is required",
		}),
	}).required(),
	productTags: Joi.array()
		.items(Joi.string().valid("fragile", "liquid", "liveAnimals", "perishable"))
		.required()
		.messages({
			"any.required": "Product tags are required",
			"any.only":
				"Product tags must be one of [fragile, liquid, liveAnimals, perishable]",
		}),
	productStatus: Joi.string()
		.valid("pending", "assigned", "delivered", "cancelled")
		.required()
		.messages({
			"any.required": "Product status is required",
			"any.only":
				"Product status must be one of [pending, assigned, delivered, cancelled]",
		}),
});

export { createProductSchema };