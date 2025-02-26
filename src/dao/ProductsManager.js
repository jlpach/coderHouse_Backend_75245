const fs = require("fs")

class ProductsManager {
    constructor(ruta) {
        this.path = ruta
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        } else {
            return []
        }
    }

    async addProducts(products) {
        if (fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(products), null, '\t')
        } else {
            return []
        }
    }

    async updateProducts(products) {
        if (fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(products), null, '\t')
        } else {
            return []
        }
    }

    async deleteProduct(products) {
        if (fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(products), null, 2)
        } else {
            return []
        }
    }

}

module.exports = { ProductsManager }