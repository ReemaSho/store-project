import express from "express";
const router = express.Router();
import controllers from "../controllers/products.js";
const { getAllProducts } = controllers;

router.route("/").get(getAllProducts);

export default router;