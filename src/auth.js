// ***Conver this to using a cookie at some point*** //
module.exports = {
    ensureAuthenticated : () => {
        console.log("HERE IN THE ENNSURE AUTHENTICATED METHOD");
        console.log(localStorage);
        if(localStorage.getItem("authenticated")) {
            return true;
        }
        return false;
    }
}
