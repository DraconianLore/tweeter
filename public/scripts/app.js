/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// calculate time ago

function timeAgo(ts) {
    const d=new Date();  // Gets the current time
    const nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    const seconds = nowTs-ts;

    // more that two days
    if (seconds > 2*24*3600) {
       return "a few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "yesterday";
    }

    if (seconds > 3600) {
       return "a few hours ago";
    }
    if (seconds > 1800) {
       return "Half an hour ago";
    }
    if (seconds > 60) {
       return Math.floor(seconds/60) + " minutes ago";
    }
    return "A long time ago"
}

// Create tweet
function createTweetElement(newTweet) {
    let tweet = document.createElement('article');
    tweet.classList.add('tweet');
    
    // tweet header
    let tweetHeader = document.createElement('header');
    let tweetHeadImage = document.createElement('IMG');
    tweetHeadImage.setAttribute("src", 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png');
    tweetHeadImage.setAttribute("float", "left");
    tweetHeader.appendChild(tweetHeadImage);
    tweetHeader.innerHTML += newTweet.user.name;
    let tweetHeadP = document.createElement('p');
    tweetHeadP.innerText = newTweet.user.handle;
    tweetHeader.appendChild(tweetHeadP);
    tweet.appendChild(tweetHeader);

    let tweetP = document.createElement('p');
    tweetP.innerText = newTweet.content.text;
    tweet.appendChild(tweetP);

    let tweetFooter = document.createElement('footer');
    tweetFooter.innerText = timeAgo(newTweet.created_at);
    tweet.appendChild(tweetFooter);
    // console.log(tweet);
    return tweet;
}

const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
};

$(document).ready(function(){
var $tweet = createTweetElement(tweetData);
$("#tweeter-tweets").append($tweet);
})