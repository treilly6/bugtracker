module.exports = {
    makeUTC : () => {
        // init a date variable
        var date = new Date();

        // convert it to an ISO string and then make another date object
        var newDate = new Date(date.toISOString());

        return newDate;
    },
}
