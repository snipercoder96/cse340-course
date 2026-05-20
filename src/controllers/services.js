const servicesController = async(req, res) => {
    res.render('services', {
        title: 'Services',
        page: 'services',
    });
}

export { servicesController };