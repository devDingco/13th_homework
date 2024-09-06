window.addEventListener('scroll', () => {
  const windowToFooter = document.querySelector('.footer')?.getBoundingClientRect().top;
  const windowheight = window.innerHeight;

  if (windowheight >= windowToFooter) {
    document.querySelector('.scroll-up').style = `
      position: absolute;
      right: 20px;
      bottom: 150px;
      `;
  } else {
    document.querySelector('.scroll-up').style = `
      position: fixed;
      right: 20px;
      bottom: 32px;
      `;
  }

  document.querySelector('.header').style = 'backdrop-filter: blur(50px)';
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const showModal = (target) => {
  document.querySelector(target).style = 'display: block;';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('.app').style = 'overflow-y: hidden; max-height: 100vh;';
};
const closeModal = (target) => {
  document.querySelector(target).style = 'display: none;';
  document.querySelector('.app').style = 'overflow-y: auto; max-height: unset;';
};
