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

  const scrolledHeight = window.scrollY;
  const scrollBar = document.documentElement.clientHeight;

  if (scrolledHeight === 0) {
    filterElem.style = `
        background-color: var(--gray-w);
        color: var(--gray-b);
    `;

    filterElem.classList.remove('scrolled');
  }
});
