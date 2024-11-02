const homeService = require('../services/homeService');

// Usage in home controller
const home = async (req, res) => {
    res.render('pages/home'); // Pass causes as an object to the render method
};

const addCause = async (req, res, next) => {
    await homeService.addCause(req, res, next);
}

const getCauses = async (req, res, next) => {
    await homeService.getCauses(req, res, next, false);
}

module.exports = {
    home,
    addCause,
    getCauses
};