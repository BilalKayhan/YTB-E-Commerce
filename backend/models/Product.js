const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name : { type : String, required : true },
        images : { type : Array, default : [] },
        price : { type : Number, default : 0.00 },
        description : { type : String, default : "" },
        stock : { type : Number, default : 0 },
        discount : { type : Number, default : 0.00 },
        colors : { type : Array, default : [] },
        sizes : { type : Array, default : [] },
        stockCode : { type : String, required : true },
        category : { 
            type : mongoose.Schema.Types.ObjectId, 
            ref : "Category", 
            required : true 
        }
    },
    {
        timestamps : true
    }
)

const Product = mongoose.model("Product",ProductSchema);

module.exports = Product;