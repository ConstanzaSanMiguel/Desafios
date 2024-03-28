import argsUtil from "../utils/args.utils.js"
import crypto from "crypto"
import { createHash } from "../utils/hash.util.js"

class UserDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.name = data.name
        this.email = data.email
        this.password = createHash(data.password)
        this.photo = data.photo || "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRlJctBbVsSX1pwJbht3qF5rXFRfVo6q1qOyyv6DZeMOXcfsFKR"
        this.role = data.role || "user"
        this.verified = data.verified || false
        this.verifiedCode = crypto.randomBytes(12).toString("base64")
        argsUtil.env !== "prod" && (this.updatedAt = new Date())
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default UserDTO