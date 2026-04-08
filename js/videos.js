/* =====================
   Elit Klinik - Videos Section
   ===================== */

document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.ek-videos__card');
  var modal = document.querySelector('.ek-videos__modal');
  var modalClose = document.querySelector('.ek-videos__modal-close');
  var modalContent = document.querySelector('.ek-videos__modal-content');

  if (!cards.length || !modal) return;

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var videoUrl = this.getAttribute('data-video');
      if (!videoUrl) return;

      var isYoutube = videoUrl.indexOf('youtube.com') !== -1 || videoUrl.indexOf('youtu.be') !== -1;

      if (isYoutube) {
        var videoId = '';
        if (videoUrl.indexOf('youtu.be/') !== -1) {
          videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else if (videoUrl.indexOf('v=') !== -1) {
          videoId = videoUrl.split('v=')[1].split('&')[0];
        }
        modalContent.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" width="960" height="540" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      } else {
        modalContent.innerHTML = '<video src="' + videoUrl + '" controls autoplay style="width:960px;max-width:90vw;max-height:80vh;border-radius:12px;"></video>';
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalContent.innerHTML = '';
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
});
