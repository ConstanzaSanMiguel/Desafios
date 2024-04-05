import crypto from "crypto"
import users from "./userManager.js"
import notFoundOne from "../../utils/notFoundOne.js"

class OrdersManager {
    static #orders = []

    async create(data) {
        try {
            const oid = crypto.randomBytes(9).toString("hex")
            const order = {
                oid,
                uid: data.uid,
                pid: data.pid,
                quantity: data.quantity,
                state: data.state || "reserved",
            }
            OrdersManager.#orders.push(order)
            return order.oid
        } catch (error) {
            return error
        }
    }
    async read({ filter, sortAndPaginate }) {
        //no filtra ni pagina todavía
        try {
            if (OrdersManager.#orders.length === 0) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                const all = await OrdersManager.#orders
                    .paginate(filter, sortAndPaginate)
                return all
            }
        } catch (error) {
            throw error
        }
    }
    readOne(id) {
        try {
            const user = users.readOne(id)
            const one = OrdersManager.#orders.find(each => each.uid === user.id)
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
    async destroy(id) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            OrdersManager.#orders = OrdersManager.#orders.filter(
                (each) => each.id !== id
            )
            return one
        } catch (error) {
            throw error
        }
    }
}

const orders = new OrdersManager()
export default orders