import Product from "../models/products.js";

const getAllProducts = async(req, res) => {
    const { featured, company, name } = req.query;
    //I set queryOption equal to an empty string , incase the queryString doesn't exist in my data , fun will search for an empty object and return all products
    const queryOptions = {};

    if (featured) {
        queryOptions.featured = featured === "true" ? true : false; // ternary operator to set the value of featured property
    }
    if (company) {
        queryOptions.company = company;
    }
    if (name) {
        //{ $regex} mongoDB query operators docs
        queryOptions.name = { $regex: name, $options: "i" };
    }
    const products = await Product.find(queryOptions);
    res.status(200).json({ products, nHits: products.length });
};

export default { getAllProducts };