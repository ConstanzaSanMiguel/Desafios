import argsUtil from "../utils/args.utils.js"
import crypto from "crypto"

class OrderDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.uid = data.uid
        this.pid = data.pid
        this.quantity = data.quantity || 1
        this.state = data.state || "Reserved"
        argsUtil.env !== "prod" && (this.updatedAt = new Date())
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}
export default OrderDTO