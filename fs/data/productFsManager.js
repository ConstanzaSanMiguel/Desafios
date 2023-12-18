const fs = require('fs');

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
                console.log(`Error. Please add the following field: ${missing.join(" ")}`);
            } else {
                const id = ProductManager.#products.length > 0 ? ProductManager.#products[ProductManager.#products.length - 1].id + 1 : 1;
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
        return ProductManager.#products;
    }
    readOne(id) {
        return ProductManager.#products.find((each) => each.id === id);
    }
}

const product = new ProductManager('./fs/data/json/productsFs.json');

product.create({
    title: "Our Twenty Four - WINNER",
    photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/3.jpg?alt=media&token=cf50a3a8-3f81-4d45-aa6b-21c1db421412",
    price: 24,
    stock: 35,
});

product.create({
    title: "130 MOOD : TRBL - DEAN",
    photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/11.jpg?alt=media&token=5fd5068b-999f-46bf-8a38-115d5fce1de9",
    price: 21,
    stock: 25,
});

product.create({
    title: "ERROR - The Warning",
    photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/1.jpg?alt=media&token=642208c0-05c4-4c78-b106-f62109203be6",
    stock: 15,
});

product.create({
    title: "Love&Letter - SEVENTEEN",
    photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/1.jpg?alt=media&token=642208c0-05c4-4c78-b106-f62109203be6",
    price: 22,
    stock: 50,
});

console.log(product.read());
console.log(product.readOne(2));
