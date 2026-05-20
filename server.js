import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import { testConnection } from './src/models/db.js';
import router from './routes.js';


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

// Import and use routes
app.use(router);

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
