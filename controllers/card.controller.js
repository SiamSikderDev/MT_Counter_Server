import { Card } from "../models/card.model.js";

export const createCard = async (req, res) => {
    try {
        const { sellerName, buyerName, buyerNumber, buyerAddress, productPrice, deliveryCharge } = req.body;

        if (!sellerName || !buyerName || !buyerAddress || !productPrice || !deliveryCharge) return res.status(404).json({
            success: false,
            message: 'All fields are required!'
        })

        const price = Number(productPrice);
        const delivery = Number(deliveryCharge);
        const total = price + delivery;

        // Create card
        const card = await Card.create({
            sellerName,
            buyerName,
            buyerNumber,
            buyerAddress,
            productPrice: price,
            deliveryCharge: delivery,
            total,
        });

        return res.status(201).json({
            success: true,
            message: 'Card created successlly!',
        })
    } catch (e) {
        console.error(e.message)
    }
}

export const getAllDues = async (req, res) => {
    try {
        const accounts = await Card.find({ condition: 'due' });

        res.status(200).json({
            success: true,
            message: 'Accounts loaded!',
            accounts
        })

    } catch (e) {
        console.error(e.message)
    }
}

export const getAllSells = async (req, res) => {
    try {
        const accounts = await Card.find({ condition: 'sell' });

        res.status(200).json({
            success: true,
            message: 'Accounts loaded!',
            accounts
        })

    } catch (e) {
        console.error(e.message)
    }
}

export const removeCard = async (req, res) => {
    try {
        const { cardId } = req.body;  // renamed for clarity

        if (!cardId) {
            return res.status(400).json({
                success: false,
                message: 'Card ID is required.'
            });
        }

        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({
                success: false,
                message: 'Card not found!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted the account!'
        })
    } catch (e) {
        console.log(e.message)
    }
}

export const changeCardCondition = async (req, res) => {
    try {
        const { cardId } = req.body;  // renamed for clarity

        if (!cardId) {
            return res.status(400).json({
                success: false,
                message: 'Card ID is required.'
            });
        }

        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'Card not found!'
            });
        }

        card.condition = 'sell'
        card.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully save to sells!'
        })
    } catch (e) {
        console.log(e.message)
    }
}