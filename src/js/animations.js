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

  // 2. Fallback for Scroll Reveal (IntersectionObserver)
  // Check if browser natively supports Scroll-Driven Animations in CSS
  const supportsScrollTimeline = CSS.supports && CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  if (!supportsScrollTimeline) {
    // JS Fallback for revealing elements on scroll
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optionally unobserve after showing
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null, // Viewport
      threshold: 0.15, // Trigger when 15% visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before entering fully
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    // JS Fallback for Parallax Asteroids
    const parallaxElements = document.querySelectorAll(".parallax-fallback");
    if (parallaxElements.length > 0) {
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.getAttribute("data-speed")) || 0.1;
          const yPos = -(scrollY * speed);
          el.style.transform = `translateY(${yPos}px)`;
        });
      });
    }
  } else {
    // If supported, add scroll-reveal class to matching elements
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach(el => {
      el.classList.add("scroll-reveal");
    });
  }
}
