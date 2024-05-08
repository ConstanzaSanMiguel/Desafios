import crypto from "crypto"
import notFoundOne from "../../utils/notFoundOne.js"
import CustomError from "../../utils/errors/customError.js";
import winstonLogger from "../../utils/logger/index.js";

class UserManager {
    static #users = [];

    create(data) {
        try {
            const required = ["name", "photo", "email"];
            const missing = required.filter(prop => !(prop in data));

            if (missing.length > 0) {
                winstonLogger.WARN(`Error. Please add the following field: ${missing.join(" ")}`);
            } else {
                const id = crypto.randomBytes(12).toString("hex")
                const user = {
                    id,
                    name: data.name,
                    photo: data.photo,
                    email: data.email,
                }
                UserManager.#users.push(user)
                return user.id
            }
        } catch (error) {
            return error.message
        }
    }
    async read({ filter, sortAndPaginate }) {
        //no filtra ni pagina todavía
        try {
            if (UserManager.#users.length === 0) {
                CustomError.new(errors.notFound)
            } else {
                const all = await UserManager.#users
                    .paginate(filter, sortAndPaginate)
                return all
            }
        } catch (error) {
            throw error
        }
    }
    readOne(id) {
        try {
            const one = UserManager.#users.find((each) => each.id === parseInt(id))
            if (!one) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                return one
            }
        } catch (error) {
            throw error
        }
    }
    destroy(id) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            UserManager.#users = UserManager.#users.filter(
                (each) => each.id !== id
            )
            return one
        } catch (error) {
            throw error
        }
    }
    update(id, data) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            for (let each in data) {
                one[each] = data[each]
            }
            return one
        } catch (error) {
            throw error
        }
    }
    readByEmail(email) {
        try {
            const one = UserManager.#users.find((each) => each.email === email)
            if (!one) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                return one
            }
        } catch (error) {
            throw error
        }
    }
}

const users = new UserManager();
export default users