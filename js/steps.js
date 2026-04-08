/* =====================
   Elit Klinik - Steps Tabs
   ===================== */

document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.ek-steps__tab');
  var panels = document.querySelectorAll('.ek-steps__panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-step');

      tabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      panels.forEach(function (p) {
        if (p.getAttribute('data-step') === target) {
          p.classList.add('active');
          p.style.opacity = '0';
          requestAnimationFrame(function () {
            p.style.transition = 'opacity 0.3s ease';
            p.style.opacity = '1';
          });
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
});
