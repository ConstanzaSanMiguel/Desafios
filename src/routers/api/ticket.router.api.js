import CustomRouter from "../CustomRouter.js"
import { checkout } from "../../controllers/ticket.controller.js"

export default class TicketRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER", "PREM"], checkout)
    }
}