"use strict";

const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");
const contactMe = document.querySelector(".home__contact");
const contact = document.querySelector("#contact");
const arrow = document.querySelector(".arrow-up");
const works = document.querySelector(".work__categories");
const projectsContainer = document.querySelector(".work__projects");
const categoryBtns = document.querySelectorAll(".category__btn");
const projects = document.querySelectorAll(".project");
const navBarBtns = document.querySelectorAll(".navbar__menu__item");
const navbarToggleBtn = document.querySelector(".navbar__toggle--btn");
document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const halfOfNavHeight = navbar.getBoundingClientRect().height / 2;
  if (scrollPosition > halfOfNavHeight) {
    navbar.classList.add("navbar--dark");
    navbarToggleBtn.classList.add("toggle--dark");
  } else {
    navbar.classList.remove("navbar--dark");
    navbarToggleBtn.classList.remove("toggle--dark");
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
    navbarMenu.classList.remove("active");
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
document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 300) {
    arrow.classList.add("arrow--dark");
  } else {
    arrow.classList.remove("arrow--dark");
  }
});
arrow.addEventListener("click", () => {
  scrollTo(0);
});

works.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  projectsContainer.classList.add("anim-out");

  setTimeout(() => {
    projects.forEach((project) => {
      const type = project.dataset.type;

      if (filter === "*" || filter === type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectsContainer.classList.remove("anim-out");
  }, 300);
});

works.addEventListener("click", (e) => {
  const active = document.querySelector(".category__btn.active");
  active.classList.remove("active");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("active");
});

const home = document.querySelector("section#home");
const about = document.querySelector("section#about");
const skills = document.querySelector("section#skills");
const myWork = document.querySelector("section#myWork");
const testimonials = document.querySelector("section#testimonials");

document.addEventListener("scroll", (e) => {
  const scrollPosition = window.scrollY;
  console.log(window.scrollY);
  const positions = [home, about, skills, myWork, testimonials].map(
    (position) => {
      return position.getBoundingClientRect().top - 70 + window.scrollY;
    }
  );

  const current =
    [...positions, positions[4] + 30].filter((position) => {
      return position <= scrollPosition;
    }).length - 1;

  const active = document.querySelector(".navbar__menu__item.active");
  if (active) {
    active.classList.remove("active");
  }
  const btns = document.querySelectorAll(".navbar__menu__item");
  btns[current].classList.add("active");
});

navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});
