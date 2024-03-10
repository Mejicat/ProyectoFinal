import { Router } from "express"
import ProductManager from "../components/ProductManager.js"

const productRouter = Router ()

const productsFinal = new ProductManager()

productRouter.get ("/", async (req, res) => {
    let limit = parseInt(req.query.limit)
    if (!limit) return res.send (await productsFinal.readProducts())
    let allProducts = await productsFinal.readProducts()
    let productLimit = allProducts.slice (0,limit)
    res.send (productLimit)
})

productRouter.get ("/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await productsFinal.readProducts()
    let productById = allProducts.find (product => product.id === id)
    res.send (productById)
})

productRouter.post("/", async (req,res) => {
    let newProduct = req.body
    res.send (await productsFinal.addProduct (newProduct))
})

productRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProducts = req.body
    res.send (await productsFinal.updateProducts(id,updateProducts))
})

productRouter.delete ("/:id", async (req, res) => {
    let id = req.params.id
    res.send (await productsFinal.deleteProductsById(id))
})

export default productRouter