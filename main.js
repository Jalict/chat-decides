// Setup options
var options = {
        options: {
            debug: true
        },

        identity: {
            username: "twitchmakegame"
        },

        channels: ["#twitchmakegame"]
};

// Get oauth key
fs = require('fs');

var oauthkey;
fs.readFile('oauth', 'utf8', function(err,data) {
    if (err) {
        throw err;
    }
    options.identity.password = data;
})

// Connect
var irc = require("tmi.js");
var client = new irc.client(options);

client.connect();

// Start listening to chat
client.on("chat", function(channel, user, message, self) {
    client.say("wtf");
});
