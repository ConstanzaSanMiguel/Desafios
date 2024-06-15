import { Router } from "express"

import dao from "../../data/index.factory.js"
const { users } = dao

const sessionsRouter = Router()

sessionsRouter.get("/register", async (req, res, next) => {
    try {
        return res.render("register")
    } catch (error) {
        return next(error)
    }
})
sessionsRouter.get("/login", async (req, res, next) => {
    try {
        return res.render("login")
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.get("/verify", async (req, res, next) => {
    try {
        return res.render("verify")
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.get("/password", async (req, res, next) => {
    try {
        return res.render("password")
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.get("/recovery", async (req, res, next) => {
    try {
        return res.render("recovery")
    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter