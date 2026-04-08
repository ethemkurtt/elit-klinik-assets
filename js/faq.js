/* =====================
   Elit Klinik - FAQ Accordion
   ===================== */

document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.ek-faq__item');

  if (!items.length) return;

  items.forEach(function (item) {
    var question = item.querySelector('.ek-faq__question');
    var answer = item.querySelector('.ek-faq__answer');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('active');

      // Close all
      items.forEach(function (i) {
        i.classList.remove('active');
        i.querySelector('.ek-faq__answer').style.maxHeight = '0';
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default
  var first = items[0];
  if (first) {
    first.classList.add('active');
    first.querySelector('.ek-faq__answer').style.maxHeight = first.querySelector('.ek-faq__answer').scrollHeight + 'px';
  }
});
