import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import { testConnection } from './src/models/db.js';
import router from './routes.js';
import session from 'express-session';
import flash from './src/middleware/flash.js';
import flashLocals from './src/middleware/flash.js';


// declare constants for environment variables and server configuration

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure session middleware with a secret and options for resaving and initializing sessions
app.use(session({
    secret: SESSION_SECRET, // Use the SESSION_SECRET from environment variables for security
    resave: false, // what does this do? - Don't save session if unmodified
    saveUninitialized: true, // Save uninitialized sessions (new but not modified)
    cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity
}));

app.use(flash); // Custom middleware to add flash messaging functionality to the request object
app.use(flashLocals); // Middleware to make flash messages available in all EJS templates via res.locals

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.json()); // Middleware to parse JSON bodies (for API requests)

// Make nodeEnv available to all EJS templates via res.locals
app.use((req, res, next) => {
    res.locals.isLoggedIn = false;
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }
    
    res.locals.nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'production';
    next();
});

// Set EJS as the templating engine for rendering views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // Set the directory for EJS templates to 'src/views'

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
