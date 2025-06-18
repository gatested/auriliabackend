import express from 'express'
import supabase from '../supaConnect.js'

const router = express.Router()

router.get('/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, users(*)')
        .eq('isActive', true)



    if (error) return res.status(400).json({ error: error.message })

    const result = data.map(product => ({
    ...product,
    vendor_info: product.users,
    users: undefined // opcional: eliminar el campo anterior
    }));


    res.status(200).json(result)  
})

router.get('/products/isprincipal', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, users(*)') // JOIN a users y solo trae username
        .eq('isPrincipal', true)
        .eq('isActive', true)



    if (error) return res.status(400).json({ error: error.message })

    const result = data.map(product => ({
    ...product,
    vendor_info: product.users,
    users: undefined // opcional: eliminar el campo anterior
    }));

    res.status(200).json(result)
})


router.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from('products')
        .select('*, users(*)') // JOIN a users
        .eq('id', id)
        .eq('isActive', true)

    if (error) return res.status(400).json({ error: error.message })

    const result = data.map(product => ({
    ...product,
    vendor_info: product.users,
    users: undefined // opcional: eliminar el campo anterior
    }));

    res.status(200).json(result)
})


export default router