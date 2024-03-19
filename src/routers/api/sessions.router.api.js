import CustomRouter from "../CustomRouter.js"
import { badauth, forbidden, googlecb, login, me, register, signout } from "../../controllers/sessions.controllers.js"
import has8char from "../../middlewares/has8char.mid.js"
//import isValidPass from "../../middlewares/isValidPass.mid.js"
import passport from "../../middlewares/passport.mid.js"
import passCallBack from "../../middlewares/passCallBack.js"

export default class SessionsRouter extends CustomRouter {
    init() {
        this.create("/register", ["PUBLIC"],
            has8char,
            passport.authenticate("register", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            register)

        this.create("/login", ["PUBLIC"], /*isValidPass,*/
            passport.authenticate("login", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            login)

        this.create("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }))

        this.read("/google/callback",
            passport.authenticate("google", {
                session: false,
                failureRedirect: "/api/sessions/badauth",
            }),
            googlecb)

        this.create("/", ["USER", "PREM", "ADMIN"], passCallBack("jwt"), me)

        this.create("/signout", ["USER", "PREM", "ADMIN"], signout)

        this.read("/badauth", ["PUBLIC"], badauth)

        this.read("/forbidden", ["PUBLIC"], forbidden)
    }
}

// //register
// sessionsRouter.post("/register", has8char,
//     passport.authenticate("register", {
//         session: false,
//         failureRedirect: "/api/sessions/badauth",
//     }),
//     async (req, res, next) => {
//         try {
//             return res.json({
//                 statusCode: 201,
//                 message: "User registered",
//             })
//         } catch (error) {
//             return next(error)
//         }
//     })

// //login
// sessionsRouter.post("/login", /*isValidPass,*/
//     passport.authenticate("login", {
//         session: false,
//         failureRedirect: "/api/sessions/badauth",
//     }),
//     async (req, res, next) => {
//         try {
//             return res
//                 .cookie("token", req.token, {
//                     maxAge: 7 * 24 * 60 * 60 * 1000,
//                     httpOnly: true,
//                 })
//                 .json({
//                     statusCode: 200,
//                     message: "Logged in!",
//                     /*token: req.token,*/
//                 })
//         } catch (error) {
//             return next(error)
//         }
//     }
// )

// //google
// sessionsRouter.post(
//     "/google",
//     passport.authenticate("google", { scope: ["email", "profile"] })
// )

// //google/callback
// sessionsRouter.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         session: false,
//         failureRedirect: "/api/sessions/badauth",
//     }),
//     async (req, res, next) => {
//         try {
//             return res.json({
//                 statusCode: 200,
//                 message: "Logged in with google",
//                 session: req.session,
//             })
//         } catch (error) {
//             return next(error)
//         }
//     }
// )

// //ver sesión
// sessionsRouter.post("/", passCallBack("jwt"), async (req, res, next) => {
//     try {
//         const user = {
//             email: req.user.email,
//             role: req.user.role,
//             photo: req.user.photo,
//         }
//         return res.json({
//             statusCode: 200,
//             response: user
//         })
//     } catch (error) {
//         return next(error)
//     }
// })

// //signout
// sessionsRouter.post("/signout", async (req, res, next) => {
//     try {
//         return res.clearCookie("token")
//             .redirect("/")
//             //no se muestra el json por el redirect de arriba
//             .json({
//                 statusCode: 200,
//                 message: "User signed out",
//             })
//     }
//     catch (error) {
//         return next(error)
//     }
// })

// //badauth
// sessionsRouter.get("/badauth", (req, res, next) => {
//     try {
//         return res.json({
//             statusCode: 401,
//             message: "Bad auth",
//         })
//     } catch (error) {
//         return next(error)
//     }
// })

// //forbidden
// sessionsRouter.get("/forbidden", (req, res, next) => {
//     try {
//         return res.json({
//             statusCode: 403,
//             message: "Forbidden",
//         })
//     } catch (error) {
//         return next(error)
//     }
// })