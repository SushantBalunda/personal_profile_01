// Sushant Balunda | Personal Profile
(function () {
  'use strict';

  // 1. Footer year stays current (falls back to the year written in the HTML).
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 2. Highlight the nav link for the section currently in view.
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (section) { observer.observe(section); });

    // Clear the highlight when back at the hero.
    window.addEventListener('scroll', function () {
      if (window.scrollY < 200) setActive('');
    }, { passive: true });
  }

  // 3. Links still set to PLACEHOLDER don't lead anywhere yet, so switch them off.
  //    Once you replace the href with a real URL, they work again automatically.
  document.querySelectorAll('a[href="PLACEHOLDER"]').forEach(function (link) {
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', function (event) { event.preventDefault(); });
  });
})();
