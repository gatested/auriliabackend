import express from 'express'
import supabase from '../supaConnect.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const {
        q,                 // texto a buscar en nombre o descripción
        min_price,         // precio mínimo
        max_price,         // precio máximo
        sort_by = 'name',  // campo para ordenar
        order = 'desc',    // dirección (asc o desc)
        limit = 50,        // número máximo de resultados
        vendor_id          // ID específico del vendedor
    } = req.query;

    let query = supabase
        .from('products')
        .select('*, vendors(*)')
        .eq('isActive', true);

    // Búsqueda avanzada por texto
    if (q) {
        query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
    }

    // Filtrar por ID de vendor si está presente
    if (vendor_id) {
        query = query.eq('vendor', vendor_id);
    }

    // Filtrar por precio mínimo y/o máximo
    if (min_price) query = query.gte('price', parseFloat(min_price));
    if (max_price) query = query.lte('price', parseFloat(max_price));

    // Ordenamiento
    query = query.order(sort_by, { ascending: order === 'asc' });

    // Límite de resultados
    query = query.limit(parseInt(limit));

    // Ejecutar la consulta
    const { data, error } = await query;

    if (error) return res.status(400).json({ error: error.message });

    // Reorganizar vendor_info
    const result = data.map(product => ({
        ...product,
        vendor_info: product.vendors,
        vendors: undefined // quitar si no quieres mostrar el objeto original
    }));

    res.status(200).json(result);
});



router.get('/products/isprincipal', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, vendors(*)') // JOIN a users y solo trae username
        .eq('isPrincipal', true)
        .eq('isActive', true)



    if (error) return res.status(400).json({ error: error.message })

    const result = data.map(product => ({
    ...product,
    vendor_info: product.vendors,
    vendors: undefined // opcional: eliminar el campo anterior
    }));

    res.status(200).json(result)
})


router.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from('products')
        .select('*, vendors(*)') // JOIN a users
        .eq('id', id)
        .eq('isActive', true)

    if (error) return res.status(400).json({ error: error.message })

    const result = data.map(product => ({
    ...product,
    vendor_info: product.vendors,
    vendors: undefined // opcional: eliminar el campo anterior
    }));

    res.status(200).json(result)
})


export default router