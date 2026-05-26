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

// added new function to get projects by organization ID, this will be used in the organization details page to show the projects associated with that organization
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
      SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        project_date
      FROM project
      WHERE organization_id = $1
      ORDER BY project_date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};


const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.project_date, o.name as organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.project_date,
               o.name as organization_name,
               c.category_id, c.name as category_name, c.logo_filename
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        LEFT JOIN public.project_category pc ON p.project_id = pc.project_id
        LEFT JOIN public.category c ON pc.category_id = c.category_id
        WHERE p.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    const row = result.rows[0];
    if (!row) return null;

    const categories = result.rows
        .filter(r => r.category_id !== null)
        .map(r => ({ category_id: r.category_id, name: r.category_name, logo_filename: r.logo_filename }));

    return { ...row, categories };
}

/** Creates a new project in the database.
* @param {string} title - The title of the project
* @param {string} description - A detailed description of the project
* @param {string} location - The location where the project will take place (e.g., city, state)
* @param {Date} project_date - The date when the project is scheduled to occur
* @param {number} organizationId - The ID of the organization responsible for the project
* @returns {number} The ID of the newly created project
 */

// create new function to create new project
const createProject = async (organizationId, title, description, location, project_date) => {
    const query = `
      INSERT INTO project (organization_id, title, description, location, project_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [organizationId, title, description, location, project_date];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject };  