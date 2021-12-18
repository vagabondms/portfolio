"use strict";

const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");
const contactMe = document.querySelector(".home__contact");
const contact = document.querySelector("#contact");

document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const halfOfNavHeight = navbar.getBoundingClientRect().height / 2;
  if (scrollPosition > halfOfNavHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

const scrollTo = (position) => {
  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
};

navbarMenu.addEventListener("click", (e) => {
  const element = document.querySelector(`#${e.target.dataset.id}`);
  if (element) {
    const position = element.getBoundingClientRect().top + window.scrollY - 70;
    scrollTo(position);
  }
  return;
});

contactMe.addEventListener("click", (e) => {
  const position = contact.getBoundingClientRect().top + window.scrollY;
  scrollTo(position);
});

const homeContainer = document.querySelector(".home__container");
document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const homeHeight = homeContainer.getBoundingClientRect().height;
  homeContainer.style.opacity = 1 - scrollY / homeHeight;
});
