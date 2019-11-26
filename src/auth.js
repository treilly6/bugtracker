const axios = require('axios');
// ***Conver this to using a cookie at some point*** //
module.exports = {
    ensureAuthenticated : async () => {
        var valid;
        await axios.post('/api/auth')
            .then(res => {
                console.log("IN THEN OF THE ENSURE AUTHENTICATED STUFF");
                console.log(res.data);
                if (res.data == 'authenticated') {
                    valid = true;
                } else {
                    valid = false;
                }
            })
            .catch(err => console.log("ERROR ON THE AUTH ROUTE AXIOS"));

        console.log("END OF THE AUTH AXIOS CALL");
        console.log(valid);
        return valid;
    }
}
