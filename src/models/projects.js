import db from "./db.js";

const getAllProjects = async () => {
    const query = `
        SELECT organization_id, title, description, location, project_date
        FROM public.project;
    `;

    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        throw error;
    }
}

export { getAllProjects }  