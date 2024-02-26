import exp from "constants";
import mongoose, {Document, Schema} from "mongoose";

interface Address {
    street: string;
    city: string;
    country: string;
    pincode: string;
}

interface ItemDetails {
    height: number;
    width: number;
    breadth: number;
    weight: number;
}

enum productTags{
    fragile = "fragile",
    liquid = "liquid",
    liveAnimals = "liveAnimals",
    perishable = "perishable",
}

enum orderStatus {
    pending = "pending",
    assigned = "assigned",
    delivered = "delivered",
    cancelled = "cancelled",
}

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    pickupLocation: Address;
    deliveryLocation: Address;
    itemDetails: ItemDetails;
    productTags: productTags[];
    productStatus: orderStatus;
    assignedTo?: Schema.Types.ObjectId;
}

const addressSchema = new Schema<Address>({
    street: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    pincode: {type: String, required: true},
});

const itemDetailsSchema = new Schema<ItemDetails>({
    height: {type: Number, required: true},
    width: {type: Number, required: true},
    breadth: {type: Number, required: true},
    weight: {type: Number, required: true},
});

const productSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    pickupLocation: { addressSchema, required: true},
    deliveryLocation: { addressSchema, required: true},
    itemDetails: { itemDetailsSchema, required: true},
    productTags:[{type: String, enum: productTags}],
    productStatus : {type: String, enum: orderStatus, default: orderStatus.pending},
    assignedTo: {type: Schema.Types.ObjectId, ref: "User", required: false},
}, {timestamps: true});

export {IProduct, productSchema, productTags, orderStatus}





