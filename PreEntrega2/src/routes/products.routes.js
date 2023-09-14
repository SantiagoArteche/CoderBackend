import { Router } from "express"
import { productModel } from "../models/products.models.js"

const productRouter = Router()

productRouter.get("/", async(request, response) => {
    const { limit, page, category, sort } = request.query

    try {
        const products = await productModel.find().limit(limit).sort()
        response.status(200).send({ res: "OK", mes: products})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.get("/:pid", async(request, response) => {
    const { pid } = request.params

    try {
        const productsById = await productModel.findById(pid)
        productsById ?  response.status(200).send({ res: "OK", message: productsById }) : response.status(404).send({ res: "Error", message: "Producto no encontrado"})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.post("/", async(request, response) => {
    const { title, description, price, thumbnail, code, stock } = request.body

    try {
        const createProduct = await productModel.create({ title, description, price, thumbnail, code, stock})
        response.status(200).send({ res: "OK", mes: createProduct})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.post("/", async(request, response) => {
    const { title, description, price, thumbnail, code, stock } = request.body

   const Allproducts = [ {
        "title": "TV",
        "description": "4K Ultra HD",
        "price": 100000,
        "thumbnail": [],
        "code": 11,
        "stock": 10
      },
      {
        "title": "Laptop",
        "description": "Intel Core i7",
        "price": 80000,
        "thumbnail": [],
        "code": 12,
        "stock": 5
      },
      {
        "title": "Celular",
        "description": "Android 12",
        "price": 50000,
        "thumbnail": [],
        "code": 13,
        "stock": 15
      },
      {
        "title": "Tablet",
        "description": "10 pulgadas",
        "price": 30000,
        "thumbnail": [],
        "code": 14,
        "stock": 20
      },
      {
        "title": "Cámara digital",
        "description": "4K",
        "price": 20000,
        "thumbnail": [],
        "code": 15,
        "stock": 10
      },
      {
        "title": "Consola de juegos",
        "description": "4K",
        "price": 15000,
        "thumbnail": [],
        "code": 16,
        "stock": 5
      },
      {
        "title": "Audífonos inalámbricos",
        "description": "Bluetooth",
        "price": 10000,
        "thumbnail": [],
        "code": 17,
        "stock": 20
      },
      {
        "title": "Reloj inteligente",
        "description": "Android",
        "price": 8000,
        "thumbnail": [],
        "code": 18,
        "stock": 15
      },
      {
        "title": "Impresora",
        "description": "Multifunción",
        "price": 5000,
        "thumbnail": [],
        "code": 19,
        "stock": 20
      },
      {
        "title": "Escáner",
        "description": "A color",
        "price": 3000,
        "thumbnail": [],
        "code": 20,
        "stock": 10
      },{
        "title": "Refrigerador",
        "description": "No frost",
        "price": 80000,
        "thumbnail": [],
        "code": 21,
        "stock": 10
      },
      {
        "title": "Lavadora",
        "description": "10kg",
        "price": 50000,
        "thumbnail": [],
        "code": 22,
        "stock": 5
      },
      {
        "title": "Cocina",
        "description": "4 hornallas",
        "price": 30000,
        "thumbnail": [],
        "code": 23,
        "stock": 20
      },
      {
        "title": "Microondas",
        "description": "220V",
        "price": 20000,
        "thumbnail": [],
        "code": 24,
        "stock": 10
      },
      {
        "title": "Tostadora",
        "description": "4 rebanadas",
        "price": 15000,
        "thumbnail": [],
        "code": 25,
        "stock": 5
      },
      {
        "title": "Extractor de jugos",
        "description": "1000W",
        "price": 10000,
        "thumbnail": [],
        "code": 26,
        "stock": 20
      },
      {
        "title": "Licuadora",
        "description": "2 velocidades",
        "price": 8000,
        "thumbnail": [],
        "code": 27,
        "stock": 15
      },
      {
        "title": "Horno eléctrico",
        "description": "20L",
        "price": 5000,
        "thumbnail": [],
        "code": 28,
        "stock": 20
      },
      {
        "title": "Ferro",
        "description": "1000W",
        "price": 3000,
        "thumbnail": [],
        "code": 29,
        "stock": 10
      },
      {
        "title": "Vacuum cleaner",
        "description": "20L",
        "price": 2000,
        "thumbnail": [],
        "code": 30,
        "stock": 5
      }]

    try {

        const read = Allproducts.forEach(el => productModel.create(el))
        await read
        response.status(200).send({ res: "OK", mes: read})
        
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.put("/:pid", async(request, response) => {
    const { pid } = request.params
    const { title, description, price, thumbnail, code, stock } = request.body

    try {
        const productByIdUpdate = await productModel.findByIdAndUpdate(pid, {title, description, price, thumbnail, code, stock})
        productByIdUpdate ? response.status(200).send({ res: "OK", message: "Producto actualizado" }) : response.status(404).send({ res: "Error actualizando el producto", message: "Product not found"})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

productRouter.delete("/:pid", async(request, response) => {
    const { pid } = request.params

    try {
        const deleteProduct = await productModel.findByIdAndDelete(pid)
        deleteProduct ? response.status(200).send({ res: "OK", message: "Producto borrado" }) : response.status(404).send({ res: "Error borrando el producto", message: "Product not found"})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})
export default productRouter