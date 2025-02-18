const fs = require("fs")

class ProductsManager {
    constructor(ruta) {
        this.path = ruta
    }

    async getProducts(pid) {
        const products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

        if (fs.existsSync(this.path)) {
            if (!pid) {
                return products
            } else {
                if (isNaN(pid)) {
                    return "Please enter a number"
                }

                const indexExists = products.findIndex(p => p.id == pid)

                if (indexExists == -1) {
                    return "Por favor entra un indice existente."
                }

                const product = products.find(p => {
                    return p.id == pid
                })

                return product
            }

        } else {
            return []
        }
    }

    async addProducts(title, description, code, price, status, stock, category, thumbnails) {
        let products = await this.getProducts()

        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map(p => p.id)) + 1
        }

        let newProduct = {
            id, title, description, code, price, status, stock, category, thumbnails
        }

        products.push(newProduct)
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
        return newProduct
    }
}

module.exports = { ProductsManager }