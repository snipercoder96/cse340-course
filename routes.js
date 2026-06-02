import express from 'express';

import { homeController } from './src/controllers/index.js';
import { organizationsController, processNewOrganizationForm, showEditOrganizationForm, processEditOrganizationForm} from './src/controllers/organizations.js';
import { projectController, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm }  from './src/controllers/projects.js';
import { categoriesController, showSingleCategory, showAssignCategoriesForm, processAssignCategoriesForm, showAddCategoryForm, processAddCategoryForm, newCategoryValidationRules, showEditCategoryForm, validateEditCategoryForm, processEditCategoryForm, validateAssignCategoriesForm}  from './src/controllers/categories.js';
import { errorController, allErrorRoutesController, testErrorPage, globalErrorHandler}  from './src/controllers/errors.js';
import { showOrganizationDetailsPage, showNewOrganizationForm, organizationValidationRules } from './src/controllers/organizations.js';
import { servicesController } from './src/controllers/services.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, validateLoginInput, showDashboard, requireUser } from './src/controllers/users.js';


const router = express.Router();

router.get('/', homeController);
router.get('/organizations', organizationsController);
router.get('/services', servicesController);
router.get('/projects', projectController);
router.get('/categories', categoriesController);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm); // shows new form to create a new organization, this is a GET route because it just renders the form, the actual creation of the organization will be handled in a POST route that will be defined in the future when we implement the form submission functionality
router.post('/new-organization', organizationValidationRules, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm); // shows form to edit an existing organization

router.post('/edit-organization/:id', organizationValidationRules, processEditOrganizationForm);// this route will handle the form submission for editing an existing organization, it will be a POST route because it will update the organization details in the database, and we will also implement validation rules for the form submission similar to the ones we have for creating a new organization
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showSingleCategory);
router.get('/new-project', showNewProjectForm); // shows the form to create a new project
router.post('/new-project', processNewProjectForm); // this route will handle the form submission for creating a new project

/**
 * @todo: add the validation rules for the assign categories form submission, and also implement the functionality to update the category assignments for a project in the database, this will involve first deleting the existing category assignments for the project and then inserting the new category assignments based on the form submission
 */
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', validateAssignCategoriesForm, processAssignCategoriesForm); 

router.get('/new-category', showAddCategoryForm); // shows the form to create a new category
router.post('/new-category', newCategoryValidationRules, processAddCategoryForm); // this route will handle the form submission for creating a new category

router.get('/edit-project/:id', showEditProjectForm); // shows form to edit an existing project
router.post('/edit-project/:id', processEditProjectForm); // this route will handle the form submission for editing an existing project, it will be a POST route because it will update the project details in the database, and we will also implement validation rules for the form submission similar to the ones we have for creating a new project

router.get('/edit-category/:id', showEditCategoryForm); // shows form to edit an existing category
router.post('/edit-category/:id', validateEditCategoryForm, processEditCategoryForm); // this route will handle the form submission for editing an existing category

router.get('/register', showUserRegistrationForm); // shows the form to register a new user
router.post('/register', processUserRegistrationForm); // this route will handle the form submission for registering a new user

router.get('/login', showLoginForm); // shows the form to login
router.post('/login', validateLoginInput, processLoginForm); // this route will handle the form submission for logging in
router.get('/logout', processLogout); // this route will handle the logout request

router.get('/dashboard', requireUser, showDashboard); // protected route that requires authentication, it will show the dashboard page for logged in users, we will implement the requireUser middleware to check if the user is authenticated before allowing access to this route


// error-handling routes
router.get('/test-error', testErrorPage, globalErrorHandler); // just to test the 500 error page, this route will intentionally throw an error to demonstrate the error handling mechanism
router.get('/errors', allErrorRoutesController, globalErrorHandler); // this handles any route that is not defined above, it will trigger the 404 error page, and if there is any error in the process it will be handled by the globalErrorHandler

// Catch-all 404 handler for undefined routes
router.use(allErrorRoutesController, globalErrorHandler);

export default router;


// where all the routes are defined and exported to be used in server.js