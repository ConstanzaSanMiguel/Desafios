import CustomRouter from "../CustomRouter.js"
//import products from "../../data/fs/productFsManager.js"
import { products } from "../../data/mongo/manager.mongo.js"
//import propsProducts from "../../middlewares/propsProducts.js"
//import isStockOkUtils from "../../utils/isStockOk.utils.js"
import isAdmin from "../../middlewares/isAdmin.js"
//import isAuth from "../../middlewares/isAuth.js"
import passCallBack from "../../middlewares/passCallBack.js"

export default class ProductsRouter extends CustomRouter {
    init() {
        this.create('/', ["ADMIN", "PREM"],
            passCallBack("jwt"),
            /*isAuth,*/ isAdmin, /*propsProducts,*/
            async (req, res, next) => {
                try {
                    const data = req.body
                    const response = await products.create(data)
                    if (response) {
                        return res.success201(response)
                    }
                } catch (error) {
                    return next(error)
                }
            })

        this.read('/', ["PUBLIC"], async (req, res, next) => {
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

                const all = await products.read({ filter, sortAndPaginate })
                if (all) {
                    return res.success200(all)
                } else {
                    return res.error404()
                }
            } catch (error) {
                return next(error)
            }
        })

        this.read('/:pid', ["PUBLIC"], async (req, res, next) => {
            try {
                const { pid } = req.params
                const one = await products.readOne(pid)
                if (one) {
                    return res.success200(one)
                }
            } catch (error) {
                return next(error)
            }
        })

        this.update('/:pid', ["ADMIN", "PREM"], /*isAdmin, isStockOkUtils,*/ async (req, res, next) => {
            try {
                const { pid } = req.params
                const data = req.body

                const response = await products.update(pid, data)

                if (response instanceof Error) {
                    return res.error400()
                } else {
                    return res.success200(response)
                }
            } catch (error) {
                return next(error)
            }
        })

        this.destroy('/:pid', ["ADMIN", "PREM"], /*isAdmin,*/ async (req, res, next) => {
            try {
                const { pid } = req.params
                const response = await products.destroy(pid)

                if (response) {
                    return res.success200(response)
                }
            } catch (error) {
                return next(error)
            }
        })
    }
}