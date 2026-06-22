function handleFormSubmit() {
  const statusEl = document.getElementById("form-status");
  if (!statusEl) return;
  statusEl.textContent = "Thanks! Your request has been noted. Update this form to hook it up to email or a CRM.";
}

function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-arrow--prev");
    const nextBtn = carousel.querySelector(".carousel-arrow--next");

    if (slides.length <= 1) {
      prevBtn?.setAttribute("hidden", "");
      nextBtn?.setAttribute("hidden", "");
      return;
    }

    let index = 0;

    const showSlide = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
    };

    prevBtn?.addEventListener("click", () => showSlide(index - 1));
    nextBtn?.addEventListener("click", () => showSlide(index + 1));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initCarousels();
});

