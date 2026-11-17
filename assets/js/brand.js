/* ==========================================================================
   Ration — brand layer interactions
   Mega-menu behaviour for the two-tier navigation. Progressive enhancement:
   without JavaScript the Products link simply stays a menu button.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var btn = doc.getElementById('nav-products');
  var mega = doc.getElementById('nav-mega');
  var header = doc.querySelector('.nav');
  if (!btn || !mega || !header) return;

  var pinned = false;
  var hoverTimer = null;

  function isOpen() {
    return btn.getAttribute('aria-expanded') === 'true';
  }

  function open() {
    btn.setAttribute('aria-expanded', 'true');
    mega.hidden = false;
  }

  function close(returnFocus) {
    if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
    btn.setAttribute('aria-expanded', 'false');
    mega.hidden = true;
    pinned = false;
    if (returnFocus) btn.focus();
  }

  btn.addEventListener('click', function (event) {
    event.preventDefault();
    if (!isOpen()) {
      open();
      pinned = true;
    } else if (pinned) {
      close();
    } else {
      pinned = true;
    }
  });

  mega.addEventListener('click', function (event) {
    if (event.target.closest('a')) close();
  });

  doc.addEventListener('click', function (event) {
    if (!isOpen()) return;
    if (btn.contains(event.target) || mega.contains(event.target)) return;
    close();
  });

  doc.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) close(true);
  });

  doc.addEventListener('focusin', function (event) {
    if (!isOpen() || pinned) return;
    if (!header.contains(event.target)) close();
  });

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (fine.matches) {
    btn.addEventListener('pointerenter', function () {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () {
        if (!isOpen()) open();
      }, 120);
    });

    function closeSoon() {
      if (pinned) return;
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () {
        if (!pinned) close();
      }, 220);
    }

    btn.addEventListener('pointerleave', closeSoon);
    mega.addEventListener('pointerleave', closeSoon);
    mega.addEventListener('pointerenter', function () {
      if (hoverTimer) clearTimeout(hoverTimer);
    });
  }

  var compact = window.matchMedia('(max-width: 1024px)');
  function onBreakpoint(event) {
    if (event.matches) close();
  }
  if (compact.addEventListener) compact.addEventListener('change', onBreakpoint);
  else if (compact.addListener) compact.addListener(onBreakpoint);
})();
