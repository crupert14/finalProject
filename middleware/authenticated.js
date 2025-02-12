const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(403).json({ message: "You must be logged in to access this page" }); //Replace with error page
    }
};

module.exports = isAuthenticated;