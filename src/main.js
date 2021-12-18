"use strict";

const navbar = document.querySelector("#navbar");

document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const halfOfNavHeight = navbar.getBoundingClientRect().height / 2;
  if (scrollPosition > halfOfNavHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

navbar.addEventListener("click", (e) => {
  const element = document.querySelector(`#${e.target.dataset.id}`);
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - 70,
    behavior: "smooth",
  });

  // window.scrollTo(0, position);
});
