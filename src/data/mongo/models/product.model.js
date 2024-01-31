import { model, Schema } from "mongoose"

const collection = "products"
const schema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        photo: {
            type: String,
            default: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTmaikmPRaJ8l9KOsQb6UWAaK5CHtLzXnTS0Bn7HvrzWgAt66FR",
        },
        price: { type: Number, required: true, min: 1 },
        stock: { type: Number, required: true, min: 1 }
    },
    {
        timestamps: true,
    }
)

const Product = model(collection, schema)
export default Product