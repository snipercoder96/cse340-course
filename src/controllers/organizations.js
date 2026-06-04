import { response } from "express";
import { getAllOrganizations, getOrganizationDetails, createOrganization, updateOrganization, updateProject} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

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

    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-organization');
    }

    const logoFilename = 'placeholder-logo.png'; // insstead of having dropping images we used default here, in the future we can implement file upload functionality to allow users to upload their own logos for their organizations, and then we would save the uploaded file and use its filename here instead of the placeholder

    const organizationId = await createOrganization(
        name,
        description,
        contactEmail,
        logoFilename
    );
    req.flash('success', 'Organization added successfully!'); // check error
    res.redirect(`/organization/${organizationId}`);
    
};

const organizationValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must be at most 500 characters'),
    body('contactEmail')
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail()
  ]; // this organizationValidationRules array will contain the validation rules for the form fields when creating a new organization, we will use express-validator to define these rules, and we will check for things like required fields, valid email format, and length constraints for the name and description fields.
  //  We will also use the validationResult function to check for any validation errors and handle them accordingly in the processNewOrganizationForm function.

const showEditOrganizationForm = async (req, res) => { // just shows the form visible to users
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);

    const title = 'Edit Organization';
    res.render('edit-organization', { title, organizationDetails, page: 'Edit-organization' });
};

// this processEditOrganizationForm function will handle the form submission for editing an existing organization, it will be a POST route because it will update the organization details in the database, and we will also implement validation rules for the form submission similar to the ones we have for creating a new organization
const processEditOrganizationForm = async (req, res) => {

    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect(`/edit-organization/${req.params.id}`);
    }

    const organizationId = req.params.id;
    const { name, description, contactEmail, logoFilename } = req.body;

    await updateOrganization(organizationId, name, description, contactEmail, logoFilename);

    // Set a success flash message
    req.flash('success', 'Organization updated successfully!');

    res.redirect(`/organization/${organizationId}`);
};

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await updateProject(projectId);

    res.render('edit-project', { title: 'Edit Project', page: 'edit-project' , projectDetails });
};
export {
    organizationsController, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidationRules, showEditOrganizationForm, processEditOrganizationForm, showEditProjectForm
};
