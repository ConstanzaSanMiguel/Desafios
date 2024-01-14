import fs from "fs"
import crypto from "crypto"
import users from "../../data/fs/userFsManager.js"

class OrdersManager {
    static #orders = []
    #path

    constructor(path) {
        this.#path = path
        this.init()
    }
    init() {
        const file = fs.existsSync(this.#path);
        if (file) {
            OrdersManager.#orders = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
        } else {
            fs.writeFileSync(this.#path, JSON.stringify([], null, 2));
        }
    }
    async create(data) {
        try {
            const oid = crypto.randomBytes(9).toString("hex")
            const { uid, pid, quantity, state } = data

            const order = {
                oid,
                uid,
                pid,
                quantity,
                state: "reserved",
            }

            OrdersManager.#orders.push(order)
            await fs.promises.writeFile(
                this.#path,
                JSON.stringify(OrdersManager.#orders, null, 2)
            )

            return true
        } catch (error) {
            throw error
        }
    }
    read() {
        try {
            if (OrdersManager.#orders.length === 0) {
                const error = new Error("There are no orders!")
                error.statusCode = 400
                throw error
            } else {
                return OrdersManager.#orders
            }
        } catch (error) {
            throw error
        }
    }
    readByUser(uid) {
        try {
            const user = users.readOne(uid)
            if (typeof user === "string") {
                const error = new Error("User with id " + uid + " not found")
                error.statusCode = 400
                throw error
            }
            const searchUid = OrdersManager.#orders.filter(order => order.uid === uid)
            if (searchUid.length === 0) {
                const error = new Error("User with id " + uid + " has no orders")
                error.statusCode = 400
                throw error
            }
            return searchUid
        } catch (error) {
            throw error
        }
    }
    update(oid, quantity, state) {
        const orderIndex = OrdersManager.#orders.findIndex((each) => each.oid === oid)
        const existingOrder = OrdersManager.#orders[orderIndex]
        if (!existingOrder) {
            const error = new Error("No order found with id " + oid)
            error.statusCode = 400
            throw error
        }

        if (!["reserved", "paid", "delivered"].includes(state)) {
            const error = new Error("Invalid state. Please use 'reserved', 'paid', or 'delivered'")
            error.statusCode = 400
            throw error
        }

        const updatedOrder = {
            ...existingOrder,
            quantity: quantity !== undefined ? quantity : existingOrder.quantity,
            state: state !== undefined ? state : existingOrder.state,
        }

        OrdersManager.#orders[orderIndex] = updatedOrder
        const jsonData = JSON.stringify(OrdersManager.#orders, null, 2)
        fs.promises.writeFile(this.#path, jsonData)
        console.log("Updated order with id: " + oid)
        return updatedOrder
    }
    async destroy(oid) {
        try {
            const destroyId = OrdersManager.#orders.findIndex((each) => each.oid === oid)
            if (destroyId === -1) {
                const error = new Error("Order not found")
                error.statusCode = 400
                throw error
            } else {
                OrdersManager.#orders = OrdersManager.#orders.filter((each) => each.oid !== oid)
                const jsonData = JSON.stringify(OrdersManager.#orders, null, 2)
                await fs.promises.writeFile(this.#path, jsonData)
                return {
                    statusCode: 200,
                    response: "Deleted order with id: " + oid
                }
            }
        } catch (error) {
            throw error
        }
    }
}

const orders = new OrdersManager('./src/data/fs/files/ordersFs.json');
export default orders