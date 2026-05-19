import { getAllCategories } from '../models/categories.js';

const categoriesController = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.render('categories', { title: 'Project Categories', page: 'categories', categories });
    } catch (error) {
        console.error('Error fetching categories:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    } 
};

export { categoriesController };