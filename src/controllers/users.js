import bcrypt from 'bcrypt';
import {createUser} from '../models/users.js';

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

export { showUserRegistrationForm, processUserRegistrationForm };