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

    handle.style.pointerEvents = 'auto';
    handle.style.cursor = 'ew-resize';

    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDragging = true;
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      requestUpdate(e.clientX);
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    handle.addEventListener('touchstart', function (e) {
      isDragging = true;
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
     3. SIMULATION VIDEO - INLINE PLAY (no modal)
     ============================================================= */

  var simVideoWrap = document.querySelector('.ek-simulation__video');

  if (simVideoWrap) {
    simVideoWrap.addEventListener('click', function () {
      if (this.classList.contains('playing')) return;

      // Video element
      var video = this.querySelector('video');
      if (video) {
        this.classList.add('playing');
        video.play();
        return;
      }

      // YouTube iframe
      var iframe = this.querySelector('iframe');
      if (iframe) {
        var src = iframe.getAttribute('data-src') || iframe.getAttribute('src');
        if (src) {
          iframe.src = src;
          iframe.style.display = 'block';
        }
        this.classList.add('playing');
      }
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
     7. QUIZ MODAL
     ============================================================= */

  var quiz = document.querySelector('.ek-quiz');

  if (quiz) {
    // Move quiz to <body> so position:fixed isn't broken by
    // transformed Elementor ancestors
    if (quiz.parentNode !== document.body) {
      document.body.appendChild(quiz);
    }

    var quizSteps = quiz.querySelectorAll('.ek-quiz__step');
    var progressSteps = quiz.querySelectorAll('.ek-quiz__progress > .ek-quiz__progress-step');
    var backBtn = quiz.querySelector('.ek-quiz__back');
    var closeBtn = quiz.querySelector('.ek-quiz__close');
    var currentStep = 0;
    var answers = {};

    function showStep(idx) {
      currentStep = idx;
      quizSteps.forEach(function (s, i) {
        s.classList.toggle('active', i === idx);
      });

      // Progress bar
      progressSteps.forEach(function (p, i) {
        p.classList.remove('active', 'done');
        if (i < idx) p.classList.add('done');
        if (i === idx) p.classList.add('active');
      });

      // Back button visibility
      if (backBtn) {
        backBtn.classList.toggle('hidden', idx === 0);
      }
    }

    function openQuiz() {
      // Re-parent to body every time in case Elementor re-wrapped it
      if (quiz.parentNode !== document.body) {
        document.body.appendChild(quiz);
      }
      quiz.classList.add('active');
      document.body.classList.add('ek-quiz-open');
      document.documentElement.classList.add('ek-quiz-open');
      window.scrollTo(0, 0);
      showStep(0);
    }

    function closeQuiz() {
      quiz.classList.remove('active');
      document.body.classList.remove('ek-quiz-open');
      document.documentElement.classList.remove('ek-quiz-open');
    }

    // Open quiz
    document.querySelectorAll('[data-open-quiz]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openQuiz();
      });
    });

    // Close quiz
    if (closeBtn) {
      closeBtn.addEventListener('click', closeQuiz);
    }

    // Back button
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (currentStep > 0) {
          showStep(currentStep - 1);
        }
      });
    }

    // Option click → save answer + go next
    quiz.querySelectorAll('.ek-quiz__option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var step = this.closest('.ek-quiz__step');
        var stepIdx = Array.prototype.indexOf.call(quizSteps, step);

        // Mark selected
        step.querySelectorAll('.ek-quiz__option').forEach(function (o) {
          o.classList.remove('selected');
        });
        this.classList.add('selected');

        // Save answer
        answers['step' + (stepIdx + 1)] = this.textContent.trim();

        // Go to next after brief delay
        setTimeout(function () {
          if (stepIdx < quizSteps.length - 1) {
            showStep(stepIdx + 1);
          }
        }, 300);
      });
    });

    // Quiz phone country dropdown
    var quizPhoneSelect = quiz.querySelector('.ek-quiz__phone-select');
    if (quizPhoneSelect) {
      quizPhoneSelect.addEventListener('click', function (e) {
        e.stopPropagation();
        var dd = this.closest('.ek-quiz__phone-wrap').querySelector('.ek-quiz__country-dropdown');
        if (dd) dd.classList.toggle('open');
      });
    }

    quiz.querySelectorAll('.ek-quiz__country-option').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        var wrap = this.closest('.ek-quiz__phone-wrap');
        var flag = wrap.querySelector('.ek-quiz__phone-flag');
        var code = wrap.querySelector('.ek-quiz__phone-code');
        if (flag) flag.src = this.querySelector('img').src;
        if (code) code.textContent = this.getAttribute('data-code');
        this.closest('.ek-quiz__country-dropdown').classList.remove('open');
      });
    });

    // Close quiz dropdowns on outside click
    document.addEventListener('click', function () {
      var dd = quiz.querySelector('.ek-quiz__country-dropdown.open');
      if (dd) dd.classList.remove('open');
    });

    // Form submit
    var quizForm = quiz.querySelector('.ek-quiz__form');
    if (quizForm) {
      quizForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData(quizForm);
        formData.forEach(function (value, key) {
          answers[key] = value;
        });

        // TODO: Send to backend / webhook
        console.log('Quiz answers:', answers);

        // Show thank you or redirect
        alert('Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.');
        quiz.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    /* ---- Photo Upload Step ---- */
    var uploadDrop = quiz.querySelector('.ek-quiz__upload-drop');
    var uploadInput = quiz.querySelector('.ek-quiz__upload-input');
    var angleCards = quiz.querySelectorAll('.ek-quiz__upload-angle');
    var activeAngle = null;

    if (uploadDrop && uploadInput) {
      // Click to open file picker
      uploadDrop.addEventListener('click', function () {
        uploadInput.click();
      });

      // Drag & drop
      uploadDrop.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.style.background = 'rgba(255,255,255,0.1)';
      });

      uploadDrop.addEventListener('dragleave', function () {
        this.style.background = '';
      });

      uploadDrop.addEventListener('drop', function (e) {
        e.preventDefault();
        this.style.background = '';
        var files = e.dataTransfer.files;
        if (files.length) handleUploadedFile(files[0]);
      });

      // File input change
      uploadInput.addEventListener('change', function () {
        if (this.files.length) handleUploadedFile(this.files[0]);
      });
    }

    // Click angle card → set active angle, open file picker
    angleCards.forEach(function (card) {
      card.addEventListener('click', function () {
        activeAngle = this.getAttribute('data-angle');
        if (uploadInput) uploadInput.click();
      });
    });

    function handleUploadedFile(file) {
      if (!file.type.startsWith('image/')) return;

      // Save to answers
      var angleName = activeAngle || 'photo';
      answers[angleName] = file;

      // Mark angle card as uploaded
      if (activeAngle) {
        angleCards.forEach(function (card) {
          if (card.getAttribute('data-angle') === activeAngle) {
            card.classList.add('uploaded');
            var label = card.querySelector('.ek-quiz__upload-angle-label');
            if (label) label.textContent = '✓ Yüklendi';
          }
        });
        activeAngle = null;
      }

      // Show preview in drop area
      var reader = new FileReader();
      reader.onload = function (e) {
        var preview = uploadDrop.querySelector('.ek-quiz__upload-preview');
        if (!preview) {
          preview = document.createElement('img');
          preview.className = 'ek-quiz__upload-preview';
          preview.style.cssText = 'max-width:120px;max-height:80px;border-radius:8px;margin-top:8px;';
          uploadDrop.appendChild(preview);
        }
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);

      // Reset file input for re-use
      if (uploadInput) uploadInput.value = '';
    }
  }


  /* =============================================================
     8. CONTACT SLIDE-IN PANEL
     ============================================================= */

  var contactPanel = document.querySelector('.ek-contact');
  var contactOverlay = document.querySelector('.ek-contact__overlay');

  if (contactPanel) {
    // Move to body
    if (contactPanel.parentNode !== document.body) {
      document.body.appendChild(contactPanel);
    }
    if (contactOverlay && contactOverlay.parentNode !== document.body) {
      document.body.appendChild(contactOverlay);
    }

    function openContact() {
      if (contactPanel.parentNode !== document.body) {
        document.body.appendChild(contactPanel);
      }
      if (contactOverlay && contactOverlay.parentNode !== document.body) {
        document.body.appendChild(contactOverlay);
      }
      // Force reflow for transition
      contactPanel.style.display = 'flex';
      contactPanel.offsetHeight;
      contactPanel.classList.add('active');
      if (contactOverlay) contactOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeContact() {
      contactPanel.classList.remove('active');
      if (contactOverlay) contactOverlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () {
        if (!contactPanel.classList.contains('active')) {
          contactPanel.style.display = 'none';
        }
      }, 350);
    }

    // Open triggers
    document.querySelectorAll('[data-open-contact]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openContact();
      });
    });

    // Close button
    var contactClose = contactPanel.querySelector('.ek-contact__close');
    if (contactClose) {
      contactClose.addEventListener('click', closeContact);
    }

    // Overlay click closes
    if (contactOverlay) {
      contactOverlay.addEventListener('click', closeContact);
    }

    // Tab switching with content
    var contactTabs = contactPanel.querySelectorAll('.ek-contact__tab');
    var contactTabContents = contactPanel.querySelectorAll('.ek-contact__tab-content');
    contactTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        contactTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        var targetTab = this.getAttribute('data-tab');
        contactTabContents.forEach(function (tc) {
          tc.classList.toggle('active', tc.getAttribute('data-tab') === targetTab);
        });
      });
    });

    // Radio selection
    var contactRadios = contactPanel.querySelectorAll('.ek-contact__radio');
    contactRadios.forEach(function (radio) {
      radio.addEventListener('click', function () {
        contactRadios.forEach(function (r) { r.classList.remove('selected'); });
        this.classList.add('selected');
      });
    });

    // Country dropdown
    contactPanel.querySelectorAll('.ek-contact__phone-select').forEach(function (sel) {
      sel.addEventListener('click', function (e) {
        e.stopPropagation();
        var dd = this.querySelector('.ek-contact__country-dropdown');
        if (dd) dd.classList.toggle('open');
      });
    });

    contactPanel.querySelectorAll('.ek-contact__country-option').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        var wrap = this.closest('.ek-contact__phone');
        var flag = wrap.querySelector('.ek-contact__phone-flag');
        var code = wrap.querySelector('.ek-contact__phone-code');
        flag.src = this.querySelector('img').src;
        code.textContent = this.getAttribute('data-code');
        this.closest('.ek-contact__country-dropdown').classList.remove('open');
      });
    });

    // Time slot picker
    contactPanel.querySelectorAll('.ek-contact__time-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var dd = this.closest('.ek-contact__time-wrap').querySelector('.ek-contact__time-dropdown');
        if (dd) dd.classList.toggle('open');
      });
    });

    contactPanel.querySelectorAll('.ek-contact__time-slot').forEach(function (slot) {
      slot.addEventListener('click', function (e) {
        e.stopPropagation();
        var wrap = this.closest('.ek-contact__time-wrap');
        wrap.querySelectorAll('.ek-contact__time-slot').forEach(function (s) { s.classList.remove('selected'); });
        this.classList.add('selected');
        var input = wrap.querySelector('.ek-contact__time-hidden');
        if (input) input.value = this.textContent.trim();
        var label = wrap.querySelector('.ek-contact__time-label');
        if (label) label.textContent = this.textContent.trim();
        this.closest('.ek-contact__time-dropdown').classList.remove('open');
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function () {
      contactPanel.querySelectorAll('.ek-contact__country-dropdown.open, .ek-contact__time-dropdown.open').forEach(function (dd) {
        dd.classList.remove('open');
      });
    });

    // Form validation + submit
    contactPanel.querySelectorAll('.ek-contact__form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        form.querySelectorAll('.ek-contact__field').forEach(function (field) {
          field.classList.remove('has-error');
          var input = field.querySelector('input[required]');
          if (input && !input.value.trim()) {
            field.classList.add('has-error');
            valid = false;
          }
        });
        if (!valid) return;

        var formData = new FormData(form);
        var data = {};
        formData.forEach(function (val, key) { data[key] = val; });
        var selectedRadio = form.querySelector('.ek-contact__radio.selected .ek-contact__radio-label');
        if (selectedRadio) data.cinsiyet = selectedRadio.textContent.trim();
        console.log('Contact form:', data);
        alert('Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.');
        closeContact();
      });
    });
  }


  /* =============================================================
     GLOBAL: Escape key closes any active modal
     ============================================================= */

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var quizModal = document.querySelector('.ek-quiz.active');
    if (quizModal) {
      quizModal.classList.remove('active');
      document.body.classList.remove('ek-quiz-open');
      document.documentElement.classList.remove('ek-quiz-open');
    }
    // Also close contact panel
    var contactActive = document.querySelector('.ek-contact.active');
    if (contactActive) {
      contactActive.classList.remove('active');
      var overlay = document.querySelector('.ek-contact__overlay.active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

});
