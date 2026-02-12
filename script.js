/* =========================
   Loader
========================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});


/* =========================
   Mobile Navigation
========================= */

const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links");

if (hamburger && navLinksContainer) {
  hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("show");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("show");
    });
  });
}


/* =========================
   Universal Modal System
========================= */

const projectCards = document.querySelectorAll(".project-card");
const modals = document.querySelectorAll(".project-modal");
const closeButtons = document.querySelectorAll(".close-modal");

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // lock scroll
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = ""; // restore scroll
}

projectCards.forEach(card => {
  card.addEventListener("click", () => {
    const modalId = card.getAttribute("data-modal");
    openModal(modalId);
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    closeModal(btn.closest(".project-modal"));
  });
});

modals.forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal(modal);
  });
});

/* =========================
   Swipe Down to Close (Mobile)
========================= */

let touchStartY = 0;
let touchCurrentY = 0;
let isSwiping = false;

modals.forEach(modal => {
  const content = modal.querySelector(".modal-content");

  if (!content) return;

  content.addEventListener("touchstart", e => {
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
  });

  content.addEventListener("touchmove", e => {
    if (!isSwiping) return;

    touchCurrentY = e.touches[0].clientY;
    const delta = touchCurrentY - touchStartY;

    // Only swipe downward
    if (delta > 0) {
      content.style.transform =
        `translateY(${delta}px) scale(0.98)`;
    }
  });

  content.addEventListener("touchend", () => {
    if (!isSwiping) return;

    const delta = touchCurrentY - touchStartY;

    // If swipe is strong enough → close
    if (delta > 120) {
      closeModal(modal);
    } else {
      // Snap back with spring feel
      content.style.transition =
        "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
      content.style.transform = "";
    }

    isSwiping = false;
  });
});


/* ESC key close (desktop) */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".project-modal.active")
      .forEach(closeModal);
  }
});


/* =========================
   Scroll Reveal Animation
========================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));


/* =========================
   Smooth Scroll Navigation
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(
      anchor.getAttribute("href")
    );

    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 90,
      behavior: "smooth"
    });
  });
});


/* =========================
   Active Nav Highlight
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


/* =========================
   Scroll Progress Bar
========================= */

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progressBar = document.getElementById("progress-bar");

  if (progressBar) {
    progressBar.style.width =
      (scrollTop / height) * 100 + "%";
  }
});


/* =========================
   Hero Parallax (safe)
========================= */

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const parallax = document.querySelector(".parallax");

  if (parallax) {
    parallax.style.transform =
      `translateY(${y * 0.3}px)`;
  }
});
