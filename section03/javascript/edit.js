const skew = (elem, number) => {
  elem.style = `transform: skew(${number}deg)`;
};

const clickHandler = () => {
  const buttonEdit = document.querySelector('.button-edit');

  skew(buttonEdit, 5);
};
