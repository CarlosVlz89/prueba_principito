/* animations.js - Custom Scroll Animations and Fallbacks */

export function initScrollAnimations() {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 2. Scroll Reveal using IntersectionObserver (highly stable across all browsers including Safari iOS)
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null, // Viewport
    threshold: 0.05, // Lower threshold for mobile screen responsiveness
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3. Mobile Hamburger Menu Toggle Lógica
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("header nav");
  const navLinks = document.querySelectorAll("header nav a");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      if (navMenu.classList.contains("open")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }
}
