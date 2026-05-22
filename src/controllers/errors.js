// renders the 404 page when a route is not found and handles all errors globally, including 500 errors
const errorController = (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found', page: '404' });
};

// Catch-all route for 404 errors
const allErrorRoutesController = async (req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
};

// Test route for 500 errors
const testErrorPage = (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};
// Global error handler
const globalErrorHandler = async (err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    // Determine status and template
    const status = err.status || 500; // this line says if err.status is defined use it, otherwise use 500
    const template = status === 404 ? '404' : '500'; // this line says if status is 404 use the 404 page, otherwise use the 500 page

    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        page: status === 404 ? '404' : '500',
        error: err.message,
        stack: err.stack,
        nodeEnv: process.env.NODE_ENV?.toLowerCase() || 'production'
    };

    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
};



export { errorController, allErrorRoutesController, globalErrorHandler, testErrorPage };