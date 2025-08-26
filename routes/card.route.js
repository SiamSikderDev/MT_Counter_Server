import express from "express";
import { createCard, getAllDues, getAllSells, removeCard } from "../controllers/card.controller.js";

const router = express.Router();

router
    .post('/create', createCard)
    .get('/getAllDues', getAllDues)
    .get('/getAllSells', getAllSells)
    .delete('/removeCard', removeCard)

export default router;