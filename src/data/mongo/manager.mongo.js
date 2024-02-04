import User from "./models/user.model.js"
import Product from "./models/product.model.js"
import Order from "./models/order.model.js"
import notFoundOne from "../../utils/notFoundOne.js"

class MongoManager {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        try {
            const one = await this.model.create(data)
            return one._id
        } catch (error) {
            throw error
        }
    }

    async read(obj) {
        try {
            let { filter, sort } = obj
            if (!sort) {
                if (this.model.modelName === 'users') {
                    sort = { name: 1 }
                } else if (this.model.modelName === 'products') {
                    sort = { title: 1 }
                }
            }
            if (!filter) filter = {}
            const all = await this.model.find(filter).sort(sort)
            if (all.length === 0) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            }
            return all
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findById(id)
            notFoundOne(one)
            return one
        } catch (error) {
            throw error
        }
    }

    async update(id, data) {
        try {
            const opt = { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opt)
            notFoundOne(one)
            return one
        } catch (error) {
            throw error
        }
    }

    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id)
            notFoundOne(one)
            return one
        } catch (error) {
            throw error
        }
    }

    async readByEmail(email) {
        try {
            const one = await this.model.findOne({ email: email })
            notFoundOne(one)
            return one
        } catch (error) {
            throw error
        }
    }
}

const users = new MongoManager(User)
const products = new MongoManager(Product)
const orders = new MongoManager(Order)

export { users, products, orders }