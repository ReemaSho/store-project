import express from "express";
const router = express.Router();
import controllers from "../controllers/products.js";
const { getAllProducts, getAllProductsStatic } = controllers;

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

export default router;