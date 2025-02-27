const fs = require("fs")

class CartsManager {
    constructor(ruta) {
        this.path = ruta
    }

    getCarts() {
        const data = fs.readFileSync(this.path)
        return JSON.parse(data)
    }

    saveCarts(carts) {
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2))
    }

    createCart() {
        const carts = this.getCarts()
        const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1
        const newCart = {
            id: newId,
            products: []
        }
        carts.push(newCart)
        this.saveCarts(carts)
        return newCart
    }

    getCartById(id) {
        const carts = this.getCarts()
        return carts.find(cart => cart.id == id)
    }

    addProductToCart(cid, pid) {
        const carts = this.getCarts()
        const cart = carts.find(cart => cart.id == cid)

        if (!cart) {
            return null
        }

        const productInCart = cart.products.find(product => product.product == pid)

        if (productInCart) {
            productInCart.quantity += 1
        } else {
            cart.products.push({ product: pid, quantity: 1 })
        }

        this.saveCarts(carts)
        return cart
    }

}

module.exports = { CartsManager }