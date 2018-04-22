//Loading data and linking routes

var friends = require("../data/friends.js");
//var matches = require("/api/friends");

//routing - GET requests
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
};

//API POST requests, when a user submits a form it will submit data
//to the server, then uses JSON to push into a javascript array

app.post("/api/friends", function (req, res) {
    //object to hold the match
    var friendMatch = {
        name: "",
        photo: "",
        friendNum: "500"
    };
    var friendData = req.body;
    var friendName = friendData.name;
    var friendPhoto = friendData.photo;
    var friendScore = friendData.score;

    var friendDiff = 0;
    //looping through possible matchesa
    for (var i = 0; i < friends.length; i++) {

        console.log(friends[i].name);
        friendDiff = 0;
        //I GOT ALLOT OF HELP W/NEXT SECTION
        //looping through scores here
        for (var j = 0; j < friends[i].scores[j]; j++) {
            //totalling the diff in scores
            friendDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

            if (friendDiff <= friendMatch.friendNum) {

                // resetting friendMatch
                friendMatch.name = friends[i].name;
                friendMatch.photo = friends[i].photo;
                friendMatch.friendNum = friendDiff;
            }
        }
    }
    // saves friend data to database
    friends.push(friendData);
    //provides result in json with match
    res.json(friendMatch);
});