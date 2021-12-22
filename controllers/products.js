import Product from "../models/products.js";

const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, fields } = req.query;
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
    let result = Product.find(queryOptions);
    //add global queries:
    // sort
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }
    //select
    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }
    const products = await result;
    res.status(200).json({ products, nHits: products.length });
};

export default { getAllProducts };