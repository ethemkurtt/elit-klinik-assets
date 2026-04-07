/* =====================
   Elit Klinik - Main JS
   ===================== */

document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.ek-header__mobile-toggle');
  var nav = document.querySelector('.ek-header__nav');
  var cta = document.querySelector('.ek-header__cta');

  if (toggle) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      cta.classList.toggle('active');
    });
  }
});
