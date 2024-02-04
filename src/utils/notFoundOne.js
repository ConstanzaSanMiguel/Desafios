function notFoundOne(one) {
    if (!one) {
        const error = new Error("Nothing found!")
        error.statusCode = 404
        throw error
    }
}

export default notFoundOne