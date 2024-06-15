import repository from "../repositories/ticket.rep.js"

class TicketService {
    constructor() {
        this.repository = repository
    }
    checkout = async ({ filter, sortAndPaginate }) => await this.repository.checkout({ filter, sortAndPaginate })
}
const service = new TicketService()
export default service