console.log("JavaScript is working!");

// Navbar shrink on scroll
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// scrolling
document.querySelectorAll('#navbar a').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const id = this.getAttribute("href");
        const section = document.querySelector(id);
        section.scrollIntoView({
            behavior: "smooth"
        });
    });
});
// Hero Carousel
let heroIndex = 0;
const heroSlides = document.querySelectorAll(".hero-slide");

const showHeroSlide = (n) => {
    heroSlides.forEach(s => s.classList.remove("active"));
    heroSlides[n].classList.add("active");
};

document.querySelector(".hero-next").addEventListener("click", () => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(heroIndex);
});

document.querySelector(".hero-prev").addEventListener("click", () => {
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(heroIndex);
});

// Initialize
showHeroSlide(heroIndex);

// Carousel
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const showSlide = (n) => {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[n].classList.add("active");
};
document.querySelector(".next").addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});
document.querySelector(".prev").addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
});
showSlide(slideIndex);

// Modal
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

openBtn.addEventListener("click", () => { modal.style.display = "flex"; });
closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", (e) => {
    if (e.target == modal) modal.style.display = "none";
});

// Position indicator (highlight navbar links on scroll)
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar ul li a");

window.addEventListener("scroll", () => {

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;

        if (scrollY >= sectionTop) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});