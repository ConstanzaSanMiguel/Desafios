import { model, Schema } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "users"
const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        photo: {
            type: String,
            default: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRlJctBbVsSX1pwJbht3qF5rXFRfVo6q1qOyyv6DZeMOXcfsFKR",
        },
        role: {
            type: String,
            enum: ["admin", "user", "prem"],
            default: "user"
        },
        verified: { type: Boolean, default: false },
        verifiedCode: { type: String, required: true }
    },
    { timestamps: true }
)

schema.plugin(mongoosePaginate)
const User = model(collection, schema)
export default User