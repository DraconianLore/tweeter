/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calculate time ago
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
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
    leftFoot.innerText = timeSince(newTweet.created_at);
    let rightFoot = document.createElement('div');
    rightFoot.innerHTML = "&#127988; &#128260; &#128153;";
    rightFoot.classList.add('media-buttons');
    tweetFooter.appendChild(leftFoot);
    tweetFooter.appendChild(rightFoot);
    tweet.appendChild(tweetFooter);

    // console.log(tweet);
    return tweet;
}
// Check document is ready... all jQuery after this point!
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

    // renderTweets(data);
    // catch post requests and redirect them through AJAX
    $("#sendTweet").submit(function (event) {
        event.preventDefault();
        let dataToSend = $(this).serialize();
        $.post("/tweets/", dataToSend, function () {
            loadTweets(dataToSend) // reloads ALL tweets... hmm
        });
    })
    function loadTweets() {
        $.ajax('/tweets', { method: 'GET' })
            .then(function (getTweets) {
                renderTweets(getTweets);
            });

    }
    loadTweets();
})
