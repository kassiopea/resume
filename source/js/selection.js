var allCertificatesButton = document.querySelectorAll(".certificates__nav-item");
var allCertificatesImg = document.querySelectorAll(".certificates__wrap-img");
var wrapCertificatesImg = document.querySelector(".certificates__wrap-images ");

function closeBlockImg (item) {
    allCertificatesImg[item].classList.add("certificates__closed");
}

function openBlockImg (item) {
    allCertificatesImg[item].classList.remove("certificates__closed");
}

function blockHidden () {
    wrapCertificatesImg.classList.remove("certificates__visible");
    wrapCertificatesImg.classList.add("certificates__hidden");
}

function blockVisible () {
    wrapCertificatesImg.classList.remove("certificates__hidden");
    wrapCertificatesImg.classList.add("certificates__visible");
}
function animationElem(hashElem){
    if (hashElem == "all") {
        for (let i = 0; i < allCertificatesImg.length; i++) {
            openBlockImg(i);
        }
    }
    else {
        for (let i = 0; i < allCertificatesImg.length; i++) {
            if(allCertificatesImg[i].classList.contains(hashElem)) {
                openBlockImg(i);
            }
            else {
                closeBlockImg(i);
            }
        }
    }
}


function addClassActive (item) {
    for (let i = 0; i < allCertificatesButton.length; i++){
        if(i === item){
            allCertificatesButton[i].classList.add("cert-active");
        }
        else{
            allCertificatesButton[i].classList.remove("cert-active");
        }
    }
}

for (let i = 0; i < allCertificatesButton.length; i++){
    allCertificatesButton[i].addEventListener("click", function(e){
        e.preventDefault();
        let hashElem = (allCertificatesButton[i].hash).substring(1);
        addClassActive(i);
        blockHidden();
        setTimeout(animationElem, 1000, hashElem);
        setTimeout(blockVisible, 1000);
    });
}
