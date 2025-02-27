const { ProductsManager } = require('../dao/ProductsManager.js')
const { Router } = require('express')
const router = Router()

const productsManager = new ProductsManager('./src/data/products.json')

router.get('/', async (req, res) => {
    let { pid } = req.query

    if (!pid) {
        let products = await productsManager.getProducts()

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(products)
    }
})

router.get('/:pid', async (req, res) => {
    let { pid } = req.params

    let products = await productsManager.getProducts()

    if (isNaN(pid)) {
        res.send("Please enter a number")
    }

    const indexExists = products.findIndex(p => p.id == pid)

    if (indexExists == -1) {
        res.send("Por favor entra un indice existente.")
    }

    const product = products.find(p => {
        return p.id == pid
    })

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(product)
})

router.post('/', async (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.query

    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        res.setHeader('Content-Type', 'application/json')
        res.status(400).json({ error: 'Todos los campos son obligatorios, ingresa todos los valores.' })
        return
    }

    let products = await productsManager.getProducts()

    let id = 1
    if (products.length > 0) {
        id = Math.max(...products.map(p => p.id)) + 1
    }

    let newProduct = {
        id, title, description, code, price, status, stock, category, thumbnails
    }

    products.push(newProduct)
    productsManager.addProducts(products)
    res.send(newProduct)
})

router.put("/:pid", async (req, res) => {
    let { pid } = req.params
    let { title, description, code, price, status, stock, category, thumbnails } = req.body
    const products = await productsManager.getProducts()

    const updatedFields = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }

    Object.keys(updatedFields).forEach(key => {
        if (updatedFields[key] === undefined) {
            delete updatedFields[key]
        }
    })

    const productIndex = products.findIndex(p => p.id == pid)

    if (productIndex === -1) {
        return null
    }

    const updatedProduct = { ...products[productIndex], ...updatedFields }

    if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" })
    }

    products[productIndex] = updatedProduct

    await productsManager.updateProducts(products)

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(products)
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params

    let products = await productsManager.getProducts()
    const productIndex = products.findIndex(p => p.id == pid)

    if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" })
    }

    products = products.filter(p => p.id != pid)

    await productsManager.deleteProduct(products)

    res.status(200).json({ message: `Producto con id ${pid} eliminado.` })
})

module.exports = router