const errors = {
    auth: { message: "Invalid credentials", statusCode: 401 },
    error: { message: "Error", statusCode: 400 },
    fatal: { message: "Fatal", statusCode: 500 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not Found", statusCode: 404 },
    noOrders: { message: "User has no orders", statusCode: 404 },
    register: { message: "User already exists", statusCode: 400 },
    token: { message: "Invalid token!", statusCode: 400 },
}

export default errors