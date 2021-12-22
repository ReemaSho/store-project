import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        //validation:boolean with custom error message
        required: [true, "product name should be provided"],
    },
    price: {
        type: Number,
        require: [true, "product price should be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        // enum: ["ikea", "liddy", "caressa", "marcos"],
        //or
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            //custom error message
            message: "{VALUE} is not supported",
        },
    },
});
//first the name of the document
//then the scheme to determine how it looks
export default mongoose.model("Product", productSchema);