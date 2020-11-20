////////////////////// NAVBAR //////////////////
const navToggleButton = document.querySelector('.nav-toggle i');

navToggleButton.addEventListener('click', () => {
    let x = document.querySelector('.navbar-buttons');
    if(x.className === "navbar-buttons")
        x.className = "navbar-buttons show";
    else if(x.className === "navbar-buttons show")
        x.className = "navbar-buttons";

    if(navToggleButton.className === "fa fa-bars")
        navToggleButton.className = "fa fa-close";
    else
        navToggleButton.className = "fa fa-bars";
});