import { getAllCategories, getSingleCategory } from '../models/categories.js';


const categoriesController = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.render('categories', { title: 'Project Categories', page: 'categories', categories });
    } catch (error) {
        console.error('Error fetching categories:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    } 
};

const showSingleCategory = async (req, res) => {
    try {
        const categoryId = parseInt(req.params.id);
        if (isNaN(categoryId)) {
            return res.status(400).send('Invalid category ID'); 
        }

        const category = await getSingleCategory(categoryId);
        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.render('category', { title: category.name, page: 'category', category }); 
        
    } catch (error) {
        console.error('Error fetching category:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

export { categoriesController, showSingleCategory };