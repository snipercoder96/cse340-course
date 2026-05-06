import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'production';
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
console.log(`Serving static files from: ${path.join(__dirname, 'public')}`);

// Routes (arrow functions)
app.get('/', (req, res) => {
    res.render('home', { title: 'Home', page: 'home' });
});

app.get('/organizations', (req, res) => {
    res.render('organizations', { title: 'Partner Organizations', page: 'organizations' });
});

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Service Projects', page: 'projects' });
});

app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Project Categories', page: 'categories' });
});

// start the server with async/await and error handling incase of issues
const startServer = async () => {
    try {
        await app.listen(port);
        console.log(`Server is running at http://127.0.0.1:${port}`);
        console.log(`Environment: ${nodeEnv}`);
    } catch (err) {
        console.error('Error starting server:', err);
    }
};

startServer();

// Export app (ESM style)
export default app;
