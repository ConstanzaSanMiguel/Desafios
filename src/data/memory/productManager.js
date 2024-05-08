import crypto from "crypto"
import notFoundOne from "../../utils/notFoundOne.js"
import winstonLogger from "../../utils/logger/index.js";

class ProductManager {
    static #products = [];

    create(data) {
        try {
            const required = ["title", "photo", "price", "stock"]
            const missing = required.filter(prop => !(prop in data))

            if (missing.length > 0) {
                winstonLogger.WARN(`Error. Please add the following field: ${missing.join(" ")}`)
            } else {
                const id = crypto.randomBytes(12).toString("hex")
                const product = {
                    id,
                    title: data.title,
                    photo: data.photo,
                    price: data.price,
                    stock: data.stock,
                }
                ProductManager.#products.push(product)
                return product.id
            }
        } catch (error) {
            return error.message
        }
    }
    async read({ filter, sortAndPaginate }) {
        //no filtra ni pagina todavía
        try {
            if (ProductManager.#products.length === 0) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                const all = await ProductManager.#products
                    .paginate(filter, sortAndPaginate)
                return all
            }
        } catch (error) {
            throw error
        }
    }
    readOne(id) {
        try {
            const one = ProductManager.#products.find((each) => each.id === parseInt(id))
            if (!one) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                winstonLogger.INFO("read ", one)
                return one
            }
        } catch (error) {
            throw error
        }
    }
    destroy(id) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            ProductManager.#products = ProductManager.#products.filter(
                (each) => each.id !== id
            )
            return one
        } catch (error) {
            throw error
        }
    }
    update(id, data) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            for (let each in data) {
                one[each] = data[each]
            }
            return one
        } catch (error) {
            throw error
        }
    }
}

const products = new ProductManager();
export default products