import { Router } from "express"
//import users from "../../data/fs/userFsManager.js"
import { users } from "../../data/mongo/manager.mongo.js"
//import propsUsers from "../../middlewares/propsUsers.js"

const usersRouter = Router()

usersRouter.post('/', /*propsUsers,*/ async (req, res, next) => {
    try {
        const data = req.body
        const response = await users.create(data)
        if (response) {
            return res.json({
                statusCode: 201,
                response: `User added successfully.`,
            })
        }
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/", async (req, res, next) => {
    try {
        const userArray = await users.read({})
        if (Array.isArray(userArray)) {
            return res.json({
                statusCode: 200,
                response: userArray,
            })
        } else {
            return res.json({
                statusCode: 404,
                response: "not found!",
            })
        }
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        const one = await users.readOne(uid)
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            })
        }
    } catch (error) {
        return next(error)
    }
})

usersRouter.put('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params
        const data = req.body

        const response = await users.update(uid, data)

        if (response) {
            return res.json({
                statusCode: 200,
                response: `User with id ${uid} has been updated successfully.`
            })
        }
    } catch (error) {
        return next(error)
    }
})

usersRouter.delete('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params
        const response = await users.destroy(uid)

        if (response) {
            return res.json({
                statusCode: 200,
                response: `Deleted product with id ${uid} successfully.`
            })
        } 
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/email/:email", async (req, res, next) => {
    try {
        const { email } = req.params
        const one = await users.readByEmail(email)
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            })
        }
    } catch (error) {
        return next(error)
    }
})

export default usersRouter