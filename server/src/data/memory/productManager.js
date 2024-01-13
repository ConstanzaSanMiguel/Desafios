//import crypto from "crypto"

class ProductManager {
    static #products = [];

    create(data) {
        try {
            const required = ["title", "photo", "price", "stock"]
            const missing = required.filter(prop => !(prop in data))

            if (missing.length > 0) {
                console.log(`Error. Please add the following field: ${missing.join(" ")}`)
            } else {
                //const id = crypto.randomBytes(12).toString("hex")
                const id = ProductManager.#products.length === 0
                    ? 1
                    : ProductManager.#products[ProductManager.#products.length - 1].id + 1
                const product = {
                    id,
                    title: data.title,
                    photo: data.photo,
                    price: data.price,
                    stock: data.stock,
                };
                ProductManager.#products.push(product)
            }
        } catch (error) {
            return error.message
        }
    }
    read() {
        try {
            if (ProductManager.#products.length === 0) {
                throw new Error("There are not products!")
            } else {
                return ProductManager.#products
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    readOne(id) {
        try {
            const searchId = ProductManager.#products.find((each) => each.id === parseInt(id))
            if (!searchId) {
                throw new Error("There are no products with id " + id)
            } else {
                console.log("read ", searchId)
                return searchId
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    destroy(id) {
        try {
            let destroyId = ProductManager.#products.findIndex((each) => each.id === parseInt(id))
            if (destroyId === -1) {
                throw new Error("Product with id " + id + " not found")
            } else {
                ProductManager.#products.splice(destroyId, 1)
                console.log("Deleted product with id: " + id)
                return id
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    update(id, data) {
        try {
            // Convierto el id a número para comprobación
            const productId = parseInt(id)
            const productIndex = ProductManager.#products.findIndex((each) => each.id === productId)
    
            if (productIndex === -1) {
                throw new Error("Product " + id + " not found.")
            }
    
            const updatedProduct = {
                ...ProductManager.#products[productIndex],
                ...data,
                id: productId
            }
    
            ProductManager.#products[productIndex] = updatedProduct
    
            console.log("Updated product with id: " + id)
            return updatedProduct
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    
}

const product = new ProductManager();

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
})
product.create({
    title: "ERROR - The Warning",
    photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/1.jpg?alt=media&token=642208c0-05c4-4c78-b106-f62109203be6",
    stock: 15,
})
product.create({
    title: "Love&Letter - SEVENTEEN",
    photo: "https://firebasestorage.googleapis.com/v0/b/vibe-kpop.appspot.com/o/1.jpg?alt=media&token=642208c0-05c4-4c78-b106-f62109203be6",
    price: 22,
    stock: 50,
})

console.log(product.read())
console.log(product.readOne("3"))
console.log(product.destroy("2"))
console.log(product.update("1",{
    "price": 38,
    "stock": 32
}))