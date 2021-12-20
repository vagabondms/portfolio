"use strict";

const querySelector = (string) => document.querySelector(string);
const querySelectorAll = (string) => document.querySelectorAll(string);

const navbar = querySelector("#navbar");
const contact = querySelector("#contact");

const navbarMenu = querySelector(".navbar__menu");
const contactMe = querySelector(".home__contact");
const arrowUp = querySelector(".arrow-up");
const works = querySelector(".work__categories");
const projectsContainer = querySelector(".work__projects");
const categoryBtns = querySelectorAll(".category__btn");
const projects = querySelectorAll(".project");
const navBarBtns = querySelectorAll(".navbar__menu__item");
const navbarToggleBtn = querySelector(".navbar__toggle--btn");
const homeContainer = querySelector(".home__container");

const getHalfNavHeight = () => navbar.getBoundingClientRect().height / 2;
const timeOut300 = (callback) => setTimeout(callback, 300);

/*
 * scroll시 Navbar 불투명하게 바꾸고, arrow-up 보여줌
 */
document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const halfNavHeight = getHalfNavHeight();

  if (scrollY > halfNavHeight) {
    navbar.classList.add("navbar--dark");
    navbarToggleBtn.classList.add("toggle--small");

    arrowUp.classList.add("arrow--dark");
  } else {
    navbar.classList.remove("navbar--dark");
    navbarToggleBtn.classList.remove("toggle--small");

    arrowUp.classList.remove("arrow--dark");
  }
});

/*
  TODO scroll시 Home 내부 contents들을 투명하게 -> 모든 내용을 투명하게로 변경
  참고 : https://mommoo.tistory.com/85
 */

document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const homeHeight = homeContainer.getBoundingClientRect().height;
  homeContainer.style.opacity = 1 - scrollY / homeHeight;
});

/*
 * works 버튼 클릭시 필터링
 */
works.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  // * projectContainer 전체에 out효과
  projectsContainer.classList.add("anim-out");

  /*
   * out을 animation이 끝난 이후 filtering을 한다. 이후 anim-out class를 제거하면서 다시 들어오는 효과 trigger
   */
  const callback = () => {
    projects.forEach((project) => {
      const type = project.dataset.type;

      if (filter === "*" || filter === type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectsContainer.classList.remove("anim-out");
  };

  timeOut300(callback);
});

works.addEventListener("click", (e) => {
  const active = querySelector(".category__btn.active");
  active.classList.remove("active");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("active");
});

let timer;
navbarToggleBtn.addEventListener("click", () => {
  /*
   * timer가 있는 상태 (shrink가 진행되고 있는 상태)에서 또다른 입력이 들어오면
   * 바로 return을 시켜서 반응하지 않음
   */
  if (timer) {
    return;
  }
  const navClassList = navbarMenu.classList;

  if (navClassList.contains("active")) {
    navClassList.remove("active");
    navClassList.add("shrink");

    const callback = () => {
      navClassList.remove("shrink");
      navClassList.add("hidden");
      timer = null;
    };

    timer = timeOut300(callback);
  } else {
    navClassList.remove("hidden");
    navClassList.add("active");
  }
});

/*
 * scroll interactions
 */

/*
  scroll시 현재 section에 맞게 nav-item에 활성화 표시를 하는 데에는 세 가지 arr가 동시에 사용된다. 

  1. ids 
  2. sections
  3. navbarItems

  2,3은 1번 배열에 의해 만들어진 것이다. 

  따라서, ids에서 특정 string의 index를 가져오면, 그것에 해당하는 section과 navbarItem을 가져올 수 있다.
 */

const ids = [
  "#home",
  "#about",
  "#skills",
  "#myWork",
  "#testimonials",
  "#contact",
];

const sections = ids.map((id) => querySelector(id));
const navbarItems = ids.map((id) =>
  querySelector(`.navbar__menu__item[data-id='${id}']`)
);

/**
  selectedNavIndex는 ids의 index
  selectedNavItem은 navbarItems에서 selectedNavIndex가 지칭하는 item.
 */
let selectedNavIndex = 0;
let selectedNavItem = navbarItems[0];

const selectNavItem = (index) => {
  selectedNavItem.classList.remove("active");
  selectedNavItem = navbarItems[index];
  selectedNavItem.classList.add("active");
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // intersecting하지 않는 것. 그리고, 무언가 겹치는 부분이 있는 것.
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = ids.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y > 0) {
        /* y가 0보다 크다는 것은 화면상 아래로 빠져나가고 있다는 것이므로, index에서 -1을 한다.
          (그래야 현재 보이는 section을 의미함)
         */
        selectedNavIndex = index - 1;
      } else {
        /* y가 0보다 작다는 것은 화면상 위로 빠져나가고 있다는 것이므로, index에서 +1을 한다.
          (그래야 현재 보이는 section을 의미함)
         */
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

// 모든 섹션들을 observer 구독시킴
sections.forEach((section) => {
  observer.observe(section);
});

//scrollEvent는 사용자가 scroll하는 것뿐 아니라 모든 scroll event를 의미한다.
// 반면 wheel은 사용자가 직접 조작하는 scroll을 의미한다.
document.addEventListener("wheel", (e) => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navbarItems.length - 1;
  }

  selectNavItem(selectedNavIndex);
});

const scrollTo = (position) => {
  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
};

arrowUp.addEventListener("click", () => {
  scrollTo(0);
  selectedNavIndex = 0;
  selectNavItem(selectedNavIndex);
});

navbarMenu.addEventListener("click", (e) => {
  const index = ids.indexOf(e.target.dataset.id);
  selectedNavIndex = index;
  selectNavItem(selectedNavIndex);
  const element = querySelector(`${e.target.dataset.id}`);
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
  selectNavItem(selectedNavIndex);
});
