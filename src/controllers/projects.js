import { getAllProjects } from '../models/projects.js';

const projectController = async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.render('projects', { title: 'Service Projects', page: 'projects', projects });
    } catch (error) {
        console.error('Error fetching projects:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

export { projectController };