/**
 ** CHECK OUT https://www.tmijs.org/docs/
 ** DOCS FOR TMI.JS
 **/

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

// Connect to IRC
var irc = require("tmi.js");
var client = new irc.client(options);

client.connect();

// Connect and setup mongodb
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/twitchmakesgame';

// Start listening to chat
client.on("join", function (channel, username) {
    var insertDocument = function(db, callback) {
       db.collection('users').insertOne( {
           "_id" : username
       }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the users collection.");
        callback(result);
      });
    };

    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      insertDocument(db, function() {
          db.close();
      });
    });

});

client.on("chat", function (channel, user, message, self) {
    if(!self) {
        client.say(channel, "Hi " + user.username);
    }
});
