const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('scroll', () => {
  const windowToFooter = document.querySelector('.footer')?.getBoundingClientRect().top;
  const windowheight = window.innerHeight;

  if (windowheight >= windowToFooter) {
    document.querySelector('.scroll-up').style = `
      position: fixed;
      right: 10px;
      bottom: 150px;
      `;
  } else {
    document.querySelector('.scroll-up').style = `
      position: fixed;
      right: 10px;
      bottom: 32px;
      `;
  }

  document.querySelector('.header').style = 'backdrop-filter: blur(50px)';
});
