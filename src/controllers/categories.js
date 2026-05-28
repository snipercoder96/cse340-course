import { getAllCategories, getSingleCategory, assignCategoryToProject, updateCategoryAssignments, getCategoriesByServiceProjectId, insertNewCategory } from '../models/categories.js';
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
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

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
        // Convert empty string to null for logoFilename (since optional field should be null when empty)
        const logoFilenameValue = logoFilename === '' ? null : logoFilename;
        await insertNewCategory(name, description, logoFilenameValue);
        req.flash('success', 'Category added successfully.');
        res.redirect('/categories');
    }

    catch (error) {
        console.error('Error adding category:', error.stack || error);
        req.flash('error', 'Failed to add category. Please try again.');
        res.redirect('/new-category');
    }

};

export { categoriesController, showSingleCategory, showAssignCategoriesForm, processAssignCategoriesForm, showAddCategoryForm, processAddCategoryForm, newCategoryValidationRules };