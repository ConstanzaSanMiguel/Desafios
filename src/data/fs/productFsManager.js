import fs from "fs"
import notFoundOne from "../../utils/notFoundOne.js"

class ProductManager {

    constructor(path) {
        this.path = path
        this.product = []
        this.init()
    }

    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            this.product = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async create(data) {
        try {
            this.product.push(data);
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
        //no filtra ni pagina
        try {
            if (this.product.length === 0) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                const all = await this.product
                    //.paginate(filter, sortAndPaginate)
                return all
            }
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