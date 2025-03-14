const { Router } = require("express")
const { ProductsManager } = require("../dao/ProductsManager.js")
const router = Router()

const productsManager = new ProductsManager("./src/data/products.json");

router.get("/", async (req, res) => {
    let productos = await productsManager.getProducts()
    let producto = productos[2]
    res.render("realtimeproducts", { titulo: producto.title })
})

module.exports = router