import fs from "fs"
import notFoundOne from "../../utils/notFoundOne.js"

class OrdersManager {
    constructor(path) {
        this.path = path
        this.orders = []
        this.init()
    }

    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async create(data) {
        try {
            this.orders.push(data)
            const jsonData = JSON.stringify(this.orders, null, 2)
            await fs.promises.writeFile(this.path, jsonData)
            return data
        } catch (error) {
            throw error
        }
    }
    async read({ filter, sortAndPaginate }) {
        //no filtra ni pagina
        try {
            if (this.orders.length === 0) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                const all = await this.orders
                    .paginate(filter, sortAndPaginate)
                return all
            }
        } catch (error) {
            throw error
        }
    }
    readOne(id) {
        try {
            const one = this.orders.find(each => each.uid === id)
            if (!one) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            }
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
                one[each] = data[each];
            }
            const jsonData = JSON.stringify(this.orders, null, 2)
            fs.promises.writeFile(this.path, jsonData)
            return one
        } catch (error) {
            throw error
        }
    }
    async destroy(id) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            this.orders = this.orders.filter((each) => each._id !== id)
            const jsonData = JSON.stringify(this.orders, null, 2)
            await fs.promises.writeFile(this.path, jsonData)
            return one
        } catch (error) {
            throw error
        }
    }
}

const orders = new OrdersManager('./src/data/fs/files/ordersFs.json');
export default orders