
// PWA Event
window.addEventListener('load', () => {
    registerSW();
});

async function registerSW(){
    if ('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('./sw.js');
    } catch(e){
        console.log('SW registration failed');
    };
}};

// Hamburger Script
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', ()=>{
        document.body.classList.remove('nav-open');
    });
});

async function registerSW(){
    if ('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('./sw.js');
    } catch(e){
        console.log('SW registration failed');
    };
}};