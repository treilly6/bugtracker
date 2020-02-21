export function convertISOtoLocal(clientTime, itemISODate) {
    // function used to format the messgaes in the chat

    // Input : client time stamp, variable is initialized on the front end and passed into this function so that the proper local timezone is used
    // Output : timestamp that will show only the time id the itemISODate is the same date as the client time OR a timestamp showing time and date if the dates are different

    // console.log("FROM TTOOLS HERE THE DATE STRING ", clientTime, itemISODate);
    // console.log(typeof(clientTime), typeof(itemISODate));

    // make itemISODate into a local string and split into an array
    // this is changing the time from UTC to whatever the local timezone is
    var localStringArray = new Date(itemISODate).toLocaleString().split(", ");

    // make the client time into a local string and split into an array
    var clientTimeArray = clientTime.toLocaleString().split(", ");

    // console.log("HERE LOCAL STINF ", localStringArray);
    // console.log("HERE THE CLIENT TIME ", clientTimeArray);


    // split the time from the am pm
    var timeSplit = localStringArray[1].split(" ");
    // set the am/pm variable
    var AmPm = timeSplit[1];
    // remove the seconds from the time
    var time = timeSplit[0].split(":").slice(0,2).join(":");


    // compare the local string days with the client time day
    // if the days are the same exclude them and only use time
    if(localStringArray[0] === clientTimeArray[0]) {
        // return the time with am/pm
        return `${time} ${AmPm}`;
    } else {
        // else use the date and the time
        return `${time} ${AmPm} ${localStringArray[0]}`;
    }
}
