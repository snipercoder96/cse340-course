import { response } from "express";
import { getAllOrganizations } from '../models/organizations.js';

const organizationsController = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { title: 'Organizations', organizations, page: 'organizations' });
    } catch (error) {
        console.error('Error fetching organizations:', error.stack || error);
        return res.status(500).send('Internal Server Error');
    }
};

export { organizationsController };