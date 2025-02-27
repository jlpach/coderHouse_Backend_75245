const express = require("express")
/* const { ProductsManager } = require("./dao/ProductsManager.js")
const productsManager = new ProductsManager("./src/data/products.json") */
const { CartsManager } = require("./dao/CartsManager.js")
const cartsManager = new CartsManager("./src/data/carts.json")
const productsRouter = require('./routes/productos.route.js')

const PORT = 8080

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRouter)

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'Text/plain')
    res.status(200).send("Pagina principal")
})

/* app.post('/api/carts/', (req, res) => {
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
}) */

app.listen(PORT, () => {
    console.log(`Server en linea en puerto ${PORT}`)
})

