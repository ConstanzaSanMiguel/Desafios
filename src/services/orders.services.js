import { orders } from "../data/mongo/manager.mongo.js"

class OrdersService {
    constructor() {
        this.model = orders
    }
    create = async (data) => await this.model.create(data)
    read = async ({ filter, sortAndPaginate }) => await this.model.read({ filter, sortAndPaginate })
    readOne = async(id) => await this.model.readOne(id)
    report = async (id) => await this.model.report(id)
    update = async (id, data) => await this.model.update(id, data)
    destroy = async (id) => await this.model.destroy(id)
}

const ordersService = new OrdersService()
export default ordersService