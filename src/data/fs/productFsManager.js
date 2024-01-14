import fs from "fs"
import crypto from "crypto"

class ProductManager {
    static #products = [];

    constructor(path) {
        this.path = path;
        this.product = [];
        this.init();
    }

    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            ProductManager.#products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async create(data) {
        try {
            const id = crypto.randomBytes(12).toString("hex")
            const product = {
                id,
                title: data.title,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
            }
            ProductManager.#products.push(product);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(ProductManager.#products, null, 2)
            )
            return true
        }
        catch (error) {
            throw error
        }
    }
    read() {
        try {
            if (ProductManager.#products.length === 0) {
                const error = new Error("There are not products!")
                error.statusCode = 400
                throw error
            } else {
                return ProductManager.#products;
            }
        } catch (error) {
            throw error
        }
    }
    readOne(id) {
        try {
            const searchId = ProductManager.#products.find((each) => each.id === id)
            if (!searchId) {
                const error = new Error("There are no products with id " + id)
                error.statusCode = 400
                throw error
            } else {
                console.log("read " + searchId)
                return searchId
            }
        } catch (error) {
            throw error
        }
    }
    async destroy(id) {
        try {
            let destroyId = ProductManager.#products.findIndex((each) => each.id === id)
            if (destroyId === -1) {
                const error = new Error("Product not found")
                error.statusCode = 400
                throw error
            } else {
                ProductManager.#products = ProductManager.#products.filter((each) => each.id !== id)
                const jsonData = JSON.stringify(ProductManager.#products, null, 2);
                await fs.promises.writeFile(this.path, jsonData)
                return {
                    statusCode: 200,
                    response: "Deleted product with id: " + id,
                }
            }
        } catch (error) {
            throw error
        }
    }
    update(id, data) {
            const productIndex = ProductManager.#products.findIndex((each) => each.id === id)

            if (productIndex === -1) {
                const error = new Error("Product " + id + " not found.")
                error.statusCode = 400
                throw error
            }
            const updatedProduct = {
                ...ProductManager.#products[productIndex],
                ...data,
                id: id,
            };

            ProductManager.#products[productIndex] = updatedProduct

            const jsonData = JSON.stringify(ProductManager.#products, null, 2)
            fs.promises.writeFile(this.path, jsonData)

            return updatedProduct
    }
}

const products = new ProductManager('./src/data/fs/files/productsFs.json')
export default products