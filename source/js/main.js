var jobsDate = document.querySelectorAll(".education__wrap-dates");

if (window.matchMedia("(min-width: 600px) and (max-width: 1200px)").matches) {
    for (let i = 0; i < jobsDate.length; i +=2){
        jobsDate[i].classList.add("education__dates-line");
    }
}
