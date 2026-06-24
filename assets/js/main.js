/* ============================================================
   Kate Prior — Portfolio
   Progressive enhancement:
   1. Wrap each <h2> + following content into a .section card.
   2. Build the sticky nav bar links from those section titles.
   3. Highlight the nav link for the section currently in view.
   Content in index.md stays clean Markdown — structure is built here.
   ============================================================ */

(function () {
  "use strict";

  /* ---- slugify for anchor ids ---- */
  function slug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /* ---- Turn flat Markdown output into section cards ---- */
  function buildSections() {
    var main = document.querySelector("[data-sections]");
    if (!main) return [];

    var headings = main.querySelectorAll(":scope > h2");
    var sections = [];

    headings.forEach(function (h2) {
      var title = h2.textContent.trim();

      var section = document.createElement("section");
      section.className = "section";
      section.id = slug(title);

      var body = document.createElement("div");
      body.className = "section__body";
      section.appendChild(body);

      // Insert the new section where the h2 currently sits.
      main.insertBefore(section, h2);

      // Style the heading and move it (plus following content up to the next
      // h2) into the section body.
      h2.classList.add("section__title");
      var node = h2;
      while (node && !(node !== h2 && node.nodeName === "H2")) {
        var next = node.nextSibling;
        body.appendChild(node);
        node = next;
        if (node && node.nodeName === "H2") break;
      }

      sections.push({ id: section.id, title: title, el: section });
    });

    return sections;
  }

  /* ---- Build sticky nav links from the sections ---- */
  function buildNav(sections) {
    var list = document.querySelector("[data-nav-links]");
    if (!list) return [];

    var links = {};
    sections.forEach(function (s) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.textContent = s.title;
      li.appendChild(a);
      list.appendChild(li);
      links[s.id] = a;
    });
    return links;
  }

  /* ---- Highlight the nav link of the section in view (scrollspy) ---- */
  function setupScrollSpy(sections, links) {
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    var navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-height"),
      10
    ) || 58;

    function setActive(id) {
      Object.keys(links).forEach(function (key) {
        links[key].classList.toggle("is-active", key === id);
      });
    }

    var visible = {};
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });
        // Activate the first section (in document order) currently on screen.
        for (var i = 0; i < sections.length; i++) {
          if (visible[sections[i].id]) {
            setActive(sections[i].id);
            return;
          }
        }
      },
      { rootMargin: "-" + (navHeight + 8) + "px 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (s) { observer.observe(s.el); });

    // Update the highlight immediately when a link is clicked.
    Object.keys(links).forEach(function (id) {
      links[id].addEventListener("click", function () { setActive(id); });
    });
  }

  function init() {
    var sections = buildSections();
    var links = buildNav(sections);
    setupScrollSpy(sections, links);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
