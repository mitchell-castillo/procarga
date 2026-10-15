const ROTATION_MS = 6000;

// One clock drives both galleries; photographs only advance while being viewed.
export function mountCarousels({ getText }) {
  const states = [...document.querySelectorAll('[data-carousel]')].map(element => ({
    element,
    slides: [...element.querySelectorAll('.carousel-slide')],
    index: 0,
    visible: false,
    lastChange: Date.now(),
    gesture: null,
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
    const stage = element.querySelector('.carousel-stage');
    let suppressClick = false;
    stage.addEventListener('pointerdown', event => {
      suppressClick = false;
      if (!event.isPrimary) { state.gesture = null; return; }
      if (event.pointerType === 'mouse') return;
      state.gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
    });
    stage.addEventListener('pointermove', event => {
      const gesture = state.gesture;
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (!gesture.horizontal && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        gesture.horizontal = true;
        stage.setPointerCapture(event.pointerId);
      }
      if (gesture.horizontal) event.preventDefault();
    });
    stage.addEventListener('pointerup', event => {
      const gesture = state.gesture;
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      suppressClick = gesture.horizontal || Math.hypot(dx, dy) > 12;
      state.gesture = null;
      state.lastChange = Date.now();
      if (gesture.horizontal && Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        select(state, state.index + (dx < 0 ? 1 : -1), true);
      }
    });
    stage.addEventListener('pointercancel', () => {
      state.gesture = null;
      state.lastChange = Date.now();
    });
    // A swipe must not also trigger the photograph's enlargement button.
    stage.addEventListener('click', event => {
      if (!suppressClick || event.detail === 0) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressClick = false;
    }, true);
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
      const photoFocused = state.slides.some(slide => slide.contains(document.activeElement) && document.activeElement.matches(':focus-visible'));
      if (blocked || !state.visible || state.gesture || photoFocused) {
        state.lastChange = Date.now();
        return;
      }
      if (Date.now() - state.lastChange >= ROTATION_MS) select(state, state.index + 1);
    });
  }, 500);

  return { refresh: () => states.forEach(state => render(state)) };
}
