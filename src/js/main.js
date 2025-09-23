document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");

    // Navbar shrink on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");
        }
    });

    // Helper: current navbar height
    function getNavHeight() {
        return navbar.getBoundingClientRect().height;
    }

    // Smooth scrolling with offset
    document.querySelectorAll('#navbar ul a').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();
            const id = anchor.getAttribute("href").slice(1);
            const section = document.getElementById(id);
            if (section) {
                const y = window.scrollY + section.getBoundingClientRect().top - getNavHeight();
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        });
    });

    // Hero carousel
    let heroIndex = 0;
    const heroSlides = document.querySelectorAll(".hero-slide");

    function showHeroSlide(n) {
        heroSlides.forEach(s => s.classList.remove("active"));
        heroSlides[n].classList.add("active");
    }

    document.querySelector(".hero-next").addEventListener("click", () => {
        heroIndex = (heroIndex + 1) % heroSlides.length;
        showHeroSlide(heroIndex);
    });

    document.querySelector(".hero-prev").addEventListener("click", () => {
        heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
        showHeroSlide(heroIndex);
    });

    showHeroSlide(heroIndex);

    // Modals
    const openModalButtons = document.querySelectorAll(".open-modal");
    const modals = document.querySelectorAll(".modal");

    openModalButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = "flex";
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector(".close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    });

    window.addEventListener("click", e => {
        modals.forEach(modal => {
            if (e.target === modal) modal.style.display = "none";
        });
    });

    window.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            modals.forEach(modal => (modal.style.display = "none"));
        }
    });

    // Position indicator
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        const navH = getNavHeight();

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navH - 10;
            if (scrollY >= sectionTop) current = section.id;
        });

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            current = sections[sections.length - 1].id;
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});