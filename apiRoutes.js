// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends, matches and user
// ===============================================================================

var friends = require("../app/data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------


  app.get("/api/friends", function(req, res) {
    res.json(friends);
    console.log("User Data: " + JSON.stringify(friends));
  });


  app.post("/api/friends", function(req, res) {  
    // redirect to successful match in modal
    // We will use this object to hold the "best match". We will constantly update it as we
    // loop through all of the options
    
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };


    var difference = 0;
    var user = req.body;
    var scores = user.scores;

    console.log("req.body", req.body);
    console.log("Scores: " + scores);
    console.log("User Name: " + user.name);  // nothing here - object Object

    var userScore = [];
    var friendScore = [];

    // loop through friends.json file and user scores length store in array variable
    for (var i = 0; i < friends.length; i++) {
        var friendName = friends[i];    

        console.log("userFriend", friendName.name);  // should be user name

         for (var j = 0; j < friendName.scores.length; j++ ) {  
            friendScore = friendName.scores[j];  
            userScore = scores[j];

            difference += Math.abs(parseInt(userScore) - parseInt(friendScore));
        } 

      console.log("friendScores", friendScore);  // should be user scores
      console.log("userScores", userScore);
  
/*    function subtractArrays (userArray, friendArray) {     
        return arr2.map(function (el, i) {
        return Math.abs(el - userArray[i]);
        });
        arrayRedifsult = subtractArrays(userArray, friendArray);   
    }  

      for (var i = 0; i < arrayResult.length; i++) {
        difference = totalDifference - arrayResult[i];   // 10 questions max * 5 highest rank === 50 
        console.log(difference);  
    }
*/
    
    if (difference <= bestMatch.friendDifference) {
      bestMatch.name = friendName.name;
      bestMatch.photo = friendName.photo; 
      bestMatch.friendDifference = difference;
      }
    } 

    console.log("score difference, best match", difference, bestMatch);
    console.log(bestMatch);

    friends.push(user);
    // Send back the name and photo of the new match result
    res.json(bestMatch);
    
  });
};


