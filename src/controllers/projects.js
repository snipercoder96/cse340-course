import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Show projects Page
const projectController = async (req, res) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); // Fetch upcoming projects
        res.render('projects', { title: 'Upcoming Service Projects', page: 'projects', projects });
    } catch (error) {
        console.error('Error fetching projects:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

const showProjectDetailsPage = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await getProjectDetails(id);
        res.render('project', { title: project.title, page: 'project-details', project });
    } catch (error) {
        console.error('Error fetching project details:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

export { projectController, showProjectDetailsPage };