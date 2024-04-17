import { faker } from '@faker-js/faker'
import repository from "../../repositories/products.rep.js"

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
        console.log("Mock product created.")
    } catch (error) {
        console.log(error.message)
    }
}

for (let i = 1; i <= 100; i++) {
    createMock()
}


console.log("Mock ended")