// loader

window.addEventListener("load", () => {
  const loader = document.getElementById("sb-loader");

  setTimeout(() => {
    loader.classList.add("hide");

    // optional: remove from DOM completely after animation
    setTimeout(() => {
      loader.remove();
    }, 700); // match CSS transition
  }, 2100);
});

// <!-- ROUNDED NAVBAR ANIMATION JS -->

const navbar = document.getElementById("navbar");
const home = document.getElementById("home");

let isFlat = false;

const observer = new IntersectionObserver(
  ([entry]) => {
    // SCROLL DOWN → HOME OUT
    if (!entry.isIntersecting && !isFlat) {
      isFlat = true;

      gsap.fromTo(
        navbar,
        {
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
        },
      );
    }

    // SCROLL UP → HOME IN
    if (entry.isIntersecting && isFlat) {
      isFlat = false;

      gsap.to(navbar, {
        duration: 0.8,
        ease: "power3.out",
      });
    }
  },
  {
    threshold: 0,
    rootMargin: "-100px 0px 0px 0px",
  },
);

observer.observe(home);

//  NAVBAR GSAP

gsap.registerPlugin(ScrollTrigger);

//  ELEMENTS
const submenus = document.querySelectorAll(".submenu");
const toggles = document.querySelectorAll(".submenu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");
const mobileClose = document.querySelector(".mobile-close");

//  INITIAL STATES

// Submenus (absolute, no layout issues)
gsap.set(submenus, {
  autoAlpha: 0,
  y: 16,
  pointerEvents: "none",
});

// Mobile menu starts offscreen
gsap.set(mobileMenu, { x: "100%" });

//  SUBMENU TOGGLE (+ ICON)

toggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const item = toggle.closest(".has-sub");
    const submenu = item.querySelector(".submenu");
    const isOpen = submenu.classList.contains("is-open");

    closeAllSubmenus(submenu);

    if (!isOpen) openSubmenu(submenu);
  });
});

function openSubmenu(menu) {
  menu.classList.add("is-open");
  gsap.killTweensOf(menu);

  gsap.to(menu, {
    autoAlpha: 1,
    y: 0,
    duration: 0.35,
    ease: "power3.out",
    pointerEvents: "auto",
  });
}

function closeSubmenu(menu) {
  menu.classList.remove("is-open");
  gsap.killTweensOf(menu);

  gsap.to(menu, {
    autoAlpha: 0,
    y: 16,
    duration: 0.25,
    ease: "power3.in",
    pointerEvents: "none",
  });
}

function closeAllSubmenus(except = null) {
  submenus.forEach((menu) => {
    if (menu !== except && menu.classList.contains("is-open")) {
      closeSubmenu(menu);
    }
  });
}

//  CLICK OUTSIDE TO CLOSE SUBMENUS

document.addEventListener("click", () => {
  closeAllSubmenus();
});

submenus.forEach((menu) => {
  menu.addEventListener("click", (e) => e.stopPropagation());
});

//  MOBILE MENU OPEN

hamburger.addEventListener("click", () => {
  // make element renderable
  mobileMenu.classList.remove("hidden");

  // ensure start position
  gsap.set(mobileMenu, { x: "100%" });

  gsap.to(mobileMenu, {
    x: 0,
    duration: 0.5,
    ease: "power3.out",
  });
});

//  MOBILE MENU CLOSE

mobileClose.addEventListener("click", () => {
  gsap.to(mobileMenu, {
    x: "100%",
    duration: 0.4,
    ease: "power3.in",
    onComplete: () => {
      mobileMenu.classList.add("hidden");
    },
  });

  closeAllSubmenus();
});

// HOME GSAP

// Set initial visibility for slide elements

function prepareSlide(slide) {
  if (!slide) return;

  gsap.set(
    slide.querySelectorAll(".slide-tag, .slide-title, .slide-desc, .slide-btn"),
    {
      opacity: 1,
      clearProps: "transform",
    },
  );
}

function animateSlide(slide) {
  if (!slide) return;

  const tag = slide.querySelector(".slide-tag");
  const title = slide.querySelector(".slide-title");
  const desc = slide.querySelector(".slide-desc");
  const btn = slide.querySelector(".slide-btn");

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  if (tag) {
    tl.fromTo(tag, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
  }

  if (title) {
    tl.fromTo(
      title,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3 },
      "-=0.4",
    );
  }

  if (desc) {
    tl.fromTo(
      desc,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8 },
      "-=0.6",
    );
  }

  if (btn) {
    tl.fromTo(
      btn,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, clearProps: "transform" },
      "-=0.6",
    );
  }
}

function resetSlide(slide) {
  if (!slide) return;

  const elements = slide.querySelectorAll(
    ".slide-tag, .slide-title, .slide-desc, .slide-btn",
  );

  gsap.killTweensOf(elements);

  gsap.set(elements, {
    opacity: 0,
    clearProps: "transform",
  });
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  speed: 1000,
  loop: true,
  effect: "fade",
  fadeEffect: { crossFade: true },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init() {
      prepareSlide(this.slides[this.activeIndex]);
      animateSlide(this.slides[this.activeIndex]);
    },
    slideChangeTransitionEnd() {
      resetSlide(this.slides[this.previousIndex]);
      prepareSlide(this.slides[this.activeIndex]);
      animateSlide(this.slides[this.activeIndex]);
    },
  },
});

// ABOUT SECTION

// Left content
gsap.from(
  [".payments-tag", ".payments-title", ".payments-desc", ".payments-card"],
  {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".payments-section",
      start: "top 75%",
    },
  },
);

// Phone animation
gsap.from(".payments-phone", {
  y: 80,
  opacity: 0,
  rotate: -4,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".payments-visual",
    start: "top 75%",
  },
});

// Background block
gsap.from(".payments-bg", {
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".payments-visual",
    start: "top 80%",
  },
});

// LOCKER

// Left content animation
gsap.from(
  [
    ".locker-tag",
    ".locker-title",
    ".locker-desc",
    ".locker-note",
    ".locker-features",
    ".locker-btn",
  ],
  {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".locker-section",
      start: "top 75%",
    },
  },
);

// Image animation
gsap.from(".locker-image", {
  scale: 1.1,
  opacity: 0,
  duration: 1.4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".locker-image-wrapper",
    start: "top 75%",
  },
});

// SERVICES

gsap.from(".services-header", {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".services-section",
    start: "top 80%",
  },
});

gsap.from(".service-card", {
  opacity: 0,
  y: 80,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 80%",
  },
});

// GRID

/* Entrance animations */
gsap.from(".trust-left .trust-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".trust-main",
    start: "top 75%",
  },
});

gsap.from(".trust-right .trust-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".trust-main",
    start: "top 75%",
  },
});

gsap.from(".trust-phone", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".trust-center",
    start: "top 75%",
  },
});

/* COUNT UP */
document.querySelectorAll(".trust-count").forEach((counter) => {
  const end = +counter.dataset.count;

  gsap.fromTo(
    counter,
    { innerText: 0 },
    {
      innerText: end,
      duration: 2,
      ease: "power1.out",
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: ".trust-stats",
        start: "top 80%",
        once: true,
      },
      onUpdate() {
        counter.innerText = Math.floor(counter.innerText);
      },
    },
  );
});

// ABOUT SECTION

// Image animation
gsap.from(".fd-image", {
  scale: 1.15,
  opacity: 0,
  duration: 1.4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".fd-section",
    start: "top 75%",
  },
});

// Content stagger
gsap.from(
  [".fd-title", ".fd-desc", ".fd-subtitle", ".fd-benefits li", ".fd-bottom"],
  {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".fd-content",
      start: "top 75%",
    },
  },
);

// FAQ

gsap.from(".faq-header, .faq-categories, .faq-list", {
  opacity: 0,
  y: 80,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".faq-section",
    start: "top 75%",
  },
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector(".faq-icon");

  gsap.set(answer, { height: 0, opacity: 0 });

  if (item.classList.contains("active")) {
    gsap.set(answer, { height: "auto", opacity: 1 });
    gsap.set(icon, { rotate: 180 });
  }

  question.addEventListener("click", () => {
    faqItems.forEach((other) => {
      if (other !== item) {
        const otherAnswer = other.querySelector(".faq-answer");
        const otherIcon = other.querySelector(".faq-icon");
        other.classList.remove("active");

        gsap.to(otherAnswer, { height: 0, opacity: 0, duration: 0.4 });
        gsap.to(otherIcon, { rotate: 0, duration: 0.3 });
      }
    });

    const isOpen = item.classList.contains("active");
    item.classList.toggle("active");

    gsap.to(answer, {
      height: isOpen ? 0 : "auto",
      opacity: isOpen ? 0 : 1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(icon, {
      rotate: isOpen ? 0 : 180,
      duration: 0.3,
    });
  });
});

// BLOGS

gsap.from(".blog-header, .blog-card", {
  opacity: 0,
  y: 80,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".blog-section",
    start: "top 75%",
  },
});

// FOOTER

gsap.from(".footer-cert, .footer-enquiry, .footer-hours, .footer-right", {
  opacity: 0,
  y: 60,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer-section",
    start: "top 80%",
  },
});

// FOOTER MAIN

gsap.from(".footer-utility, .footer-bottom", {
  opacity: 0,
  y: 40,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer-section",
    start: "top 90%",
  },
});

// ===============================
// LENIS SETUP (SMOOTH + CONTROLLED)
// ===============================
const lenis = new Lenis({
  duration: 1, // 1.2–1.4 = best for UI-heavy sites
  easing: (t) => 1 - Math.pow(1 - t, 4), // smooth, natural
  smoothWheel: true,
  smoothTouch: false, // keep mobile native
});

// ===============================
// SYNC WITH SCROLLTRIGGER
// ===============================
lenis.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

// ===============================
// RAF LOOP (CORRECT WAY)
// ===============================
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===============================
// REFRESH FIX
// ===============================
ScrollTrigger.addEventListener("refresh", () => lenis.resize());
ScrollTrigger.refresh();

// SCROLL TOP

const scrollBtn = document.getElementById("scrollTopBtn");
const indicator = document.querySelector(".scroll-indicator");
const circumference = 126;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = scrollTop / docHeight;
  const offset = circumference - progress * circumference;

  indicator.style.strokeDashoffset = offset;

  if (scrollTop > 200) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
