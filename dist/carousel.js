const ROTATION_MS = 6000;

// One clock drives both galleries; photographs only advance while being viewed.
export function mountCarousels({ getText }) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const states = [...document.querySelectorAll('[data-carousel]')].map(element => ({
    element,
    slides: [...element.querySelectorAll('.carousel-slide')],
    index: 0,
    paused: motion.matches,
    visible: false,
    hovered: false,
    focused: false,
    lastChange: Date.now(),
  }));

  function render(state) {
    const { element, slides, index, paused } = state;
    element.dataset.activeIndex = String(index);
    element.querySelector('.carousel-stage').setAttribute('aria-live', paused ? 'polite' : 'off');
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
    element.querySelector('.carousel-counter').textContent = `${index + 1} / ${slides.length}`;
    const toggle = element.querySelector('[data-carousel-toggle]');
    toggle.setAttribute('aria-label', getText(paused ? 'resumeCarousel' : 'pauseCarousel'));
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.querySelector('[data-carousel-symbol]').textContent = paused ? '▷' : 'Ⅱ';
    toggle.querySelector('[data-carousel-action]').textContent = getText(paused ? 'resumeShort' : 'pauseShort');
    element.setAttribute('aria-roledescription', getText('carouselRole'));
  }

  function select(state, index, manual = false) {
    state.index = (index + state.slides.length) % state.slides.length;
    state.lastChange = Date.now();
    if (manual) state.paused = true;
    render(state);
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
    element.querySelector('[data-carousel-prev]').addEventListener('click', () => select(state, state.index - 1, true));
    element.querySelector('[data-carousel-next]').addEventListener('click', () => select(state, state.index + 1, true));
    element.querySelectorAll('[data-carousel-go]').forEach(button => {
      button.addEventListener('click', () => select(state, Number(button.dataset.carouselGo), true));
    });
    element.querySelector('[data-carousel-toggle]').addEventListener('click', () => {
      state.paused = !state.paused;
      state.lastChange = Date.now();
      // Explicit resume may restart even while the pointer/focus is on this control.
      if (!state.paused) { state.focused = false; state.hovered = false; }
      render(state);
    });
    element.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') state.hovered = true; });
    element.addEventListener('pointerleave', () => { state.hovered = false; state.lastChange = Date.now(); });
    element.addEventListener('focusin', () => { state.focused = true; });
    element.addEventListener('focusout', event => {
      if (!element.contains(event.relatedTarget)) { state.focused = false; state.lastChange = Date.now(); }
    });
    observer.observe(element);
    render(state);
  });

  const resetClock = () => states.forEach(state => { state.lastChange = Date.now(); });
  document.addEventListener('visibilitychange', resetClock);
  window.addEventListener('pageshow', resetClock);
  motion.addEventListener('change', event => {
    if (event.matches) states.forEach(state => { state.paused = true; render(state); });
    resetClock();
  });
  window.setInterval(() => {
    const blocked = document.hidden || document.querySelector('dialog[open]') ||
      [...document.querySelectorAll('video')].some(video => !video.paused && !video.ended);
    states.forEach(state => {
      if (blocked || state.paused || !state.visible || state.hovered || state.focused) {
        state.lastChange = Date.now();
        return;
      }
      if (Date.now() - state.lastChange >= ROTATION_MS) select(state, state.index + 1);
    });
  }, 500);

  return { refresh: () => states.forEach(render) };
}
