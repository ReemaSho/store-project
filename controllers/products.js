const getAllProducts = (req, res) => {
    res.status(200).json({ msg: "products route" });
};

const getAllProductsStatic = (req, res) => {
    res.status(200).json({ msg: "products testing route" });
};

export default { getAllProducts, getAllProductsStatic };