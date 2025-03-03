const express = require("express")
const productsRouter = require('./routes/productos.route.js')
const cartsRouter = require('./routes/carts.route.js')

const PORT = 8080

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'Text/plain')
    res.status(200).send("Pagina principal")
})

app.listen(PORT, () => {
    console.log(`Server en linea en puerto ${PORT}`)
})

