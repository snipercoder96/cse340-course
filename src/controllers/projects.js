import { getUpcomingProjects, getProjectDetails, createProject } from '../models/projects.js';
import {updateProject} from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { validationResult } from 'express-validator';
import { getVolunteerProjectsByUserId, addVolunteer } from '../models/users.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Show projects Page
const projectController = async (req, res) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); // Fetch upcoming projects
        const isLoggedIn = !!req.session.user;
        const user = req.session.user;
        res.render('projects', { 
            title: 'Upcoming Service Projects', 
            page: 'projects', 
            projects,
            isLoggedIn,
            user 
        });
    } catch (error) {
        console.error('Error fetching projects:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

const showProjectDetailsPage = async (req, res) => {
    try {
        
        const id = req.params.id;
        const project = await getProjectDetails(id);
        const isLoggedIn = !!req.session.user;
        const user = req.session.user;

        let isVolunteered = false;
        if (user) {
            const volunteerProjects = await getVolunteerProjectsByUserId(user.user_id);
            isVolunteered = volunteerProjects.some(p => p.project_id === parseInt(id));
        }

        res.render('project', { 
            title: project.title, 
            page: 'project-details', 
            project,
            isLoggedIn,
            user,
            isVolunteered
        });
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

// Show edit project form
const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title = 'Edit Project';
    res.render('edit-project', { title, projectDetails, organizations, page: 'edit-project' });
};

// Process edit project form
const processEditProjectForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-project/${req.params.id}`);
    }

    const projectId = req.params.id;
    const { project_id, organizationId, title, description, location, project_date } = req.body;
    console.log('DEBUG: req.body:', req.body);
    console.log('DEBUG: project_date:', project_date);

    await updateProject(projectId, organizationId, title, description, location, project_date);

    req.flash('success', 'Project updated successfully!');
    res.redirect(`/project/${projectId}`);
};

const processVolunteerForProject = async (req, res) => {
    const { id } = req.params;
    const user = req.session.user;

    try {
        await addVolunteer({
            name: user.name,
            email: user.email,
            passwordHash: null,  // existing user — addVolunteer won't use this
            project_id: id
        });
        req.flash('success', 'You have been signed up for this project!');
        res.redirect(`/project/${id}`);
    } catch (error) {
        console.error('Error volunteering for project:', error);
        req.flash('error', 'An error occurred while signing you up. Please try again.');
        res.redirect(`/project/${id}`);
    }
};

export { projectController, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm, processVolunteerForProject };