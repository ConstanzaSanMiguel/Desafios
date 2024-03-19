import usersService from "../services/users.services.js"

class UsersController {
    constructor() {
        this.service = usersService
    }

    create = async (req, res, next) => {
        try {
            const data = req.body
            const response = await this.service.create(data)
            if (response) {
                return res.success201(response)
            }
        } catch (error) {
            return next(error)
        }
    }

    read = async (req, res, next) => {
        try {
            const sortAndPaginate = {
                limit: req.query.limit || 10,
                page: req.query.page || 1,
                sort: { name: 1 }
            }
            const filter = {}
            if (req.query.name) {
                filter.name = new RegExp(`^${req.query.name}$`, 'i')
            }

            const all = await this.service.read({ filter, sortAndPaginate })
            if (all) {
                return res.success200(all)
            } else {
                return res.error404()
            }
        } catch (error) {
            return next(error)
        }
    }

    readOne = async (req, res, next) => {
        try {
            const { uid } = req.params
            const one = await this.service.readOne(uid)
            if (one) {
                return res.success200(one)
            }
        } catch (error) {
            return next(error)
        }
    }

    readByEmail = async (req, res, next) => {
        try {
            const { email } = req.params
            const one = await this.service.readByEmail(email)
            if (one) {
                return res.success200(one)
            }
        } catch (error) {
            return next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const { uid } = req.params
            const data = req.body

            const response = await this.service.update(uid, data)

            if (response) {
                return res.success200(`User with id ${uid} has been updated successfully.`)
            }
        } catch (error) {
            return next(error)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { uid } = req.params
            const response = await this.service.destroy(uid)

            if (response) {
                return res.success200(`Deleted user with id ${uid} successfully.`)
            }
        } catch (error) {
            return next(error)
        }
    }
}

const controller = new UsersController()
const { create, read, readOne, readByEmail, update, destroy } = controller

export default UsersController
export { create, read, readOne, readByEmail, update, destroy }