import bcrypt from 'bcrypt';
import {createUser} from '../models/users.js';
import {authenticateUser} from '../models/users.js';
import session from 'express-session';

// just shows the form to register a new user
const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register', page: 'register' });
}

// process the form submission to register a new user
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        // always remember to hash passwords before storing them in the database for security reasons
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt); // hash the password with the generated salt

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
}

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login', page: 'login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body; // destructure email and password from the request body into separate variables for easier access and readability

    try {
        const user = await authenticateUser(email, password);
        // If authentication is successful, store user info in session and redirect to home page
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

// process the logout request by clearing the user session and rendering the logout page
const processLogout = async (req, res) => {
    if (req.session.user) { // check if the user is logged in before trying to log them out
        delete req.session.user;
    }
    res.render('logout', { title: 'Logout', page: 'logout' });
};
export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout };