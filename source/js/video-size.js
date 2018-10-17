var videoForLargeScreen = {
    "video__mp4": "/images/tree_seasons_full_compression.mp4",
    "video__webm": "/images/tree_seasons_full_compression.webm",
    "video__ogg": "/images/tree_seasons_full_compression.ogv"
}

var videoWrap = document.querySelector(".video__wrap");

if(window.matchMedia("(min-width: 768px)").matches){

    for(var key in videoForLargeScreen) {
        let sourceVideo = document.querySelector("." + key);
        sourceVideo.src = videoForLargeScreen[key];
        videoWrap.load();
    }

}
