import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM category
        ORDER BY name;
    `;

    const result = await db.query(query);
    return result.rows;
};

const getSingleCategory = async (categoryId) => {
    const query = `
        SELECT category_id, name, description, logo_filename
        FROM category
        WHERE category_id = $1
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const getCategoriesByServiceProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

const insertNewCategory = async (name, description, logoFilename = null) => {
    const query = `
        INSERT INTO category (name, description, logo_filename)
        VALUES ($1, $2, $3)
        RETURNING category_id;
    `;

    const result = await db.query(query, [name, description, logoFilename]);
    return result.rows[0].category_id; // Return the ID of the newly inserted category 
};

const editExistingCategory = async (categoryId, name, description, logoFilename) => {
    const query = `
        UPDATE category
        SET name = $1, description = $2, logo_filename = $3
        WHERE category_id = $4;
    `;

    const result = await db.query(query, [name, description, logoFilename, categoryId]);
    return result.rows[0]; // Return the updated category object
};

export { getAllCategories, getSingleCategory, assignCategoryToProject, updateCategoryAssignments, getCategoriesByServiceProjectId, insertNewCategory, editExistingCategory };