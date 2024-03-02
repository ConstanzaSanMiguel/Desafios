import { Router } from "express"
import { orders, users } from "../../data/mongo/manager.mongo.js"
import passCallBack from "../../middlewares/passCallBack.js"

const ordersRouter = Router()

// En tu controlador de ruta para /orders
ordersRouter.get("/", passCallBack("jwt"), async (req, res, next) => {
    try {
        const options = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
            sort: { title: 1 },
            lean: true,
        }
        const user = await users.readByEmail(req.user.email)
        const filter = {
            uid: user._id,
        }
        const all = await orders.read({ filter, options })
        return res.render("orders", { title: "MY CART", orders: all.docs })
    } catch (error) {
        return res.render("orders", {
            title: "MY CART",
            message: "NO ORDERS YET!",
        })
    }
})

export default ordersRouter