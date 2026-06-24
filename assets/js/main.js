/* ============================================================
   Kate Prior — Portfolio
   Progressive enhancement:
   1. Wrap each <h2> + following content into a .section card.
   2. Prepend an infinite-scroll ribbon header to each section.
   3. Duplicate every marquee track so the scroll loops seamlessly.
   Content in index.md stays clean markdown — ribbons are built here.
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

  /* ---- Build a scrolling ribbon track for a section title ---- */
  function buildSectionRibbon(title) {
    var ribbon = document.createElement("div");
    ribbon.className = "section__ribbon";
    ribbon.setAttribute("aria-hidden", "true");

    var track = document.createElement("div");
    track.className = "ribbon__track";
    track.setAttribute("data-marquee", "");

    // A handful of repeats so even short titles fill the strip before duplication.
    for (var i = 0; i < 6; i++) {
      var item = document.createElement("span");
      item.className = "ribbon__item";
      item.textContent = title;
      track.appendChild(item);

      var star = document.createElement("span");
      star.className = "ribbon__star";
      star.textContent = "✦";
      track.appendChild(star);
    }

    ribbon.appendChild(track);
    return ribbon;
  }

  /* ---- Turn flat markdown output into section cards ---- */
  function buildSections() {
    var main = document.querySelector("[data-sections]");
    if (!main) return;

    var headings = main.querySelectorAll(":scope > h2");
    if (!headings.length) return;

    headings.forEach(function (h2) {
      var title = h2.textContent.trim();

      var section = document.createElement("section");
      section.className = "section";
      section.id = slug(title);

      var body = document.createElement("div");
      body.className = "section__body";

      // Ribbon header first, then the body holding the heading + content.
      section.appendChild(buildSectionRibbon(title));
      section.appendChild(body);

      // Insert the section where the h2 currently sits.
      main.insertBefore(section, h2);

      // Move the h2 and every sibling up to (but not including) the next h2.
      var node = h2;
      while (node && !(node !== h2 && node.nodeName === "H2")) {
        var next = node.nextSibling;
        body.appendChild(node);
        node = next;
        if (node && node.nodeName === "H2") break;
      }
    });
  }

  /* ---- Duplicate marquee content for a seamless -50% loop ---- */
  function primeMarquees() {
    document.querySelectorAll("[data-marquee]").forEach(function (track) {
      if (track.dataset.primed) return;
      track.innerHTML += track.innerHTML;
      track.dataset.primed = "true";
    });
  }

  function init() {
    buildSections();
    primeMarquees();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
