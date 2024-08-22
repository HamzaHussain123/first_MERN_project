import express from "express"

import { getProducts, createProducts, deleteProducts, updateProduct } from "../controllers/product.controllers.js"

const router = express.Router()

/// FETCHING THE PRODUCTS


router.get("/", getProducts)


/// CREATING THE PRODUCT


router.post("/", createProducts)

/// DELETING THE PRODUCT

router.delete("/:id", deleteProducts)


/// UPDATING THE PRODUCT

router.put("/:id", updateProduct)


export default router