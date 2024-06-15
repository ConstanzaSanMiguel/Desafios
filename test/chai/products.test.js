import { expect } from "chai"
import "dotenv/config.js"
import dao from "../../src/data/index.factory.js"
const { products } = dao

describe("Testing: Products Model", () => {
    const model = products
    const data = { price: 25, photo: "", title: "Test 2", stock: 10 }
    let id
    it("Product creation requires an object with the property price", () => {
        expect(data).to.have.property("price")
    })
    it("Product creation doesn't require an object with the property photo", () => {
        expect(data).to.have.property("photo")
    })
    it("The product creator function returns an object", async () => {
        const one = await model.create(data)
        id = one._id
        expect(one).to.be.an("object")
    })
    it("The product creator function returns an object with the property '_id'", async () => {
        const one = await model.create(data)
        id = one._id
        expect(one).to.have.property("_id")
    })
    it("The function to read products must return an object with the property 'totalDocs'", async () => {
        const filter = {}
        const sortAndPaginate = {
            page: 2,
            limit: 6,
        }
        const all = await model.read({ filter, sortAndPaginate })
        expect(all).to.have.property("totalDocs")
    })
    it("The function to read products must return an object with the property 'page'", async () => {
        const filter = {}
        const sortAndPaginate = {
            page: 3,
            limit: 6,
        }
        const all = await model.read({ filter, sortAndPaginate })
        expect(all).to.have.property("page")
    })
    it("The function to delete a product must delete it", async () => {
        const one = await model.destroy(id)
        expect(one).to.have.property("id")
    })
})
