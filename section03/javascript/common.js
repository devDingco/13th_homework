let initialScroll = 0;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('scroll', () => {
  const filterElem = document.querySelector('.filter-emotion');

  filterElem.style = `
        background-color: var(--gray-b);
        color: var(--gray-w);
    `;

  filterElem.classList.add('scrolled');

  const currentScroll = window.scrollY;

  if (currentScroll === 0 || initialScroll > currentScroll) {
    filterElem.style = `
        background-color: var(--gray-w);
        color: var(--gray-b);
    `;

    filterElem.classList.remove('scrolled');
  }

  initialScroll = currentScroll;
});
