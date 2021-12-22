import Product from "../models/products.js";

const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    //I set queryOption equal to an empty string , incase the queryString doesn't exist in my data , fun will search for an empty object and return all products
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false; // ternary operator to set the value of featured property
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        //{ $regex} mongoDB query operators docs
        queryObject.name = { $regex: name, $options: "i" };
    }

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

    //numericFilters
    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };
        const regularExpressions = /\b(>|>=|=|<|<=)\b/g;
        const filters = numericFilters.replace(
            regularExpressions,
            (match) => `-${operatorMap[match]}-`
        );

        const options = ["price", "rating"];
        filters.split(",").forEach((item) => {
            //array destructuring
            const [field, operator, value] = item.split("-");

            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value),
                };
            }
        });
    }
    let result = Product.find(queryObject);
    const products = await result.skip(skip).limit(limit);
    res.status(200).json({ products, nHits: products.length });
};

export default { getAllProducts };