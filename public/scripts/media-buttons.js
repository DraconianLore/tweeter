// Check document is ready... all jQuery after this point!
$(document).ajaxStop(function () {
   
    $('.like').each((i, obj) => {
        /*
            NEED TO GET THIS WORKING!!!
        */
       // const check = db.collection('tweets').find("_id", "ObjectId" + thisID);
       // console.log(check)
       if ($(obj).attr('liked') === "true") {
           obj.style.opacity = 1;
        } else {
            obj.style.opacity = 0.5;
        }
    })
    // Like button
    $(".like").click((event) => {
        const likeHeart = event.currentTarget;
        const thisID = likeHeart.parentNode.parentNode.parentNode.id
        let updateDB;
        if (likeHeart.style.opacity != 1) {
            likeHeart.style.opacity = 1;
            likeHeart.setAttribute('liked', 'true');
            updateDB = {
                'id' : thisID,
                'status' : 'true'
            }
        } else {
            likeHeart.style.opacity = 0.5
            likeHeart.setAttribute('liked', 'false');
            updateDB = {
                'id' : thisID,
                'status' : 'false'
            }
        }
        $.post("/tweets/like", updateDB)
    })
})
    
