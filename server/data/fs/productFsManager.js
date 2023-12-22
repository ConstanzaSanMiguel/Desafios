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
            const required = ["title", "photo", "price", "stock"];
            const missing = required.filter(prop => !(prop in data));

            if (missing.length > 0) {
                throw new Error(`Missing fields: ${missing.join(" ")}`);
            } else {
                const id = crypto.randomBytes(12).toString("hex")
                const product = {
                    id,
                    title: data.title,
                    photo: data.photo,
                    price: data.price,
                    stock: data.stock,
                };
                ProductManager.#products.push(product);
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(ProductManager.#products, null, 2)
                );
                return true;
            }
        } catch (error) {
            return error.message;
        }
    }
    read() {
        try {
            if (ProductManager.#products.length === 0) {
                throw new Error("There are not products!");
            } else {
                return ProductManager.#products;
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
    readOne(id) {
        try {
            const searchId = ProductManager.#products.find((each) => each.id === id);
            if (!searchId) {
                throw new Error("There are no products with id " + id);
            } else {
                console.log("read " + searchId);
                return searchId;
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
    destroy(id) {
        try {
            let destroyId = ProductManager.#products.find((each) => each.id === id);
            if (!destroyId) {
                throw new Error("Product with id '" + id + "' not found");
            } else {
                ProductManager.#products = ProductManager.#products.filter((each) => each.id !== id);
                const jsonData = JSON.stringify(ProductManager.#products, null, 2);
                fs.promises.writeFile(this.path, jsonData);
                console.log("Deleted product with id: " + id);
                return id;
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}

const product = new ProductManager('./server/data/fs/files/productsFs.json');
export default product;

// product.create({
//     title: "Our Twenty Four - WINNER",
//     photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/3.jpg?alt=media&token=cf50a3a8-3f81-4d45-aa6b-21c1db421412",
//     price: 24,
//     stock: 35,
// });

// product.create({
//     title: "130 MOOD : TRBL - DEAN",
//     photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/11.jpg?alt=media&token=5fd5068b-999f-46bf-8a38-115d5fce1de9",
//     price: 21,
//     stock: 25,
// });

// product.create({
//     title: "ERROR - The Warning",
//     photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/1.jpg?alt=media&token=642208c0-05c4-4c78-b106-f62109203be6",
//     stock: 15,
// });

// product.create({
//     title: "Love&Letter - SEVENTEEN",
//     photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/1.jpg?alt=media&token=642208c0-05c4-4c78-b106-f62109203be6",
//     price: 22,
//     stock: 50,
// });

// console.log(product.read());
// console.log(product.readOne(2));
