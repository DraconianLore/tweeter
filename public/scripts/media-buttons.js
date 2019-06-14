// Check document is ready... all jQuery after this point!
$(document).ajaxStop(function () {
   
    $('.like').each((i, obj) => {
        /*
            NEED TO GET THIS WORKING!!!
        */
        const thisID = obj.parentNode.parentNode.parentNode.id
        // const check = db.collection('tweets').find("_id", "ObjectId" + thisID);
        // console.log(check)
        if ($(obj).attr('liked') === "true") {
            obj.style.opacity = 1;
        } else {
            obj.style.opacity = 0.5;
        }
    })
})
// Like button
$(".like").click((event) => {
    const likeHeart = event.currentTarget;
    if (likeHeart.style.opacity != 1) {
        likeHeart.style.opacity = 1;
        likeHeart.setAttribute('liked', 'true');

    } else {
        likeHeart.style.opacity = 0.5
        likeHeart.setAttribute('liked', 'false');
    }
})

