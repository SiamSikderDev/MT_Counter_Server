import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    sellerName: {
        type: String,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    buyerNumber: {
        type: String,
        required: true
    },
    buyerAddress: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    deliveryCharge: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        default: "due",
        required: true
    },
}, { timestamps: true })

export const Card = mongoose.model('Card', cardSchema);