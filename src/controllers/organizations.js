import { response } from "express";
import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const organizationsController = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { title: 'Organizations', organizations, page: 'organizations' });
    } catch (error) {
        console.error('Error fetching organizations:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id; // get the organization ID from the URL parameter
    const organizationDetails = await getOrganizationDetails(organizationId); // returns rows with organization details, including name, description, and contact information
    const projects = await getProjectsByOrganizationId(organizationId); // returns rows with project details for the specified organization, including project name, description, and category
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects, page: 'organization' });
};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title, page: 'new-organization'});
}

const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body; // get the form data from the request body, this assumes that the form fields are named 'name', 'description', and 'contactEmail'
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    res.redirect(`/organization/${organizationId}`); // redirect to the details page of the newly created organization, this assumes that there is a route defined to handle GET requests to /organization/:id which will render the organization details page using the showOrganizationDetailsPage controller
};

export { organizationsController, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };