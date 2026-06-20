function handleFormSubmit() {
  const statusEl = document.getElementById("form-status");
  if (!statusEl) return;
  statusEl.textContent = "Thanks! Your request has been noted. Update this form to hook it up to email or a CRM.";
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

