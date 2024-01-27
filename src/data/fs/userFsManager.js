import fs from "fs"
import crypto from "crypto"

class UserManager {
    static #users = [];

    constructor(path) {
        this.path = path;
        this.user = [];
        this.init();
    }

    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async create(data) {
        try {
            const id = crypto.randomBytes(12).toString("hex")
            const user = {
                id,
                name: data.name,
                photo: data.photo,
                email: data.email,
            }
            UserManager.#users.push(user)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(UserManager.#users, null, 2)
            )
            return true

        } catch (error) {
            throw error
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
            return error.message
        }
    }
    readOne(id) {
        try {
            const searchId = UserManager.#users.find((each) => each.id === id)
            if (!searchId) {
                const error = new Error("There are no users with id" + id)
                error.statusCode = 400
                throw error
            } else {
                console.log("read " + searchId)
                return searchId
            }
        } catch (error) {
            throw error
        }
    }
    async destroy(id) {
        try {
            const destroyId = UserManager.#users.findIndex((each) => each.id === id)
            if (destroyId === -1) {
                const error = new Error("User not found")
                error.statusCode = 400
                throw error
            } else {
                UserManager.#users = UserManager.#users.filter((each) => each.id !== id)
                const jsonData = JSON.stringify(UserManager.#users, null, 2)
                await fs.promises.writeFile(this.path, jsonData)
                console.log("Deleted user with id: " + id)
                return {
                    statusCode: 200,
                    response: id,
                }
            }
        } catch (error) {
            throw error
        }
    }
    update(id, data) {
        const userIndex = UserManager.#users.findIndex((each) => each.id === id)

        if (userIndex === -1) {
            const error = new Error("User " + id + " not found.")
            error.statusCode = 400
            throw error
        }
        const updatedUser = {
            ...UserManager.#users[userIndex],
            ...data,
            id: id,
        };

        UserManager.#users[userIndex] = updatedUser

        const jsonData = JSON.stringify(UserManager.#users, null, 2)
        fs.promises.writeFile(this.path, jsonData)

        console.log("Updated user with id: " + id)
        return updatedUser
    }
}

const users = new UserManager('./src/data/fs/files/usersFs.json');
export default users