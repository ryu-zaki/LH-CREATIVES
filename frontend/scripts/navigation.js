/* Menu and Slider Functionality */
const menuSlider = document.querySelector("[data-menu-slider]");
const menuControls = document.querySelectorAll("[data-menu-controls]");
const overlayCloser = document.querySelector('.overlayCloser');

menuControls.forEach(btn => {
    btn.addEventListener('click', ({target}) => {
        if (target.id == "open") {
            menuSlider.classList.add("active");
            overlayCloser.classList.add("active");
            return;
        }

        menuSlider.classList.remove("active");
        overlayCloser.classList.remove("active");
    })
})

const signInBtn = document.querySelector("[data-signin-btn]");

signInBtn.addEventListener('click', () => {
    window.location.assign("/signin")
});

const homeBtn = document.querySelectorAll(".nav-logo-text");
homeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.assign("/")
    })
})
