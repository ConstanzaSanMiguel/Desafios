import notFoundOne from "../../utils/notFoundOne.js"
import { Types } from "mongoose"
import CustomError from "../../utils/errors/CustomError.js"
import errors from "../../utils/errors/errors.js"

class MongoManager {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        try {
            const one = await this.model.create(data)
            return one
        } catch (error) {
            throw error
        }
    }

    async read({ filter, sortAndPaginate }) {
        try {
            sortAndPaginate = { ...sortAndPaginate, lean: true }
            const all = await this.model.paginate(filter, sortAndPaginate)
            if (all.docs.length === 0) {
                CustomError.new(errors.notFound)
            }
            return all
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findById(id).lean()
            notFoundOne(one)
            return one
        } catch (error) {
            throw error
        }
    }

    async update(id, data) {
        try {
            const options = { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, options)
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
            return one
        } catch (error) {
            throw error
        }
    }

    async report(uid) {
        try {
            const report = await this.model.aggregate([
                { $match: { uid: new Types.ObjectId(uid) } },
                {
                    $lookup: {
                        from: "products",
                        foreignField: "_id",
                        localField: "pid",
                        as: "product_id"
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"] }
                    }
                },
                { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
                { $group: { _id: "$uid", total: { $sum: "$subtotal" } } },
                { $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date() } }
                //{ $merge: { into: "total" } },
            ])
            if (report.length === 0) {
                CustomError.new(errors.noOrders)
            } else {
                return report
            }
        } catch (error) {
            throw error
        }
    }
}

export default MongoManager