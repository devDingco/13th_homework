const onCloseSingleModal = (modal) => {
  document.getElementById(modal).style = "display: none;";
  document.body.style.cssText = "overflow-y: none;";
};