const fs = require("fs")

class CartsManager {
    constructor(ruta) {
        this.path = ruta
    }

    async getCarts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        } else {
            return []
        }
    }

    saveCarts(carts) {
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2))
    }

    createCart(carts) {
        this.saveCarts(carts)
    }

    getCartById(cid, carts) {
        const cart = carts.find(cart => cart.id == cid)
        return cart
    }

    addProductToCart(carts) {
        this.saveCarts(carts)
    }

}

module.exports = { CartsManager }