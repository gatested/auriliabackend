import express from 'express'
import supabase from '../supaConnect.js'

const router = express.Router()

router.get('/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('isActive', true)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)  
})
router.get('/products/isprincipal', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('isPrincipal', true)
        .eq('isActive', true)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)  
})
router.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
       .from('products')
       .select('*')
       .eq('id', id)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})

export default router