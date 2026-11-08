// IMPORTANT: Replace this address with the email address where you want to receive enquiries.
const BUSINESS_EMAIL = "hello@example.com";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

document.querySelectorAll("[data-package]").forEach((button) => {
  button.addEventListener("click", () => {
    const serviceSelect = document.querySelector("#service");
    if (serviceSelect) {
      const packageName = button.dataset.package;
      serviceSelect.value = packageName === "Design bundle" ? "Graphic design" : "Website development";
      const message = document.querySelector("#message");
      if (message && !message.value) message.value = `I'm interested in the ${packageName} package.`;
    }
  });
});

const form = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (BUSINESS_EMAIL === "hello@example.com") {
      formNote.textContent = "Before using this form, replace hello@example.com in script.js with your real business email address.";
      formNote.style.color = "#a34b35";
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`New project enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nBudget: ${data.get("budget") || "Not specified"}\n\nProject details:\n${data.get("message")}`
    );

    formNote.textContent = "Your email app should open with the enquiry prepared. Please send the email to complete your enquiry.";
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
