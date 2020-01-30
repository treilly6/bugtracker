export function convertISOtoLocal(clientTime, ISODateString) {
    console.log("FROM TTOOLS HERE THE DATE STRING ", clientTime, ISODateString);
    console.log(typeof(clientTime), typeof(ISODateString));

    // make ISODateString into a local string
    var localString = new Date(ISODateString).toLocaleString();

    console.log("HERE LOCAL STINF ", localString);


    // compare the local string days with the client time day

    // if the days are the same exclude them and only use time

    // else use the date and the time
}
