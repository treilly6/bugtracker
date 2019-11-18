
module.exports = {
    ensureAuthenticated : function(req, res, next) {
        console.log("HERE IN THE ENNSURE AUTHENTICATED METHOD");
        console.log(localStorage);
        if(localStorage.getItem("authenticated")) {
            return true;
        }
        return false;
    }
}
