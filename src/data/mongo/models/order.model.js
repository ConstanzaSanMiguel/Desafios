import { model, Schema, Types } from "mongoose"

const collection = "orders"
const schema = new Schema(
    {
        uid: { type: Types.ObjectId, required: true, ref: "users" },
        pid: { type: Types.ObjectId, required: true, ref: "products" },
        quantity: { type: Number, default: 1, min: 1 },
        state: {
            type: String, default: "Reserved",
            enum: ["Reserved", "Paid", "Delivered"]
        }
    },
    { timestamps: true }
)

//agregar -password
schema.pre("find", function () {
    this.populate("uid", "-createdAt -updatedAt -__v -photo");
})
schema.pre("find", function () {
    this.populate("pid", "title price");
})

const Order = model(collection, schema)
export default Order