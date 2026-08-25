function handleFormSubmit() {
  const statusEl = document.getElementById("form-status");
  if (!statusEl) return;
  statusEl.textContent = "Thanks! Your request has been noted. Update this form to hook it up to email or a CRM.";
}

function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const viewport = carousel.querySelector(".image-carousel-viewport");
    const prevBtn = carousel.querySelector(".carousel-arrow--prev");
    const nextBtn = carousel.querySelector(".carousel-arrow--next");

    if (slides.length <= 1) {
      prevBtn?.setAttribute("hidden", "");
      nextBtn?.setAttribute("hidden", "");
      return;
    }

    let index = 0;
    let touchStartX = 0;

    const showSlide = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
    };

    prevBtn?.addEventListener("click", () => showSlide(index - 1));
    nextBtn?.addEventListener("click", () => showSlide(index + 1));

    viewport?.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    viewport?.addEventListener(
      "touchend",
      (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) < 50) return;

        if (deltaX < 0) {
          showSlide(index + 1);
        } else {
          showSlide(index - 1);
        }
      },
      { passive: true }
    );
  });
}

function buildGallery(containerEl, images, itemName) {
  if (!containerEl || !images.length) return false;

  const slides = images
    .map(
      (src, index) => `
        <figure class="carousel-slide${index === 0 ? " is-active" : ""}">
          <img src="${src}" alt="${itemName ? `${itemName} photo ${index + 1}` : `Product photo ${index + 1}`}" />
        </figure>`
    )
    .join("");

  containerEl.innerHTML = `
    <div class="image-carousel order-item-carousel" data-carousel>
      <div class="image-carousel-viewport">
        <button type="button" class="carousel-arrow carousel-arrow--prev" aria-label="Previous image">‹</button>
        <div class="carousel-track">${slides}</div>
        <button type="button" class="carousel-arrow carousel-arrow--next" aria-label="Next image">›</button>
      </div>
    </div>`;
  containerEl.hidden = false;
  return true;
}

function buildOrderGallery(images, itemName) {
  const galleryEl = document.getElementById("order-item-gallery");
  if (!galleryEl || !images.length) return;

  if (buildGallery(galleryEl, images, itemName)) {
    initCarousels();
  }
}

function initContactPage() {
  const titleEl = document.getElementById("contact-title");
  const pointsEl = document.getElementById("contact-points");

  if (!titleEl || !pointsEl) return;

  const serviceContent = {
    general: {
      title: "Request a free quote",
      points: [
        "Lawn mowing and hedge trimming",
        "Front and back gardens welcome",
        "Lakeside, Swindon area only",
      ],
    },
    lawn: {
      title: "Request a free quote",
      points: [
        "Weekly lawn mowing and edging",
        "Front and back gardens welcome",
        "Lakeside, Swindon area only",
      ],
    },
    hedge: {
      title: "Request a free quote for hedge work",
      points: [
        "Hedge trimming and reduction",
        "Neat shaping and height management",
        "Lakeside, Swindon area only",
      ],
    },
    clearance: {
      title: "Request a free quote for garden clearance",
      points: [
        "Garden clearance for a fresh start in your garden",
        "Get it back to manageable",
        "Lakeside, Swindon area only",
      ],
    },
  };

  const service = new URLSearchParams(window.location.search).get("service");
  const content = serviceContent[service] || serviceContent.general;

  titleEl.textContent = content.title;
  pointsEl.innerHTML = content.points.map((point) => `<li>${point}</li>`).join("");

  const setMetaDescription = (text) => {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", text);
  };

  if (service === "lawn") {
    const imageEl = document.getElementById("contact-service-image");
    if (imageEl) imageEl.hidden = false;
    document.title =
      "Lawn Maintenance Quote | SLM Garden Maintenance Lakeside, Swindon";
    setMetaDescription(
      "Request a lawn maintenance quote in Lakeside, Swindon. Weekly mowing and edging. Call or text 07769 091 748."
    );
  }

  if (service === "hedge") {
    document.title =
      "Hedge Trimming Quote | SLM Garden Maintenance Lakeside, Swindon";
    setMetaDescription(
      "Request a hedge trimming or reduction quote in Lakeside, Swindon. Call or text 07769 091 748."
    );
  }

  if (service === "clearance") {
    document.title =
      "Garden Clearance Quote | SLM Garden Maintenance Lakeside, Swindon";
    setMetaDescription(
      "Request a garden clearance quote in Lakeside, Swindon. Call or text 07769 091 748."
    );
  }
}

function initOrderPage() {
  const titleEl = document.getElementById("order-item-title");
  const sizeEl = document.getElementById("order-item-size");
  const priceEl = document.getElementById("order-item-price");
  const descriptionEl = document.getElementById("order-item-description");
  const galleryEl = document.getElementById("order-item-gallery");
  const unavailableEl = document.getElementById("order-item-image-unavailable");
  const textLinkEl = document.getElementById("order-text-link");

  if (!titleEl) return;

  const backLinkEl = document.getElementById("order-back-link");
  const from = new URLSearchParams(window.location.search).get("from");
  if (backLinkEl && from === "bin-sheds") {
    backLinkEl.href = "bin-sheds.html";
    backLinkEl.textContent = "← Back to bin sheds / log stores";
  }

  const timberNote =
    "Handmade garden planter made with a very high quality treated timber - built to last outdoors.";

  const planterDescriptions = {
    "Planter with privacy board":
      `Handmade planter with a tall privacy board — ideal for screening your garden while adding planting space.\n\n${timberNote}`,
    "Planter with trellis":
      `Planter with a built-in trellis, perfect for climbing plants and adding height to your garden.\n\n${timberNote}`,
    "Small planter box":
      `Compact handmade planter for smaller spaces and patios.\n\n${timberNote}`,
    "Medium planter box":
      `Versatile medium-sized planter for gardens, patios, and driveways.\n\n${timberNote}`,
    "Big planter box":
      `Larger planter with extra depth for bigger displays and more root space.\n\n${timberNote}`,
    "Flower box for privacy wall":
      "Small flower box that attaches to the privacy wall planter for extra planting.",
    "Natural stain":
      "Natural Danish oil to protect and prolong the life of the wood giving it a classy finish.",
    "Hook for blue bag 1":
      "Wall-mounted hook for hanging a blue recycling bag on your bin shed.",
    "Hook for blue bag 2":
      "Screw-in hook for hanging a blue recycling bag on your bin shed.",
    "Wheels for planters":
      "Durable hard wearing wheels to make moving your planters that little bit easier.",
    "Compost for planters":
      "Quality compost supplied to suit the size of your planter.",
    "Liner for planter":
      "To prolong the life of the planter even longer, add this breathable membrane that lets water escape and lowers the chance of rotting.",
    "Bin shed with 2 boxes":
      "Handmade bin shed with 2 boxes to keep your wheelie bins neat, tidy, and screened from view.",
    "Bin shed with 3 boxes":
      "Handmade bin shed with 3 boxes for wheelie bins — neat storage that keeps your front garden looking tidy.",
    "Bin shed with 4 boxes":
      "Handmade bin shed with 4 boxes for wheelie bins, built to keep bins organised and out of sight.",
    "Log store":
      "Sturdy log store to keep firewood dry, ventilated, and ready to use.",
    "Large log store":
      "Larger log store with extra capacity for stacking more firewood while keeping it dry.",
  };

  const params = new URLSearchParams(window.location.search);
  const item = params.get("item");
  const size = params.get("size");
  const price = params.get("price");
  const images = params.getAll("image").filter(Boolean);

  if (item) {
    titleEl.textContent = item;
    document.title = `${item} | SLM Garden Maintenance Swindon`;
    const desc =
      (planterDescriptions[item] || "").replace(/\n+/g, " ").trim() ||
      `Enquire about ${item} from SLM Garden Maintenance in Lakeside, Swindon. Call 07769 091 748.`;
    const meta = document.getElementById("meta-description");
    if (meta) meta.setAttribute("content", desc.slice(0, 160));
    const ogTitle = document.getElementById("og-title");
    if (ogTitle) ogTitle.setAttribute("content", `${item} | SLM Garden Maintenance`);
    const ogDesc = document.getElementById("og-description");
    if (ogDesc) ogDesc.setAttribute("content", desc.slice(0, 160));
  }

  if (descriptionEl) {
    descriptionEl.textContent =
      (item && planterDescriptions[item]) ||
      "Tap below on your phone to call or text about this item.";
  }

  if (sizeEl && size) {
    sizeEl.textContent = size;
    sizeEl.hidden = false;
  }

  if (images.length) {
    buildOrderGallery(images, item);
    if (unavailableEl) unavailableEl.hidden = true;
  } else if (item && unavailableEl) {
    if (galleryEl) {
      galleryEl.innerHTML = "";
      galleryEl.hidden = true;
    }
    unavailableEl.hidden = false;
  }

  if (priceEl && price) {
    priceEl.textContent = price;
    priceEl.hidden = false;
  }

  if (textLinkEl && item) {
    const message = `Hi, I'm interested in ${item}.`;
    textLinkEl.href = `sms:07769091748?body=${encodeURIComponent(message)}`;
  }
}

function initPlanterSlideshow() {
  const box = document.querySelector("[data-planter-slideshow]");
  if (!box) return;

  const slideEls = box.querySelectorAll("[data-planter-slide]");
  const priceEl = box.querySelector("[data-planter-price]");
  if (slideEls.length < 2) return;

  const slides = [
    {
      src: "assets/planter-privacy-wall-1.png",
      alt: "Handmade wooden planter box with privacy board",
      price: "£90",
    },
    {
      src: "assets/planter-medium-1.png",
      alt: "Handmade medium wooden planter box",
      price: "£50",
    },
    {
      src: "assets/planter-small-1.png",
      alt: "Handmade small wooden planter box",
      price: "£40",
    },
  ];

  slides.forEach((slide) => {
    const preload = new Image();
    preload.src = slide.src;
  });

  let index = 0;
  let showFirst = true;

  const updatePrice = (price) => {
    if (!priceEl) return;
    priceEl.textContent = price;
  };

  const showSlide = (nextIndex) => {
    const nextSlide = slides[nextIndex];
    const incoming = showFirst ? slideEls[1] : slideEls[0];
    const outgoing = showFirst ? slideEls[0] : slideEls[1];

    incoming.src = nextSlide.src;
    incoming.alt = nextSlide.alt;
    incoming.classList.add("is-active");
    outgoing.classList.remove("is-active");
    updatePrice(nextSlide.price);
    showFirst = !showFirst;
  };

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 15000);
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initCarousels();
  initContactPage();
  initOrderPage();
  initPlanterSlideshow();
});

