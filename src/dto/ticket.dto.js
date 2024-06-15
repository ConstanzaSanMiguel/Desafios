class TicketDTO {
    constructor(data) {
        this.price_data = {
            product_data: { name: data.pid.title },
            currency: "usd",
            unit_amount: data.pid.price * 100,
        }
        this.quantity = data.quantity
    }
}

export default TicketDTO