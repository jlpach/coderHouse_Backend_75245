const express = require("express")
const { ProductsManager } = require("./dao/ProductsManager.js")
const productsManager = new ProductsManager("./src/data/products.json")

const PORT = 8080

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsPath = "/api/products"

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'Text/plain')
    res.status(200).send("Pagina principal")
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

app.put("/api/products/:pid", async (req, res) => {
    let { pid } = req.params
    let { title, description, code, price, status, stock, category, thumbnails } = req.body

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

    const updatedProduct = await productsManager.updateProducts(pid, updatedFields)

    if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" })
    }

    res.json(updatedProduct)
})

app.delete('/api/products/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await productsManager.deleteProduct(pid)

    if (!result) {
        return res.status(404).json({ error: "Producto no encontrado" })
    }

    res.json(result)
})

app.listen(PORT, () => {
    console.log(`Server en linea en puerto ${PORT}`)
})

