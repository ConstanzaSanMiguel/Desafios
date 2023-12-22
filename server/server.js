import express from "express"
import user from "./data/fs/userFsManager.js"
import product from "./data/fs/productFsManager.js"

const server = express()

const PORT = 8080
const ready = console.log("Server ready on port " + PORT)

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.listen(PORT, ready)

server.get("/api/products", async (req, res) => {
    try {
        const productArray = await product.read();
        if (Array.isArray(productArray)) {
            return res.json({
                success: true,
                response: productArray,
            });
        } else {
            return res.json({
                statusCode: 404,
                success: false,
                message: "not found!",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
})

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const object = await product.readOne(pid);
        if (typeof object === "string") {
            return res.json({
                statusCode: 404,
                success: false,
                message: "not found!",
            });
        } else {
            return res.json({
                success: true,
                response: object,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
})

server.get("/api/users", async (req, res) => {
    try {
        const userArray = await user.read();
        if (Array.isArray(userArray)) {
            return res.json({
                success: true,
                response: userArray,
            });
        } else {
            return res.json({
                statusCode: 404,
                success: false,
                message: "not found!",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
})

server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const object = await user.readOne(uid);
        if (typeof object === "string") {
            return res.json({
                statusCode: 404,
                success: false,
                message: "not found!",
            });
        } else {
            return res.json({
                success: true,
                response: object,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
})