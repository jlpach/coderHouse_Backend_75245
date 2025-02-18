const express = require("express")
const { ProductsManager } = require("./dao/ProductsManager.js")
const productsManager = new ProductsManager("./src/data/products.json")

const PORT = 8080

const app = express()

const productsPath = "/api/products"

app.get("/", (req, res) => {
    res.send("<h1>Pagina principal</h1>")
})

app.get(productsPath, async (req, res) => {
    let { pid } = req.query
    let products = await productsManager.getProducts(pid)
    res.send(products)
})

app.post(productsPath, async (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.query
    let productAdded = await productsManager.addProducts(title, description, code, price, status, stock, category, thumbnails)
    res.send(productAdded)
})

app.listen(PORT, () => {
    console.log(`Server en linea en puerto ${PORT}`)
})

