/* =====================
   Elit Klinik - Main JS
   ===================== */

document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.ek-header__mobile-toggle');
  var right = document.querySelector('.ek-header__right');

  if (toggle) {
    toggle.addEventListener('click', function() {
      right.classList.toggle('active');
    });
  }
});
