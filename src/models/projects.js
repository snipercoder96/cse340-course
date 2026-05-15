import db from "./db.js";

const getAllProjects = async () => {
    const query = `
        SELECT organization_id, title, description, location, project_date
        FROM public.project; 
    `; // public is the default schema since there isnt a specified one in the database connection string
    

    const result = await db.query(query);

    // return the rows so callers can render actual project data
    return result.rows;
}

export { getAllProjects }  