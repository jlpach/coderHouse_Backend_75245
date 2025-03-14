const express = require("express")
const productsRouter = require('./routes/productos.route.js')
const cartsRouter = require('./routes/carts.route.js')
const viewsRouter = require('./routes/views.router.js')
const { engine } = require("express-handlebars")

const PORT = 8080

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "../src/views")

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'Text/plain')
    res.status(200).send("Pagina principal")
})

app.listen(PORT, () => {
    console.log(`Server en linea en puerto ${PORT}`)
})

