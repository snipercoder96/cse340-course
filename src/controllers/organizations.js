import { response } from "express";
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
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

    res.render('organization', { title, organizationDetails, projects });
};

export { organizationsController, showOrganizationDetailsPage };