import service from "../services/ticket.service.js"

class TicketController {
    constructor() {
        this.service = service
    }
    checkout = async (req, res, next) => {
        try {
            const filter = {}
            const sortAndPaginate = {
                limit: req.query.limit || 10,
                page: req.query.page || 1,
                sort: { title: 1 },
                lean: true,
            }
            const { _id } = req.user
            if (_id) {
                filter.uid = _id
                }
            const response = await this.service.checkout({ filter, sortAndPaginate })
            return res.json(response)
        } catch (error) {
            return next(error)
        }
    }
}

export default TicketController
const controller = new TicketController()
const { checkout } = controller
export { checkout }