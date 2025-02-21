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

    async updateProducts(id, updatedFields) {
        const products = await this.getProducts()
        const productIndex = products.findIndex(p => p.id == id)

        if (productIndex === -1) {
            return null
        }

        const updatedProduct = { ...products[productIndex], ...updatedFields }
        products[productIndex] = updatedProduct
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))

        return products[productIndex]
    }

    async deleteProduct(id) {
        let products = await this.getProducts()
        const productIndex = products.findIndex(p => p.id == id)

        if (productIndex === -1) {
            return null
        }

        products = products.filter(p => p.id != id)
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
        return { message: `Producto con id ${id} eliminado.` }
    }

}

module.exports = { ProductsManager }