import fs from "fs"
import notFoundOne from "../../utils/notFoundOne.js"

class UserManager {

    constructor(path) {
        this.path = path;
        this.user = [];
        this.init();
    }

    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            this.user = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async create(data) {
        try {
            this.user.push(data)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.user, null, 2)
            )
            return data
        } catch (error) {
            throw error
        }
    }
    async read({ filter, sortAndPaginate }) {
        //no filtra ni pagina
        try {
            if (this.user.length === 0) {
                const error = new Error("Nothing found!")
                error.statusCode = 404
                throw error
            } else {
                const all = await this.user
                    .paginate(filter, sortAndPaginate)
                return all
            }
        } catch (error) {
            return error.message
        }
    }
    readOne(id) {
        try {
            const one = this.user.find((each) => each.id === id)
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
    async destroy(id) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            this.user = this.user.filter((each) => each._id !== id)
            const jsonData = JSON.stringify(this.user, null, 2)
            await fs.promises.writeFile(this.path, jsonData)
            return one
        } catch (error) {
            throw error
        }
    }
    async update(id, data) {
        try {
            const one = this.readOne(id)
            notFoundOne(one)
            for (let each in data) {
                one[each] = data[each]
            }
            const jsonData = JSON.stringify(this.user, null, 2)
            await fs.promises.writeFile(this.path, jsonData)
            return one
        } catch (error) {
            throw error
        }
    }
    readByEmail(email) {
        try {
            const one = this.user.find((each) => each.email === email)
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

const users = new UserManager('./src/data/fs/files/usersFs.json');
export default users