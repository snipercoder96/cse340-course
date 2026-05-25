import { response } from "express";
import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import flash from '../middleware/flash.js';

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

    res.render('new-organization', { title, page: 'new-organization' });
}

const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;

    // Basic validation: check if fields are empty
    if (!name || !description || !contactEmail) {
        // Option 1: re-render the form with an error message
        return res.render('new-organization', {
            title: 'Add a New Organization',
            page: 'new-organization',
            error: 'All fields are required.',
            formData: { name, description, contactEmail }
        });
    }

    const logoFilename = 'placeholder-logo.png';

    try {
        const organizationId = await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );
        req.flash('success', 'Organization added successfully!'); // check error
        res.redirect(`/organization/${organizationId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating organization');
    }
};


export { organizationsController, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };