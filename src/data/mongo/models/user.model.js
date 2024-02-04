import { model, Schema } from "mongoose"

const collection = "users"
const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        //password: { type: String, required: true },
        photo: {
            type: String,
            default: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRlJctBbVsSX1pwJbht3qF5rXFRfVo6q1qOyyv6DZeMOXcfsFKR",
        }
    },
    { timestamps: true }
)

const User = model(collection, schema)
export default User