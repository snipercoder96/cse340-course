import express from 'express';

import { homeController } from './src/controllers/index.js';
import { organizationsController } from './src/controllers/organizations.js';
import { projectController }  from './src/controllers/projects.js';
import { categoriesController }  from './src/controllers/categories.js';
import { errorController, allErrorRoutesController, testErrorPage, globalErrorHandler}  from './src/controllers/errors.js';

const router = express.Router();

router.get('/', homeController);
router.get('/organizations', organizationsController);

router.get('/projects', projectController);
router.get('/categories', categoriesController);

// error-handling routes
router.get('/test-error', testErrorPage);
router.get('/errors', allErrorRoutesController, globalErrorHandler);

export default router;