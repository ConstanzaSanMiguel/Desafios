import ProductDTO from "../dto/product.dto.js"
import dao from "../data/index.factory.js"

const { products } = dao

class ProductsRep {
    constructor() {
        this.model = products
    }
    create = async (data) => await this.model.create(new ProductDTO(data))
    read = async ({ filter, sortAndPaginate }) => await this.model.read({ filter, sortAndPaginate })
    readOne = async (id) => await this.model.readOne(id)
    update = async (id, data) => await this.model.update(id, data)
    destroy = async (id) => await this.model.destroy(id)
}

const repository = new ProductsRep()
export default repository