import argsUtil from "../utils/args.utils.js"
import crypto from "crypto"

class ProductDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.title = data.title
        this.photo = data.photo || "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTmaikmPRaJ8l9KOsQb6UWAaK5CHtLzXnTS0Bn7HvrzWgAt66FR"
        this.price = data.price || 20
        this.stock = data.stock || 15
        argsUtil.env !== "prod" && (this.updatedAt = new Date())
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default ProductDTO