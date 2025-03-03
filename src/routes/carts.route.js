const { CartsManager } = require('../dao/CartsManager.js')
const cartsManager = new CartsManager('./src/data/carts.json')
const { Router } = require('express')
const router = Router()

router.post('/', async (req, res) => {
    const carts = await cartsManager.getCarts()
    const maxId = carts.length > 0 ? Math.max(...carts.map(cart => cart.id)) : 0
    const newId = maxId + 1

    const newCart = {
        id: newId,
        products: []
    }

    carts.push(newCart)
    cartsManager.createCart(carts)

    res.setHeader('Content-Type', 'application/json')
    res.status(201).json(newCart)
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params

    const carts = await cartsManager.getCarts()
    const cart = await cartsManager.getCartById(cid, carts)

    if (!cart) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(404).json({ error: "Carrito no encontrado" })
    }

    res.setHeader('Content-Type', 'application/json')
    res.json(cart)
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params

    const carts = await cartsManager.getCarts()
    const cart = carts.find(cart => cart.id == cid)

    if (!cart) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(404).json({ error: "Carrito no encontrado" })
    }

    const productInCart = cart.products.find(product => product.product == pid)

    if (productInCart) {
        productInCart.quantity += 1
    } else {
        cart.products.push({ product: pid, quantity: 1 })
    }

    cartsManager.addProductToCart(carts)

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(cart)
})

module.exports = router