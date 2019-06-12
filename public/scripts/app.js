/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calculate time ago
function timeAgo(ts) {
    const d = new Date();
    const nowTs = Math.floor(d.getTime() / 1000);
    const seconds = nowTs - ts;

    if (seconds > 2 * 24 * 3600) {
        return "a few days ago";
    }
    if (seconds > 24 * 3600) {
        return "yesterday";
    }

    if (seconds > 3600) {
        return "a few hours ago";
    }
    if (seconds > 1800) {
        return "Half an hour ago";
    }
    if (seconds > 60) {
        return Math.floor(seconds / 60) + " minutes ago";
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
    let leftFoot = document.createElement('div');
    leftFoot.innerText = timeAgo(newTweet.created_at);
    let rightFoot = document.createElement('div');
    rightFoot.innerHTML = "&#127988; &#128260; &#128153;";
    rightFoot.classList.add('media-buttons');
    tweetFooter.appendChild(leftFoot);
    tweetFooter.appendChild(rightFoot);
    tweet.appendChild(tweetFooter);

    // console.log(tweet);
    return tweet;
}
const data = [
    {
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
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": {
                "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    },
    {
        "user": {
            "name": "Johann von Goethe",
            "avatars": {
                "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
        },
        "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
    }
];
$(document).ready(function () {
    function renderTweets(tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        const newTweets = document.createElement('div');
        for (let tweet of tweets) {
            newTweets.appendChild(createTweetElement(tweet));
        }
        $("#tweeter-tweets").append(newTweets)
    }
    
renderTweets(data);


})



// var $tweet = createTweetElement(tweetData);
// $("#tweeter-tweets").append($tweet);