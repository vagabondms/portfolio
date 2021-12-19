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

navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});

/*
 * scroll interactions
 */

const ids = [
  "#home",
  "#about",
  "#skills",
  "#myWork",
  "#testimonials",
  "#contact",
];

const sections = ids.map((id) => document.querySelector(id));
const navbarItems = ids.map((id) =>
  document.querySelector(`.navbar__menu__item[data-id='${id}']`)
);

let selectedNavIndex = 0;
let selectedNavItem = navbarItems[0];

const selectNavItem = (selected) => {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = ids.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y > 0) {
        selectedNavIndex = index - 1;
      } else {
        selectedNavIndex = index + 1;
      }
    }
  });
};

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => {
  observer.observe(section);
});
document.addEventListener("wheel", (e) => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navbarItems.length - 1;
  }
  const selected = navbarItems[selectedNavIndex];
  selectNavItem(selected);
});

const scrollTo = (position) => {
  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
};

arrow.addEventListener("click", () => {
  scrollTo(0);
  selectedNavIndex = 0;
  const selected = navbarItems[selectedNavIndex];
  selectNavItem(selected);
});

navbarMenu.addEventListener("click", (e) => {
  const index = ids.indexOf(e.target.dataset.id);
  selectedNavIndex = index;
  selectNavItem(navbarItems[selectedNavIndex]);
  const element = document.querySelector(`${e.target.dataset.id}`);
  if (element) {
    const position = element.getBoundingClientRect().top + window.scrollY;
    navbarMenu.classList.remove("active");
    scrollTo(position);
    return;
  }
  return;
});

contactMe.addEventListener("click", (e) => {
  const position = contact.getBoundingClientRect().top + window.scrollY;
  scrollTo(position);
  selectedNavIndex = navbarItems.length - 1;
  const selected = navbarItems[selectedNavIndex];
  selectNavItem(selected);
});
