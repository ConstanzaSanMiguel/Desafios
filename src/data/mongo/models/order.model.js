import { model, Schema, Types } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "orders"
const schema = new Schema(
    {
        uid: { type: Types.ObjectId, required: true, ref: "users", index: true },
        pid: { type: Types.ObjectId, required: true, ref: "products" },
        quantity: { type: Number, default: 1, min: 1 },
        state: {
            type: String, 
            enum: ["Reserved", "Paid", "Delivered"],
            default: "Reserved"
        }
    },
    { timestamps: true }
)

schema.pre("find", function () {
    this.populate("uid", "-password -createdAt -updatedAt -__v -photo");
})
schema.pre("find", function () {
    this.populate("pid", "title price photo quantity");
})

schema.plugin(mongoosePaginate)
const Order = model(collection, schema)
export default Order