// Check document is ready... all jQuery after this point!
$(document).ajaxStop(function () {

    $('.like').each((i, obj) => {
        if ($(obj).attr('liked') === "true") {
            obj.style.opacity = 1;
            obj.childNodes[1].innerText = 1;
        } else {
            obj.style.opacity = 0.5;
            obj.childNodes[1].innerText = 0;
        }
    })
    // Like button
    $(".like").click((event) => {
        event.preventDefault();
        const likeHeart = event.currentTarget;
        const thisID = likeHeart.parentNode.parentNode.parentNode.id
        let updateDB;
        if (likeHeart.style.opacity != 1) {
            likeHeart.style.opacity = 1;
            likeHeart.setAttribute('liked', 'true');
            likeHeart.childNodes[1].innerText = 1;
            updateDB = {
                'id': thisID,
                'status': 'true'
            }
        } else {
            likeHeart.style.opacity = 0.5
            likeHeart.setAttribute('liked', 'false');
            likeHeart.childNodes[1].innerText = 0;
            updateDB = {
                'id': thisID,
                'status': 'false'
            }
        }

        $.ajax({
            url: '/tweets/like',
            type: 'PUT',
            data: updateDB
        });
    })
})

