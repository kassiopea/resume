var jobsDate = document.querySelectorAll(".jobs__wrap-dates");

if (window.matchMedia("(min-width: 768px) and (max-width: 1200px)").matches) {
    for (let i = 0; i < jobsDate.length; i +=2){
        jobsDate[i].classList.add("jobs__dates-line");
    }
}
