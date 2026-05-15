import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the templating engine for rendering views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
console.log(`Serving static files from: ${path.join(__dirname, 'public')}`);

// Routes (arrow functions)
app.get('/', (req, res) => {
    res.render('home', { title: 'Home', page: 'home' });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    console.log(organizations);

    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations, page: 'organizations' });
});

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Service Projects', page: 'projects' });
});

app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Project Categories', page: 'categories' });
});

app.get('/services', async (req, res) => {
    console.log('Rendering services page');

    try {
        const projects = await getAllProjects();
        res.render('services', {
            title: 'Project Services',
            page: 'services',
            projects
        });
    } catch (error) {
        console.error('Error rendering services:', error);
        res.status(500).send('Internal Server Error');
    }
});

// start the server with async/await and error handling incase of issues
app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${nodeEnv}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});

// Export app (ESM style)
export default app;
