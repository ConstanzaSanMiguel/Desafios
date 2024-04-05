import CustomRouter from "../CustomRouter.js"
import passCallBack from "../../middlewares/passCallBack.js"
import { create, destroy, read, readOne, update } from "../../controllers/products.controller.js"

export default class ProductsRouter extends CustomRouter {
    init() {
        this.create('/', ["ADMIN"], passCallBack("jwt"), create)

        this.read('/', ["PUBLIC"], read)

        this.read('/:pid', ["PUBLIC"], readOne)

        this.update('/:pid', ["ADMIN"], update)

        this.destroy('/:pid', ["ADMIN"], destroy)
    }
}