// ScottiCAD website: mobile menu, before/after slider, copy buttons, scroll reveal.
(function () {
  "use strict";

  // Sticky nav border once the page scrolls.
  var nav = document.querySelector(".nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu.
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Before/after comparison slider.
  document.querySelectorAll(".compare").forEach(function (el) {
    var input = el.querySelector("input");
    var set = function () { el.style.setProperty("--pos", input.value + "%"); };
    input.addEventListener("input", set);
    set();
  });

  // Copy-to-clipboard buttons.
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = document.querySelector(btn.getAttribute("data-copy"));
      if (!src || !navigator.clipboard) return;
      navigator.clipboard.writeText(src.innerText.trim()).then(function () {
        var label = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("is-done");
        setTimeout(function () { btn.textContent = label; btn.classList.remove("is-done"); }, 1600);
      });
    });
  });

  // Fade sections in as they scroll into view.
  if ("IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".feature, .card, .steps li, .pillars article, .keys__col, details, .download");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { t.classList.add("reveal"); io.observe(t); });
  }
})();
