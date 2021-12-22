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

    // page & limit & skip
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await result.skip(skip).limit(limit);
    res.status(200).json({ products, nHits: products.length });
};

export default { getAllProducts };