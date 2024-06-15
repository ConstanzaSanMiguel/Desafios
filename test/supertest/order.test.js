import "dotenv/config.js"
import { expect } from "chai"
import supertest from "supertest"
import dao from "../../src/data/index.factory.js"

const { orders, products } = dao

const requester = supertest("http://localhost:8080" /*+ process.env.PORT*/ + "/api")

const model = products
const newOrders = orders

describe("Testing Orders", () => {
    const user = {
        name: "Usuario",
        email: "usuario@gmail.com",
        password: "hola1234",
        role: "admin",
        verified: true,
    }
    const product = {
        title: "Album - K",
        photo: "Test.com",
        price: 20,
        stock: 20,
    }
    let uid
    let pid
    let order = {}
    let token = {}
    it("User registration", async function () {
        this.timeout(10000)
        const response = await requester.post("/sessions/register").send(user)
        const { _body } = response
        expect(_body.statusCode).to.be.equals(200)
    })
    it("Login", async function () {
        this.timeout(5000)
        const response = await requester.post("/sessions/login").send(user)
        const { _body, headers } = response
        token.key = headers["set-cookie"][0].split("=")[0]
        token.value = headers["set-cookie"][0].split("=")[1]
        uid = _body.response.user._id
        expect(_body.response.user).to.has.property("_id")
    })
    it("Product creation", async () => {
        const one = await model.create(product)
        pid = one._id
        expect(one).to.have.property("_id")
    })
    it("Reading the created product", async () => {
        const one = await model.readOne(pid)
        expect(one).to.have.property("_id")
    })
    it("Order creation", async () => {
        const data = {
            uid: uid,
            pid: pid,
            quantity: 2,
        }
        const one = await newOrders.create(data)
        order = one
        expect(one).to.have.property("_id")
    })
    it("Deleting the created order", async () => {
        const one = await newOrders.destroy(order._id)
        expect(one).to.have.property("_id")
    })
    it("Deleting the created product", async () => {
        const one = await model.destroy(pid)
        expect(one).to.have.property("_id")
    })
    it("Logout", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", [
            token.key + "=" + token.value,
        ])
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })
    it("Deleting the user created", async () => {
        const response = await requester.delete("/users/" + uid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })
})
