import "dotenv/config.js"
import { expect } from "chai"
import supertest from "supertest"
import dao from "../../src/data/index.factory.js"

const { users } = dao

const requester = supertest("http://localhost:" + process.env.PORT + "/api")

const model = users

describe("Testing Vibe API: Users", () => {
    const user = {
        name: "Usuario",
        email: "usuario@gmail.com",
        password: "hola1234",
        role: "admin",
        verified: true,
    }
    let uid
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
    it("Reading the registered user", async () => {
        const one = await model.readOne(uid)
        expect(one).to.have.property("_id")
    })
    it("Updating the registered user", async () => {
        const before = await model.readOne(uid)
        const one = await model.update(uid, { name: "Updating name" })
        expect(one.name).not.to.be.equals(before.name)
    })
    it("Logout", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", [token.key + "=" + token.value])
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })
    it("Deleting the user correctly", async () => {
        const response = await requester.delete("/users/" + uid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })
})
