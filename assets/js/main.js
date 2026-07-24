// tmato.es — minimal interactivity
(function () {
  "use strict";

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

// Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close only on leaf links (not dropdown toggles)
    links.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;

      if (a.classList.contains("nav__dropdown-toggle")) {
        var parent = a.closest(".nav__dropdown");
        var wasOpen = parent.classList.contains("open");
        links.querySelectorAll(".nav__dropdown").forEach(function (d) {
          d.classList.remove("open");
        });
        if (!wasOpen) parent.classList.add("open");
        // no preventDefault — let the href="#about" navigate normally
        return;
      }

      // Real link — close the whole nav (mobile)
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }
  // Theme toggle (dark is the default; choice persists)
  var themeBtn = document.getElementById("themeToggle");
  var root = document.documentElement;
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    if (themeMeta) themeMeta.setAttribute("content", theme === "light" ? "#f7f2ea" : "#2e2e33");
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
  }

  // Highlight the nav link for the section currently in view
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll(".nav__links a")
  );
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (a) {
            var active = a.getAttribute("href") === "#" + entry.target.id;
            a.classList.toggle("active", active);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }
})();