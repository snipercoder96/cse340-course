import db from './db.js';
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash, role) => {
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, role];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const queryParams = [email];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }

    return result.rows[0]; // limiting to one user since email should be unique.
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null; // User not found
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) { 
        return null; // Authentication failed
    }
    return user; // Authentication successful
};

// this must show when the users is logged in and has admin role, we can check the role in the route handler before calling this function
const showAllUsersPermissions = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
    `;

    const result = await db.query(query);

    return result.rows;
};


const addVolunteer = async ({ name, email, passwordHash, project_id }) => {
    let user = await findUserByEmail(email);
    let user_id;
    if (!user) {
        user_id = await createUser(name, email, passwordHash, 'user');
    } else {
        user_id = user.user_id;
    }

    const project_ids = Array.isArray(project_id) ? project_id : [project_id];

    const query = `
        INSERT INTO volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING volunteer_id;
    `;

    const results = [];
    for (const pid of project_ids) {
        const result = await db.query(query, [user_id, pid]);
        if (result.rows.length > 0) results.push(result.rows[0].volunteer_id);
    }

    return results;
};

const removeVolunteer = async ({ email, project_id }) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null; // User not found
    }

    const query = `
      DELETE FROM volunteers
      WHERE user_id = $1 AND project_id = $2
      RETURNING volunteer_id;
    `;
    const queryParams = [user.user_id, project_id];

    const result = await db.query(query, queryParams);

    if (result.rows.length > 0) {
        return result.rows[0].volunteer_id; // Successfully removed
    }

    return null; // No volunteer record found
};
  
const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.project_date
        FROM volunteers v
        JOIN project p ON v.project_id = p.project_id
        WHERE v.user_id = $1
        ORDER BY p.project_date;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

export { createUser, authenticateUser, showAllUsersPermissions, addVolunteer, removeVolunteer, getVolunteerProjectsByUserId}; // we just need authenticate user for login only, no need to export findUserByEmail