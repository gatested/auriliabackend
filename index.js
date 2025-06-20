import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
import products from './routes/products.js'
import users from './routes/users.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/products', products)
app.use('/users/', users)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))