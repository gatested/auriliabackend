import express from 'express'
import supabase from '../supaConnect.js'

const router = express.Router()

router.get('/all/', async (req, res) => {
    const { data, error } = await supabase
       .from('users')
       .select('*')

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})


router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
       .from('users')
       .select('*')
       .eq('id', id)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})
router.get('/user/byusername/:username', async (req, res) => {
    const { username } = req.params
    const { data, error } = await supabase
       .from('users')
       .select('*')
       .eq('username', username)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})

router.get('/user/:id/products', async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
       .from('products')
       .select('*')
       .eq('vendor', id)
       .eq('isActive', true)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})

export default router