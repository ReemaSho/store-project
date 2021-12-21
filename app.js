import { config } from "dotenv";
import express from "express";
import RouteNotFoundMiddleware from "./middleware/route-not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
const DB_URI = config();
const app = express();

//middleware
app.use(express.json());

//default route
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products"> Products route </a>');
});
app.use(RouteNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async() => {
    try {
        app.listen(PORT, console.log(`app is listening to port ${PORT} `));
    } catch (error) {
        console.log(error);
    }
};

start();