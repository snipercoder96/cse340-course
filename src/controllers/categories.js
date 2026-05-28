import { getAllCategories, getSingleCategory, assignCategoryToProject, updateCategoryAssignments, getCategoriesByServiceProjectId, insertNewCategory, editExistingCategory } from '../models/categories.js';
import { getProjectDetails, } from '../models/projects.js';
import flash from '../middleware/flash.js';
import { body, validationResult } from 'express-validator';


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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const projectId = req.params.projectId;
        const projectDetails = await getProjectDetails(projectId);
        const categories = await getAllCategories();
        const assignedCategories = await getCategoriesByServiceProjectId(projectId);
        const title = 'Assign Categories to Project';
        res.render('assign-categories', { title, page: 'assign-categories', projectId, projectDetails, categories, assignedCategories, errors: errors.array() });
        return;
    }

    try{
        const projectId = req.params.projectId;
        const selectedCategoryIds = req.body.categoryIds || [];

        // Ensure selectedCategoryIds is an array
        const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
        await updateCategoryAssignments(projectId, categoryIdsArray);
        req.flash('success', 'Categories updated successfully.');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating category assignments:', error.stack || error);
        req.flash('error', 'Failed to update category assignments. Please try again.');
        res.redirect(`/assign-categories/${req.params.projectId}`);
    }
    
};

const validateAssignCategoriesForm = [
    body('categoryIds')
        .isArray({ min: 1 })
        .withMessage('At least one category must be selected')
];

const showAddCategoryForm = async (req, res) => {
    const title = 'Add New Category';
    const category = {}
    res.render('new-category', { title, page: 'add-category', category });
};

const newCategoryValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Category name is required')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage('Category description must be less than 255 characters'),
    body('logoFilename')
        .optional()
        .trim()
];

const processAddCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const title = 'Add New Category';
        const category = req.body; 
        res.render('new-category', { title, page: 'add-category', category, errors: errors.array() });
        return;
    }

    try {
        const { name, description, logoFilename } = req.body;
        const logoFilenameValue = logoFilename === '' ? null : logoFilename;
        await insertNewCategory(name, description, logoFilenameValue); 
        req.flash('success', 'Category added successfully.');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error adding category:', error.stack || error);
        req.flash('error', 'Failed to add category. Please try again.');
        res.redirect('/new-category'); 
    }
};

const showEditCategoryForm = async (req, res) => {
    // Implementation for showing the edit category form would go here
    const categoryId = parseInt(req.params.id); // get the id from the browser that it points to
    if (isNaN(categoryId)) {
        return res.status(400).send('Invalid category ID');
    }

    const category = await getSingleCategory(categoryId); // general fetching of the category to be edited
    if (!category) {
        res.render('errors/404', { title: 'Category Not Found', page: 'errors/404' });
        return;
    }
    const title = 'Edit Category';
    res.render('edit-category', { title, page: 'edit-category', category });
};

const validateEditCategoryForm = [
    body('category_name')
        .notEmpty()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters'),
    body('category_description')
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage('Category description must be less than 255 characters'),
    body('logo_filename')
        .notEmpty()
        .withMessage('Logo filename is required')
        .trim()
        .isLength({ max: 255 })
        .withMessage('Logo filename must be less than 255 characters')  
];

const processEditCategoryForm = async (req, res) => {
    // Implementation for processing the edit category form would go here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const title = 'Edit Category';
        const category = {
            category_id: req.params.id,
            name: req.body.category_name,          // template reads category.name
            description: req.body.category_description, // template reads category.description
            logo_filename: req.body.logo_filename  // template reads category.logo_filename
        };
        res.render('edit-category', { title, page: 'edit-category', category, errors: errors.array() });
        return;
    }

    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        return res.status(400).send('Invalid category ID');
    }

    try {
        const { category_name, category_description, logo_filename } = req.body;
        await editExistingCategory(categoryId, category_name, category_description, logo_filename);
        req.flash('success', 'Category updated successfully.');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error updating category:', error.stack || error);
        req.flash('error', 'Failed to update category. Please try again.');
        res.redirect(`/edit-category/${categoryId}`);
    }
};

export { categoriesController, showSingleCategory, showAssignCategoriesForm, 
    processAssignCategoriesForm, showAddCategoryForm, processAddCategoryForm, 
    newCategoryValidationRules, processEditCategoryForm, 
    showEditCategoryForm, validateEditCategoryForm, validateAssignCategoriesForm };