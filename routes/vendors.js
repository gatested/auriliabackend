import express from 'express'
import supabase from '../supaConnect.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const { data, error } = await supabase
       .from('vendors')
       .select('*')

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})


router.get('/:id', async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
       .from('vendors')
       .select('*')
       .eq('id', id)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})
router.get('/bytagname/:username', async (req, res) => {
    const { username } = req.params
    const { data, error } = await supabase
       .from('vendors')
       .select('*')
       .eq('username', username)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})

router.get('/:id/products', async (req, res) => {
    const { id } = req.params
    const { minPrice, maxPrice, sortBy } = req.query

    let query = supabase
        .from('products')
        .select('*')
        .eq('vendor', id)
        .eq('isActive', true)


    if (minPrice) {
        query = query.gte('price', parseFloat(minPrice))
    }

    if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice))
    }

    if (sortBy) {
        // Por ejemplo: ?sortBy=price.asc o sortBy=created_at.desc
        const [column, order] = sortBy.split('.')
        if (column && order) {
            query = query.order(column, { ascending: order === 'asc' })
        }
    }

    const { data, error } = await query

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
})


export default router