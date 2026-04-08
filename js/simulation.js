/* =====================
   Elit Klinik - Video Modal
   ===================== */

document.addEventListener('DOMContentLoaded', function () {
  var videoThumb = document.querySelector('.ek-simulation__video');
  var modal = document.querySelector('.ek-simulation__modal');
  var modalClose = document.querySelector('.ek-simulation__modal-close');
  var modalVideo = document.querySelector('.ek-simulation__modal-video');

  if (!videoThumb || !modal) return;

  videoThumb.addEventListener('click', function () {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (modalVideo && modalVideo.tagName === 'VIDEO') {
      modalVideo.play();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalVideo && modalVideo.tagName === 'VIDEO') {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
    if (modalVideo && modalVideo.tagName === 'IFRAME') {
      var src = modalVideo.src;
      modalVideo.src = '';
      modalVideo.src = src;
    }
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
});
