const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const Product = require("./models/product")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.send("API para Aurilia funconando! (Viva José José")
})

app.get("/products", async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

app.get("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
})

app.get("/products/principal", async (req, res) => {
    try {
        const principalProduct = await Product.find({ isPrincipal: true })
        res.json(principalProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error al obtener el producto principal" })}
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})