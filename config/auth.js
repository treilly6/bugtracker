module.exports = {
    ensureAuthenticated : function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.json({"error" : "Please log in to view this page", "redirect" : "/login"});
    }
}
