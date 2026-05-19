const homeController = async (req, res) => {
    res.render('home', { title: 'Home', page: 'home' });
};

export { homeController };