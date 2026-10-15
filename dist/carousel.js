const ROTATION_MS = 6000;

// One clock drives both galleries; photographs only advance while being viewed.
export function mountCarousels({ getText }) {
  const states = [...document.querySelectorAll('[data-carousel]')].map(element => ({
    element,
    slides: [...element.querySelectorAll('.carousel-slide')],
    index: 0,
    visible: false,
    lastChange: Date.now(),
  }));

  function render(state, manual = false) {
    const { element, slides, index } = state;
    element.dataset.activeIndex = String(index);
    element.querySelector('.carousel-stage').setAttribute('aria-live', manual ? 'polite' : 'off');
    slides.forEach((slide, i) => {
      const active = index === i;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
      slide.setAttribute('aria-label', `${getText('openPhoto')}: ${slide.querySelector('img').alt} (${i + 1}/${slides.length})`);
    });
    element.querySelectorAll('[data-carousel-go]').forEach((dot, i) => {
      dot.setAttribute('aria-pressed', String(index === i));
      dot.setAttribute('aria-label', slides[i].querySelector('img').alt);
    });
    element.setAttribute('aria-roledescription', getText('carouselRole'));
  }

  function select(state, index, manual = false) {
    state.index = (index + state.slides.length) % state.slides.length;
    state.lastChange = Date.now();
    render(state, manual);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const state = states.find(item => item.element === entry.target);
      const visible = entry.isIntersecting && entry.intersectionRatio >= .25;
      if (state.visible !== visible) state.lastChange = Date.now();
      state.visible = visible;
      if (visible) state.slides.forEach(slide => { slide.querySelector('img').loading = 'eager'; });
    });
  }, { threshold: [0, .25, .5] });

  states.forEach(state => {
    const { element } = state;
    element.querySelectorAll('[data-carousel-go]').forEach(button => {
      button.addEventListener('click', () => select(state, Number(button.dataset.carouselGo), true));
    });
    observer.observe(element);
    render(state);
  });

  const resetClock = () => states.forEach(state => { state.lastChange = Date.now(); });
  document.addEventListener('visibilitychange', resetClock);
  window.addEventListener('pageshow', resetClock);
  window.setInterval(() => {
    const blocked = document.hidden || document.querySelector('dialog[open]') ||
      [...document.querySelectorAll('video')].some(video => !video.paused && !video.ended);
    states.forEach(state => {
      const photoFocused = state.slides.some(slide => slide.contains(document.activeElement));
      if (blocked || !state.visible || photoFocused) {
        state.lastChange = Date.now();
        return;
      }
      if (Date.now() - state.lastChange >= ROTATION_MS) select(state, state.index + 1);
    });
  }, 500);

  return { refresh: () => states.forEach(state => render(state)) };
}
