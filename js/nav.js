const hamburguer = document.querySelector(".hamburguer");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const menuItems = document.querySelectorAll(".nav-links li");

hamburguer.addEventListener("click", toggleMenu);

function toggleMenu(){
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
}

menuItems.forEach(menuItem => {
  menuItem.addEventListener("click", function(){
    navLinks.classList.remove("open");
    links.forEach(link => {
      link.classList.remove("fade");
    });
  });
});