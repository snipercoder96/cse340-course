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

export { getAllCategories, getSingleCategory };