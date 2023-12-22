import crypto from "crypto"

class UserManager {
    static #users = [];

    create(data) {
        const required = ["name", "photo", "email"];
        const missing = required.filter(prop => !(prop in data));

        if (missing.length > 0) {
            console.log(`Error. Please add the following field: ${missing.join(" ")}`);
        } else {
            const id = crypto.randomBytes(12).toString("hex")
            const user = {
                id,
                name: data.name,
                photo: data.photo,
                email: data.email,
            };
            UserManager.#users.push(user);
        }
    }
    read() {
        try {
            if (UserManager.#users.length === 0) {
                throw new Error("There are no users!")
            } else {
                return UserManager.#users;
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    readOne(id) {
        try {
            const searchId = UserManager.#users.find((each) => each.id === id)
            if (!searchId) {
                throw new Error("There are no users with id" + id)
            } else {
                console.log("read " + searchId)
                return searchId;
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
    destroy(id) {
        try {
            let destroyIndex = UserManager.#users.findIndex((each) => each.id === id);
            if (destroyIndex === -1) {
                throw new Error("Product with id '" + id + "' not found");
            } else {
                UserManager.#users.splice(destroyIndex, 1);
                console.log("Deleted product with id: " + id);
                return id;
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}

const user = new UserManager();

user.create({
    name: "Cody",
    photo: "https://i.pinimg.com/236x/91/46/e9/9146e96c19fd119f7484253d5ace7d56.jpg",
    email: "codycarson@gmail.com",
})
user.create({
    name: "King",
    email: "zerobaseone@gmail.com",
})
user.create({
    name: "Eren",
    photo: "https://i.pinimg.com/736x/fd/b7/eb/fdb7ebb22a5ad944fcb11e4922e7d95a.jpg",
    email: "erennoyumiya@gmail.com",
});
user.create({
    name: "Vernon",
    photo: "https://i.pinimg.com/564x/f6/70/70/f67070597955ca4297713c01969bd099.jpg",
    email: "theamerican@gmail.com",
})

console.log(user.read());
console.log(user.readOne("8dcf6c315f80f87b8fc940c7"));
console.log(user.destroy("d92bce1897b6a7b1fd2397b3"))