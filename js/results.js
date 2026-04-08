/* =====================
   Elit Klinik - Before/After Slider + Modal
   ===================== */

document.addEventListener('DOMContentLoaded', function () {
  /* ---- Before/After Slider ---- */
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
  document.addEventListener('mouseup', function () { isDragging = false; });

  slider.addEventListener('touchstart', function (e) {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });
  document.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });
  document.addEventListener('touchend', function () { isDragging = false; });

  /* ---- Modal ---- */
  var modal = document.querySelector('.ek-results__modal');
  var modalImg = document.querySelector('.ek-results__modal-img');
  var modalClose = document.querySelector('.ek-results__modal-close');
  var thumbs = document.querySelectorAll('.ek-results__thumb');

  if (modal && modalImg) {
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = this.querySelector('img').src;
        modalImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modalClose.addEventListener('click', function () {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
