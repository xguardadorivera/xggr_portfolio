/* =============================================
   PORTFOLIO TEMPLATE — CUSTOM SCRIPTS
   Light vanilla JavaScript for interactivity.
   No frameworks required.
   ============================================= */

(function () {
  "use strict";

  /* -------------------------------------------
       1. UPDATE FOOTER YEAR AUTOMATICALLY
    ------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------
       2. NAVBAR — scroll shadow & active link
    ------------------------------------------- */
  const navbar = document.getElementById("mainNav");

  // Add/remove "scrolled" class for a heavier shadow
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      highlightActiveLink();
    },
    { passive: true }
  );

  // Highlight the nav link whose section is currently in view
  function highlightActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#mainNav .nav-link");
    const scrollPos = window.scrollY + 100; // 100px offset for fixed navbar

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Run once on load to set the initial active link
  highlightActiveLink();

  /* -------------------------------------------
       3. NAVBAR — collapse menu after clicking
          a link on mobile (UX improvement)
    ------------------------------------------- */
  const navbarCollapse = document.getElementById("navbarLinks");
  const navLinks = document.querySelectorAll("#navbarLinks .nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Only collapse if the toggler is visible (i.e. we're on mobile)
      const toggler = document.querySelector(".navbar-toggler");
      if (toggler && getComputedStyle(toggler).display !== "none") {
        // Use Bootstrap's collapse API to close the menu
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  /* -------------------------------------------
       4. SCROLL REVEAL ANIMATION
          Elements with class "reveal" fade up
          as they enter the viewport.
    ------------------------------------------- */
  function initReveal() {
    // Add the reveal class to elements we want to animate
    const revealTargets = [
      // Hero content is excluded — it should be visible immediately
      ".about-img-wrapper",
      ".about-facts",
      ".about-facts li",
      ".skill-card",
      ".project-card",
      ".contact-link",
      ".section-header",
    ];

    revealTargets.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el, index) {
        el.classList.add("reveal");
        // Stagger items within the same parent (up to 5 steps)
        const delay = (index % 5) + 1;
        el.classList.add("reveal-delay-" + delay);
      });
    });

    // IntersectionObserver to trigger animations
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Unobserve after revealing so it only animates once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  // 📍 IF YOU WOULD LIKE TO INCLUDE SUBTLE 'REVEAL' ANIMATIONS THROUGHOUT THE PAGE, UNCOMMENT (MAKE ACTIVE) THE CODE BELOW:

//   if ("IntersectionObserver" in window) {
//     initReveal();
//   } else {
//     document.querySelectorAll(".reveal").forEach(function (el) {
//       el.classList.add("visible");
//     });
//   }

  /* -------------------------------------------
       5. ABOUT IMAGE — graceful fallback
          Shows a placeholder when no image is set.
    ------------------------------------------- */
  const aboutImg = document.querySelector(".about-img");
  if (aboutImg) {
    // If the src attribute is empty or points to a missing file, show fallback
    if (!aboutImg.getAttribute("src") || aboutImg.getAttribute("src") === "") {
      showAboutPlaceholder();
    }

    aboutImg.addEventListener("error", function () {
      showAboutPlaceholder();
    });
  }

  function showAboutPlaceholder() {
    if (aboutImg) {
      aboutImg.style.display = "none";
    }
    const placeholder = document.querySelector(".about-img-placeholder");
    if (placeholder) {
      placeholder.style.display = "flex";
    }
  }

  /* -------------------------------------------
       6. PROJECT IMAGES — graceful fallback
          Shows placeholder icon when no image set.
    ------------------------------------------- */
  document.querySelectorAll(".project-img").forEach(function (img) {
    if (!img.getAttribute("src") || img.getAttribute("src") === "") {
      img.classList.add("img-error");
    }

    img.addEventListener("error", function () {
      img.classList.add("img-error");
    });
  });
})();