/* =====================
   Elit Klinik - Before/After Slider
   ===================== */

document.addEventListener('DOMContentLoaded', function () {
  var slider = document.querySelector('.ek-results__slider');
  if (!slider) return;

  var afterImg = slider.querySelector('.ek-results__after');
  var handle = slider.querySelector('.ek-results__handle');
  var isDragging = false;

  function updateSlider(x) {
    var rect = slider.getBoundingClientRect();
    var pos = (x - rect.left) / rect.width;
    pos = Math.max(0.05, Math.min(0.95, pos));
    var percent = pos * 100;

    afterImg.style.clipPath = 'inset(0 0 0 ' + percent + '%)';
    handle.style.left = percent + '%';
  }

  slider.addEventListener('mousedown', function (e) {
    isDragging = true;
    updateSlider(e.clientX);
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    e.preventDefault();
    updateSlider(e.clientX);
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  // Touch support
  slider.addEventListener('touchstart', function (e) {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  document.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  document.addEventListener('touchend', function () {
    isDragging = false;
  });

  // Thumbnail click - change main images
  var thumbs = document.querySelectorAll('.ek-results__thumb');
  var beforeImg = slider.querySelector('.ek-results__before');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var beforeSrc = this.getAttribute('data-before');
      var afterSrc = this.getAttribute('data-after');

      // Fade out
      beforeImg.style.opacity = '0';
      afterImg.style.opacity = '0';

      setTimeout(function () {
        beforeImg.src = beforeSrc;
        afterImg.src = afterSrc;
        beforeImg.style.opacity = '1';
        afterImg.style.opacity = '1';
      }, 200);

      // Active state
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });
});
