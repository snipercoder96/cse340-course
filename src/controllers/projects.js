import { getUpcomingProjects, getProjectDetails, createProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';

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

// Show new project form
const showNewProjectForm = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('new-project', { title: 'New Service Project', organizations, page: 'new-project' });
    } catch (error) {
        console.error('Error fetching organizations for new project form:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

const processNewProjectForm = async (req, res) => {
    // Extract form data from req.body
    const { organizationId, title, description, location, project_date } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(organizationId, title, description, location, project_date); // fetching rows in JSON like structure, so we can easily access the new project ID from the result

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

export { projectController, showProjectDetailsPage, showNewProjectForm, processNewProjectForm };