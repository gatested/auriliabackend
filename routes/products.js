import express from 'express'
import supabase from '../supaConnect.js'

const router = express.Router()

router.get('/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)  
})

export default router