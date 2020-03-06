module.exports = {
    sortChats : (chats) => {
        // console.log("HERE THE CHATS")
        // console.log(chats);
        // console.log("In the sort chats")
        return chats.sort((a,b) => {

            // check if either of the chats contain no messages
            if(a.messages.length === 0) {
                return 1
            } else if (b.messages.length === 0) {
                return -1
            }

            // get the newest message date from a chat
            var aDate = a.messages.slice(-1)[0].date;

            // get the newest message date from b chat
            var bDate = b.messages.slice(-1)[0].date;

            // if aDate is newer sort a at lower index than b
            if(aDate > bDate) {
                console.log("greater date is aDate ", aDate);
                return -1
            // else sort b at a lower index than a
            } else {
                console.log("greater date is bDate ", bDate);
                return 1
            }
        });
    }
}
