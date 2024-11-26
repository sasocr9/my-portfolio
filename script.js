// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Sticky Navbar

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHeroEl);

//Smooth Scrolling
const allLinks = document.querySelectorAll(".main-nav-link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.getAttribute("href");
    if (id === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (id !== "#" && id.startsWith("#")) {
      const sectionEl = document.querySelector(id);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

//Hero buttons
const heroLinks = document.querySelectorAll(".hero-btn");
console.log(heroLinks);

heroLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.getAttribute("href");

    if (id !== "#" && id.startsWith("#")) {
      const sectionEl = document.querySelector(id);
      if (sectionEl) {
        const offset = -30; // 2rem in pixels (assuming 1rem = 16px)
        const sectionPosition =
          sectionEl.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        });
      }
    }
  });
});

//Reveal Sections
const allSections = document.querySelectorAll(".reveal");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("reveal--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("reveal--hidden");
});
