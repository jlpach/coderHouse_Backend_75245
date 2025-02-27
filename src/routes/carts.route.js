const { CartsManager } = require('../dao/CartsManager.js')
const cartsManager = new CartsManager('./src/data/carts.json')
const { Router } = require('express')
const router = new Router()

router.post('/api/carts/', (req, res) => {
    const newCart = cartsManager.createCart()
    res.status(201).json(newCart)
})

app.get('/api/carts/:cid', (req, res) => {
    const { cid } = req.params
    const cart = cartsManager.getCartById(cid)

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" })
    }

    res.json(cart)
})

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params

    const cart = cartsManager.addProductToCart(cid, pid)

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" })
    }

    res.json(cart)
})