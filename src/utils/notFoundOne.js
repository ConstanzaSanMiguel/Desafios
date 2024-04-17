import CustomError from "./errors/customError.js"

function notFoundOne(one) {
    if (!one) {
        CustomError.new(errors.notFound)
    }
}

export default notFoundOne