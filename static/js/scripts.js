// static/js/scripts.js

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      const headerOffset = document.querySelector("header").offsetHeight;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset + 10;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close the burger menu if open
      const nav = document.querySelector(".nav-links");
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        document.querySelector(".burger").classList.remove("toggle");
      }
    });
  });

  // Burger Menu Toggle
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    burger.classList.toggle("toggle");
  });

  // Scroll Animations (Optional Enhancement)
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll(
    ".hero-content, .about-container, .project-card, form"
  );
  hiddenElements.forEach((el) => observer.observe(el));
});
