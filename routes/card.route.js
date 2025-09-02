import express from "express";
import { changeCardCondition, createCard, getAllDues, getAllSells, removeCard } from "../controllers/card.controller.js";

const router = express.Router();

router
    .post('/create', createCard)
    .get('/getAllDues', getAllDues)
    .get('/getAllSells', getAllSells)
    .delete('/removeCard', removeCard)
    .post('/changeCardCondition', changeCardCondition)

export default router;