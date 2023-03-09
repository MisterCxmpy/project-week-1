let activeImageId = 1;
let nextImageId = 1;

setInterval(function() {
    nextImageId++
    
    if (nextImageId < 2) {
        document.querySelector("#img"+activeImageId).classList.replace("visable", "hidden")
        document.querySelector("#img"+nextImageId).classList.replace("hidden", "visable")

        activeImageId = nextImageId
    } else {
        document.querySelector("#img"+activeImageId).classList.replace("visable", "hidden")
        document.querySelector("#img"+nextImageId).classList.replace("hidden", "visable")

        activeImageId = 2;
        nextImageId = 0
    }
}, 1000)