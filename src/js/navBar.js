const menuToggle = document.getElementById("menu_toggle");
const navLinks = document.getElementById("nav_links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

const links = document.querySelectorAll(".header .link");
links.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
