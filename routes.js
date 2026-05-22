import express from 'express';

import { homeController } from './src/controllers/index.js';
import { organizationsController } from './src/controllers/organizations.js';
import { projectController, showProjectDetailsPage }  from './src/controllers/projects.js';
import { categoriesController, showSingleCategory }  from './src/controllers/categories.js';
import { errorController, allErrorRoutesController, testErrorPage, globalErrorHandler}  from './src/controllers/errors.js';
import { showOrganizationDetailsPage } from './src/controllers/organizations.js';
import { servicesController } from './src/controllers/services.js';


const router = express.Router();

router.get('/', homeController);
router.get('/organizations', organizationsController);
router.get('/services', servicesController);
router.get('/projects', projectController);
router.get('/categories', categoriesController);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showSingleCategory);
// error-handling routes
router.get('/test-error', testErrorPage, globalErrorHandler); // just to test the 500 error page, this route will intentionally throw an error to demonstrate the error handling mechanism
router.get('/errors', allErrorRoutesController, globalErrorHandler); // this handles any route that is not defined above, it will trigger the 404 error page, and if there is any error in the process it will be handled by the globalErrorHandler

// Catch-all 404 handler for undefined routes
router.use(allErrorRoutesController, globalErrorHandler);

export default router;


// where all the routes are defined and exported to be used in server.js