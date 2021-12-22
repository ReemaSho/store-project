//to connect to mongoDB :
//1- connection string from .env
//2- my connection fun
//3- my document schema

import { config } from "dotenv";
const DB_URI = config();
import connectDB from "./db/connect.js";
import productSchema from "./models/products.js";
//my-json-data

import jsonProducts from "./products.js";
//start connection
const start = async() => {
    try {
        await connectDB(DB_URI.parsed.MONGO_URI);
        await productSchema.deleteMany();
        await productSchema.create(jsonProducts);
        console.log("success");
        process.exit(0); // to exit the process /stop nodemon if it is success
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();