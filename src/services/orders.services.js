import repository from "../repositories/orders.rep.js"

class OrdersService {
    constructor() {
        this.repository = repository
    }
    create = async (data) => await this.repository.create(data)
    read = async ({ filter, sortAndPaginate }) => await this.repository.read({ filter, sortAndPaginate })
    readOne = async (id) => await this.repository.readOne(id)
    report = async (id) => await this.repository.report(id)
    update = async (id, data) => await this.repository.update(id, data)
    destroy = async (id) => await this.repository.destroy(id)
}

const service = new OrdersService()
export default service