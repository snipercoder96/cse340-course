import { getAllCategories, getSingleCategory, assignCategoryToProject, updateCategoryAssignments, getCategoriesByServiceProjectId } from '../models/categories.js';
import { getProjectDetails,  } from '../models/projects.js';


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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, page: 'assign-categories', projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { categoriesController, showSingleCategory, showAssignCategoriesForm, processAssignCategoriesForm };