import fs from "fs"
import notFoundOne from "../../utils/notFoundOne.js"

class ProductManager {

    constructor(path) {
        this.path = path
        this.product = []
        this.init()
    }

    init() {
        const file = fs.existsSync(this.path)
        if (file) {
            this.product = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2))
        }
    }
    async create(data) {
        try {
            this.product.push(data)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.product, null, 2)
            )
            return data
        }
        catch (error) {
            throw error
        }
    }
    async read({ filter, sortAndPaginate }) {
        try {
            if (this.product.length === 0) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            }
            let filteredProducts = this.product.filter((product) => {
                for (let key in filter) {
                    if (filter[key] instanceof RegExp) {
                        if (!filter[key].test(product[key])) {
                            return false
                        }
                    } else {
                        if (product[key] !== filter[key]) {
                            return false
                        }
                    }
                }
                return true
            })
            if (sortAndPaginate.sort) {
                const [key, order] = Object.entries(sortAndPaginate.sort)[0]
                filteredProducts.sort((a, b) => {
                    if (a[key] < b[key]) return order === "asc" ? -1 : 1
                    if (a[key] > b[key]) return order === "asc" ? 1 : -1
                    return 0
                })
            }

            const page = sortAndPaginate.page || 1
            const limit = sortAndPaginate.limit || 10
            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
            const result = {
                docs: paginatedProducts,
                totalDocs: filteredProducts.length,
                limit: limit,
                totalPages: Math.ceil(filteredProducts.length / limit),
                page: page,
                pagingCounter: startIndex + 1,
                hasPrevPage: page > 1,
                hasNextPage: endIndex < filteredProducts.length,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: endIndex < filteredProducts.length ? page + 1 : null,
            }
            return result
        } catch (error) {
            throw error
        }
    }
    readOne(id) {
        try {
            const one = this.product.find((each) => each._id === id)
            if (!one) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                return one
            }
        } catch (error) {
            throw error
        }
    }
    async destroy(id) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            this.product = this.product.filter((each) => each._id !== id)
            const jsonData = JSON.stringify(this.product, null, 2)
            await fs.promises.writeFile(this.path, jsonData)
            return one
        } catch (error) {
            throw error
        }
    }
    async update(id, data) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            for (let each in data) {
                one[each] = data[each]
            }
            const jsonData = JSON.stringify(this.product, null, 2)
            await fs.promises.writeFile(this.path, jsonData)
            return one
        } catch (error) {
            throw error
        }
    }
}

const products = new ProductManager('./src/data/fs/files/productsFs.json')
export default products