(function() {
  // Sidebar toggle
  const menuToggle = document.getElementById('menu-toggle');
  const page       = document.querySelector('.page');
  menuToggle.addEventListener('click', () => {
    page.classList.toggle('collapsed');
  });

  // Offers slider
  const slides    = document.getElementById('slides');
  const prevBtn   = document.querySelector('.arrow.left');
  const nextBtn   = document.querySelector('.arrow.right');
  const sliderBar = document.getElementById('sliderBar');

  window.addEventListener('load', () => {
    // initialize slider
    const maxScroll = slides.scrollWidth - slides.clientWidth;
    sliderBar.max = maxScroll;
    updateSliderBackground();

    // wire up card click → “selected” toggle
    document.querySelectorAll('.card, .cat-card, .offer-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
      });
    });
  });

  function scrollByCard(dir) {
    const card = slides.querySelector('.offer-card');
    const gap  = parseInt(getComputedStyle(slides).gap, 10);
    const step = card.getBoundingClientRect().width + gap;
    slides.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(+1));

  slides.addEventListener('scroll', () => {
    sliderBar.value = slides.scrollLeft;
    updateSliderBackground();
  });

  sliderBar.addEventListener('input', e => {
    slides.scrollLeft = e.target.value;
    updateSliderBackground();
  });

  function updateSliderBackground() {
    const pct = sliderBar.value / sliderBar.max || 0;
    sliderBar.style.background =
      `linear-gradient(to right,
                       var(--accent-color) 0%,
                       var(--accent-color) ${pct * 100}%,
                       #e0e0e0 ${pct * 100}%,
                       #e0e0e0 100%)`;
  }
})();
