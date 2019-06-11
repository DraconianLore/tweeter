
$(document).ready(function () {
    $("#tweet-text").keyup(function() {
        // set sibling counter as target
        let counter = this.parentNode.childNodes[5];

        counter.innerHTML = 140 - this.value.length;
        if (this.value.length > 140) {
            counter.style.color = 'red'
        } else {
            counter.style.color = 'black';
        }

    });
});