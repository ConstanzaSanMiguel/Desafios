import repository from "../repositories/users.rep.js"
import sendEmail from "../utils/sendEmail.utils.js"
import recoveryEmail from "../utils/recovery.utils.js"
import { createHash } from "../utils/hash.util.js"

class UsersService {
    constructor() {
        this.repository = repository
    }
    create = async (data) => { await this.repository.create(data) }
    read = async ({ filter, sortAndPaginate }) => await this.repository.read({ filter, sortAndPaginate })
    readOne = async (id) => await this.repository.readOne(id)
    readByEmail = async (email) => await this.repository.readByEmail(email)
    update = async (id, data) => await this.repository.update(id, data)
    destroy = async (id) => await this.repository.destroy(id)
    register = async (data) => {
        try {
            await sendEmail(data)
        } catch (error) {
            throw error
        }
    }
    recovery = async (data, token) => {
        try {
            await recoveryEmail(data, token);
        } catch (error) {
            throw error
        }
    }

    updatePassword = async (id, newPassword) => {
        const hashedPassword = createHash(newPassword)
        await this.repository.update(id, { password: hashedPassword })
    }
}

const service = new UsersService()
export default service