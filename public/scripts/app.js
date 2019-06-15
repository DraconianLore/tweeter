/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calculate time ago
function timeSince(date) {

    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

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
    const tweet = document.createElement('article');
    tweet.classList.add('tweet');
    tweet.setAttribute('id', newTweet._id)
    // tweet header
    const tweetHeader = document.createElement('header');
    const tweetHeadImage = document.createElement('IMG');
    tweetHeadImage.setAttribute("src", newTweet.user.avatars.small);
    tweetHeadImage.setAttribute("float", "left");
    tweetHeader.appendChild(tweetHeadImage);
    tweetHeader.innerHTML += newTweet.user.name;
    const tweetHeadP = document.createElement('p');
    tweetHeadP.innerText = newTweet.user.handle;
    tweetHeader.appendChild(tweetHeadP);
    tweet.appendChild(tweetHeader);
    // Tweet 'body'
    const tweetP = document.createElement('p');
    tweetP.innerText = newTweet.content.text;
    tweetP.classList.add('body');
    tweet.appendChild(tweetP);
    // Tweet footer
    const tweetFooter = document.createElement('footer');
    const leftFoot = document.createElement('div');
    leftFoot.innerText = timeSince(newTweet.created_at);
    const rightFoot = document.createElement('div');
    const flag = document.createElement('a');
    flag.setAttribute('href', '#');
    flag.classList.add('flag');
    flag.innerHTML = "&#127988;";
    rightFoot.appendChild(flag);
    const retweet = document.createElement('a');
    retweet.setAttribute('href', '#');
    retweet.classList.add('retweet');
    retweet.innerHTML = "&#128260;";
    rightFoot.appendChild(retweet);
    const like = document.createElement('a');
    like.setAttribute('href', '#');
    like.classList.add('like', 'tooltip');
    like.innerHTML = "&#128153;";
    like.setAttribute("liked", newTweet.liked)
    const likes = document.createElement('div');
    likes.classList.add('tooltiptext');
    like.appendChild(likes);
    rightFoot.appendChild(like);


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
        for (const tweet of tweets) {
            newTweets.prepend(createTweetElement(tweet));
        }
        $('#tweeter-tweets').html(newTweets)
        // $("#tweeter-tweets").empty();
        // $("#tweeter-tweets").append(newTweets)
    }

    // catch post requests and redirect them through AJAX
    const $errorMessages = $('.tweet-error-message');
    $("#sendTweet").submit(function (event) {
        event.preventDefault();
        // handle error messages
        $errorMessages.empty();
        if (this.text.value.length > 140) {
            $errorMessages.append('&nbsp;&nbsp;Message is too long!&nbsp;&nbsp;');
            return;
        }
        if (this.text.value.length === 0) {
            $errorMessages.append('&nbsp;&nbsp;You forgot to write something!&nbsp;&nbsp;');
            return;
        }
        let dataToSend = $(this).serialize();
        // reset form and reset counter
        $(this).trigger('reset');
        $(this.querySelector(".counter").innerText = '140');

        // post new data
        $.post("/tweets/", dataToSend, () => {
            loadTweets() // reloads ALL tweets... 
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
    tweetArea.hide();

    // nav bar button events
    $("#compose-tweet").click(() => {
        tweetArea.slideToggle(() => {
            tweetText.focus();
        });
    })
    $("#colour-scheme").click(() => {
        if ($('body').hasClass('dark')) {
            $('body').removeClass('dark');
        } else {
            $('body').addClass('dark');
        }
    })
    // load initial tweets from database
    loadTweets();
})
