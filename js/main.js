/* =========================================================
   Mecko's Heating & Cooling — main.js
   Mobile navigation, dropdown menus, and accordion behavior
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  var navBackdrop = document.querySelector(".nav-backdrop");

  function closeNav() {
    mainNav.classList.remove("open");
    navBackdrop.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openNav() {
    mainNav.classList.add("open");
    navBackdrop.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  if (navToggle && mainNav && navBackdrop) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.contains("open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    navBackdrop.addEventListener("click", closeNav);

    // Close menu on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeNav();
      }
    });
  }

  /* ---------- Dropdown menus (desktop hover / mobile tap) ---------- */
  var dropdownParents = document.querySelectorAll(".main-nav li.has-dropdown");

  dropdownParents.forEach(function (li) {
    var trigger = li.querySelector(":scope > a.nav-link");

    trigger.addEventListener("click", function (e) {
      // On small screens, tapping the parent link toggles the submenu
      // instead of navigating away, since space is limited.
      if (window.innerWidth <= 880) {
        e.preventDefault();
        var isOpen = li.classList.contains("open");
        dropdownParents.forEach(function (other) {
          other.classList.remove("open");
        });
        if (!isOpen) {
          li.classList.add("open");
        }
      }
    });
  });

  // Desktop hover handling
  dropdownParents.forEach(function (li) {
    li.addEventListener("mouseenter", function () {
      if (window.innerWidth > 880) {
        li.classList.add("open");
      }
    });
    li.addEventListener("mouseleave", function () {
      if (window.innerWidth > 880) {
        li.classList.remove("open");
      }
    });
  });

  /* ---------- Accordion (FAQ / maintenance tips) ---------- */
  var accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");

    trigger.addEventListener("click", function () {
      var isActive = item.classList.contains("active");

      accordionItems.forEach(function (other) {
        other.classList.remove("active");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    });
  }

  /* ---------- Simple front-end validation feedback for forms ---------- */
  var forms = document.querySelectorAll("form[data-validate]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = form.querySelectorAll("[required]");
      var allValid = true;

      required.forEach(function (field) {
        if (!field.value.trim()) {
          allValid = false;
          field.style.borderColor = "#d13b2c";
        } else {
          field.style.borderColor = "";
        }
      });

      var status = form.querySelector(".form-status");
      if (!status) {
        status = document.createElement("p");
        status.className = "form-status form-note";
        form.appendChild(status);
      }

      if (allValid) {
        status.style.color = "#0b3358";
        status.textContent =
          "Thanks! This demo form isn't connected yet — please call 765-447-7555 to reach our team directly.";
      } else {
        status.style.color = "#d13b2c";
        status.textContent = "Please fill out all required fields.";
      }
    });
  });
});
