import { expect } from "chai"
import "dotenv/config.js"
import supertest from "supertest"
import dao from "../../src/data/index.factory.js"

const { products } = dao

const requester = supertest("http://localhost:8080" /*+ process.env.PORT*/ + "/api")

const model = products

describe("Testing Vibe API: Products", () => {
    const user = {
        name: "Usuario",
        email: "usuario@gmail.com",
        password: "hola1234",
        role: "admin",
        verified: true,
    }
    const product = {
        title: "Album - K ",
        photo: "Test.com",
        price: 20,
        stock: 20,
    }
    let uid
    let pid
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
    it("Updating the created product", async () => {
        const before = await model.readOne(pid)
        const one = await model.update(pid, { title: "Updating name" })
        expect(one.title).not.to.be.equals(before.title)
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
        const response = await requester.delete(`/users/` + uid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })
})