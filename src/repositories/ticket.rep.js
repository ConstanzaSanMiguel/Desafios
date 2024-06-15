import Stripe from "stripe"
import dao from "../data/index.factory.js"
import TicketDTO from "../dto/ticket.dto.js"
import env from "../utils/env.utils.js"

const { orders } = dao
const stripe = new Stripe(env.STRIPE_SECRET_KEY)

class TicketRep {
    constructor() {
        this.model = orders
    }
    read = async ({ filter, sortAndPaginate }) => await this.model.read({ filter, sortAndPaginate })
    checkout = async ({ filter, sortAndPaginate }) => {
        const cart = await orders.read({ filter, sortAndPaginate })
        let productsOnCart = cart.docs
        productsOnCart = productsOnCart.map((each) => new TicketDTO(each))
        const line_items = productsOnCart
        const mode = "payment"
        const success_url = "http://localhost:8080/thanks"
        const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url,
        })
        return intent
    }
}
const repository = new TicketRep()
export default repository