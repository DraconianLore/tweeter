"use strict";
const ObjectId = require('mongodb').ObjectID
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to database
    saveTweet: function (newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in database, sorted by newest first
    getTweets: function (callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection('tweets').find().toArray((err, data) => {
        callback(null, data.sort(sortNewestFirst));
      })


    },

    // add/remove a like
    likeTweet: function(tweetID, like) {
      const changeID = {_id: ObjectId(`${tweetID}`)};
      const changeStatus =  {$set: {liked: like}};
      db.collection('tweets').update(changeID, changeStatus, function(err, res) {
        if (err) throw err;
        console.log(res.result.nModified + ' like updated')
      });
    }

  };
}
