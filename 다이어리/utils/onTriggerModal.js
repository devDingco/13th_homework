const onTriggerModal = (modal) => {
  upScroll();
  document.body.style.cssText = "overflow-y: hidden;";
  document.getElementById(modal).style = "display: flex;";
  onFocusActiveModal(modal);
  modal === "aside_layout" ? validateDiaryInputCompletion() : "";
};