const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('scroll', () => {
  document.querySelector('.header').style = 'backdrop-filter: blur(50px)';
});
