import { faker } from '@faker-js/faker'
import repository from "../../repositories/products.rep.js"
import winstonLogger from '../../utils/logger/index.js'

function productsMock() {
    return {
        title: faker.music.songName(),
        photo: faker.image.url(),
        price: faker.commerce.price({ max: 50, min: 1 }),
        stock: faker.number.int({ max: 50, min: 1 }),
    }
}

export const createMock = async () => {
    try {
        const data = productsMock()
        await repository.create(data)
        winstonLogger.INFO("Mock product created.")
    } catch (error) {
        winstonLogger.WARN(error.message)
    }
}

for (let i = 1; i <= 100; i++) {
    createMock()
}


winstonLogger.INFO("Mock ended")