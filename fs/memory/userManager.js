class UserManager {
    static #users = [];

    create(data) {
        const required = ["name", "photo", "email"];
        const missing = required.filter(prop => !(prop in data));

        if (missing.length > 0) {
            console.log(`Error. Please add the following field: ${missing.join(" ")}`);
        } else {
            const id = UserManager.#users.length > 0 ? UserManager.#users[UserManager.#users.length - 1].id + 1 : 1;
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
        return UserManager.#users;
    }
    readOne(id) {
        return UserManager.#users.find((each) => each.id === id);
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
console.log(user.readOne(3));