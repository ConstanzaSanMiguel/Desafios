//import crypto from "crypto";
import users from "../../data/fs/userFsManager.js";

class OrdersManager {
    static #orders = [];

    async create(data) {
        try {
            //const oid = crypto.randomBytes(9).toString("hex")
            const oid = OrdersManager.#orders.length === 0
                ? 1
                : OrdersManager.#orders[OrdersManager.#orders.length - 1].oid + 1
            const { uid, pid, quantity, state } = data

            const order = {
                oid,
                uid,
                pid,
                quantity,
                state: "reserved",
            };

            OrdersManager.#orders.push(order)
            return true;
        } catch (error) {
            return error
        }
    }
    async read({ filter, sortAndPaginate }) {
        try {
            if (OrdersManager.#orders.length === 0) {
                const error = new Error("There are no orders!")
                error.statusCode = 400
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
    readOne(uid) {
        try {
            const user = users.readOne(uid)
            if (typeof user === "string") {
                throw new Error("User with id " + uid + " not found")
            }
            const searchUid = OrdersManager.#orders.filter(order => order.uid === user.uid)
            if (searchUid.length === 0) {
                throw new Error("User with id " + uid + " has no orders")
            }
            console.log("User orders: " + searchUid)
            return searchUid
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    update(oid, quantity, state) {
        try {
            // Convierto el id a número para comprobación
            const userOid = parseInt(oid)
            const orderIndex = OrdersManager.#orders.findIndex((each) => each.oid === userOid)
            const existingOrder = OrdersManager.#orders[orderIndex]
            if (!existingOrder) {
                const error = new Error("No se encontró la orden con ID " + oid)
                error.statusCode = 400
                throw error
            }
            const updatedOrder = {
                ...existingOrder,
                quantity: quantity !== undefined ? quantity : existingOrder.quantity,
                state: state !== undefined ? state : existingOrder.state,
            };

            OrdersManager.#orders[orderIndex] = updatedOrder

            console.log("Orden actualizada con ID: " + oid)
            return updatedOrder
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    async destroy(oid) {
        try {
            const destroyId = OrdersManager.#orders.findIndex((each) => each.oid === parseInt(oid))
            if (destroyId === -1) {
                throw new Error("Order not found")
            } else {
                OrdersManager.#orders = OrdersManager.#orders.filter((each) => each.oid !== parseInt(oid))
                console.log("Deleted product with id: " + oid)
                return oid
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
}

const orders = new OrdersManager()
export default orders

orders.create({
    uid: "84dbb7503b0f7cd7b71a2fbb",
    pid: "3159b186cdcc6061a481c52b",
    quantity: 4,
    state: "reserved"
})

orders.create({
    uid: "8dcf6c315f80f87b8fc940c7",
    pid: "f3894911d6335c61f20c78c5",
    quantity: 20,
    state: "reserved"
})

orders.create({
    uid: "333f6c315f80f87b8fc940c9",
    pid: "f3894911d6335c61f20c78c5",
    quantity: 14,
    state: "reserved"
})

console.log(orders.read())
console.log(orders.readByUser("3"))
console.log(orders.destroy("2"))
console.log(orders.update("1", 10, "paid"))