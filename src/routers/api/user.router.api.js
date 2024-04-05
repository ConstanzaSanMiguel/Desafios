import CustomRouter from "../CustomRouter.js"
import { create, destroy, read, readByEmail, readOne, update } from "../../controllers/users.controllers.js"
import has8char from "../../middlewares/has8char.mid.js"

export default class UsersRouter extends CustomRouter {
    init() {
        this.create('/', ["PUBLIC"], has8char, create)

        this.read('/', ["ADMIN"], read)

        this.read('/:uid', ["USER", "PREM", "ADMIN"], readOne)

        this.read('/email/:email', ["ADMIN"], readByEmail)

        this.update('/:uid', ["USER", "PREM"], update)

        this.destroy('/:uid', ["USER", "PREM", "ADMIN"], destroy)
    }
}