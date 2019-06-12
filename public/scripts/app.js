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
    tweetHeadImage.setAttribute("src", newTweet.user.avatars.small);
    tweetHeadImage.setAttribute("float", "left");
    tweetHeader.appendChild(tweetHeadImage);
    tweetHeader.innerHTML += newTweet.user.name;
    let tweetHeadP = document.createElement('p');
    tweetHeadP.innerText = newTweet.user.handle;
    tweetHeader.appendChild(tweetHeadP);
    tweet.appendChild(tweetHeader);

    let tweetP = document.createElement('p');
    tweetP.innerText = newTweet.content.text;
    tweetP.classList.add('body');
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
            newTweets.prepend(createTweetElement(tweet));
        }
        $("#tweeter-tweets").empty();
        $("#tweeter-tweets").append(newTweets)
    }

    // renderTweets(data);
    // catch post requests and redirect them through AJAX
    const $errorMessages = $('.tweet-error-message');
    $("#sendTweet").submit(function (event) {
        event.preventDefault();
        // handle error messages
        $errorMessages.empty();
        if (this.text.value.length > 140) {
            $errorMessages.append('Message is too long!');
            return;
        }
        if (this.text.value.length === 0) {
            $errorMessages.append('You forgot to write something!');
            return;
        }
        let dataToSend = $(this).serialize();
        // reset form and reset counter
        $(this).trigger('reset');
        $(this.querySelector(".counter").innerText = '140');

        // post new data
        $.post("/tweets/", dataToSend, () => {
            loadTweets(dataToSend) // reloads ALL tweets... hmm
        });
    })
    function loadTweets() {
        $.get("/tweets")
            .then((getTweets) => {
                renderTweets(getTweets);
            })

    }

    const tweetArea = $(".new-tweet");
    const tweetText = $("#tweet-text");
    // nav bar button events
    $("#compose-tweet").click(() => {
        tweetArea.slideToggle(() => {
            tweetText.focus();
        });
    })
    // load initial tweets from database
    loadTweets();
})
