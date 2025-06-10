export function initNavigationToggle() {
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("mobile-nav");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("hidden");
    });
  }
}
