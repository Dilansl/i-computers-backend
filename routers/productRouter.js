import express from "express"
import { createProduct, deleteProduct, updateProduct, getAllProducts, getProductById } from "../contraller/productController.js"

const productRouter = express.Router()

productRouter.post("/" , createProduct)

productRouter.get("/" , getAllProducts)

productRouter.delete("/:productId" , deleteProduct)

productRouter.put("/:productId" , updateProduct)

productRouter.get("/:productId" , getProductById)

export default productRouter