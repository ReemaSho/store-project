import express from "express";
import productsRouter from "./routes/products.js";
import connectDB from "./db/connect.js";
import { config } from "dotenv";
const app = express();
const DB_URI = config();

import RouteNotFoundMiddleware from "./middleware/route-not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//middleware
app.use(express.json());

// default route
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products"> Products route </a>');
});
app.use("/api/v1/products", productsRouter);
app.use(RouteNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async() => {
    try {
        //connect DB, return a promise
        await connectDB(DB_URI.parsed.MONGO_URI);
        app.listen(PORT, console.log(`app is listening to port ${PORT} `));
    } catch (error) {
        console.log(error);
    }
};

start();