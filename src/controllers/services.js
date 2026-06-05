const servicesController = async(req, res) => {
    const isLoggedIn = !!req.session.user;
    const user = req.session.user;
    res.render('services', {
        title: 'Services',
        page: 'services',
        isLoggedIn,
        user
    });
}

export { servicesController };