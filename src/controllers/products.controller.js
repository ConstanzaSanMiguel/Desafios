import productsService from '../services/products.services.js'

class ProductsController {
    constructor() {
        this.service = productsService
    }

    create = async (req, res, next) => {
        try {
            const data = req.body
            const response = await this.service.create(data)
            if (response) {
                return res.success201("Product with id " + response + " created")
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
                sort: { title: 1 }
            }
            const filter = {}
            if (req.query.title) {
                filter.title = new RegExp(req.query.title.trim(), 'i')
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
            const { pid } = req.params
            const one = await this.service.readOne(pid)
            if (one) {
                return res.success200(one)
            }
        } catch (error) {
            return next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const { pid } = req.params
            const data = req.body

            const response = await this.service.update(pid, data)

            if (response instanceof Error) {
                return res.error400()
            } else {
                return res.success200(response)
            }
        } catch (error) {
            return next(error)
        }
    }

    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params
            const response = await this.service.destroy(pid)

            if (response) {
                return res.success200("Product " + response.title + " with id " + response._id + " deleted")
            }
        } catch (error) {
            return next(error)
        }
    }
}

const controller = new ProductsController()
const { create, read, readOne, update, destroy } = controller

export default ProductsController
export { create, read, readOne, update, destroy }