/* =============================================================
   ELIT KLINIK - ALL-IN-ONE JS
   =============================================================
   Sections:
   1. Mobile Hamburger Menu
   2. Before/After Slider (click+drag only)
   3. Simulation Video Modal
   4. Steps Tabs
   5. Videos Section (inline play)
   6. FAQ Accordion
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* =============================================================
     1. MOBILE HAMBURGER MENU
     ============================================================= */

  var toggle = document.querySelector('.ek-header__mobile-toggle');
  var right = document.querySelector('.ek-header__right');

  if (toggle && right) {
    toggle.addEventListener('click', function () {
      right.classList.toggle('active');
    });
  }


  /* =============================================================
     2. BEFORE/AFTER SLIDER (click + drag only, no hover)
     ============================================================= */

  var slider = document.querySelector('.ek-results__slider');

  if (slider) {
    var afterImg = slider.querySelector('.ek-results__after');
    var handle = slider.querySelector('.ek-results__handle');
    var isDragging = false;
    var rafId = null;
    var currentX = 0;

    function updateSlider() {
      var rect = slider.getBoundingClientRect();
      var pos = (currentX - rect.left) / rect.width;
      pos = Math.max(0.02, Math.min(0.98, pos));
      var percent = pos * 100;

      afterImg.style.clipPath = 'inset(0 0 0 ' + percent + '%)';
      handle.style.left = percent + '%';
      rafId = null;
    }

    function requestUpdate(x) {
      currentX = x;
      if (!rafId) {
        rafId = requestAnimationFrame(updateSlider);
      }
    }

    slider.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDragging = true;
      requestUpdate(e.clientX);
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      requestUpdate(e.clientX);
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    slider.addEventListener('touchstart', function (e) {
      isDragging = true;
      requestUpdate(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      requestUpdate(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', function () {
      isDragging = false;
    });
  }

  /* Results thumbs - NO modal, just static */


  /* =============================================================
     3. SIMULATION VIDEO MODAL
     ============================================================= */

  var videoThumb = document.querySelector('.ek-simulation__video');
  var simModal = document.querySelector('.ek-simulation__modal');
  var simModalClose = document.querySelector('.ek-simulation__modal-close');
  var simModalVideo = document.querySelector('.ek-simulation__modal-video');

  if (videoThumb && simModal) {
    videoThumb.addEventListener('click', function () {
      simModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (simModalVideo && simModalVideo.tagName === 'VIDEO') {
        simModalVideo.play();
      }
    });

    function closeSimModal() {
      simModal.classList.remove('active');
      document.body.style.overflow = '';
      if (simModalVideo && simModalVideo.tagName === 'VIDEO') {
        simModalVideo.pause();
        simModalVideo.currentTime = 0;
      }
      if (simModalVideo && simModalVideo.tagName === 'IFRAME') {
        var src = simModalVideo.src;
        simModalVideo.src = '';
        simModalVideo.src = src;
      }
    }

    if (simModalClose) {
      simModalClose.addEventListener('click', closeSimModal);
    }

    simModal.addEventListener('click', function (e) {
      if (e.target === simModal) closeSimModal();
    });
  }


  /* =============================================================
     4. STEPS TABS
     ============================================================= */

  var tabs = document.querySelectorAll('.ek-steps__tab');
  var panels = document.querySelectorAll('.ek-steps__panel');

  if (tabs.length && panels.length) {
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
  }


  /* =============================================================
     5. VIDEOS SECTION - INLINE PLAY (no modal)
     ============================================================= */

  var videoCards = document.querySelectorAll('.ek-videos__card');

  if (videoCards.length) {
    videoCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var video = this.querySelector('video');
        if (!video) return;

        if (this.classList.contains('playing')) {
          video.pause();
          this.classList.remove('playing');
        } else {
          this.classList.add('playing');
          video.play();
        }
      });
    });
  }


  /* =============================================================
     6. FAQ ACCORDION
     ============================================================= */

  var faqItems = document.querySelectorAll('.ek-faq__item');

  if (faqItems.length) {
    faqItems.forEach(function (item) {
      var question = item.querySelector('.ek-faq__question');
      var answer = item.querySelector('.ek-faq__answer');

      if (question && answer) {
        question.addEventListener('click', function () {
          var isOpen = item.classList.contains('active');

          faqItems.forEach(function (i) {
            i.classList.remove('active');
            i.querySelector('.ek-faq__answer').style.maxHeight = '0';
          });

          if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      }
    });

    // Open first item by default
    var firstItem = faqItems[0];
    if (firstItem) {
      firstItem.classList.add('active');
      var firstAnswer = firstItem.querySelector('.ek-faq__answer');
      if (firstAnswer) {
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
      }
    }
  }


  /* =============================================================
     GLOBAL: Escape key closes any active modal
     ============================================================= */

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    // Simulation modal
    if (simModal && simModal.classList.contains('active')) {
      simModal.classList.remove('active');
      document.body.style.overflow = '';
      if (simModalVideo && simModalVideo.tagName === 'VIDEO') {
        simModalVideo.pause();
        simModalVideo.currentTime = 0;
      }
    }
  });

});
