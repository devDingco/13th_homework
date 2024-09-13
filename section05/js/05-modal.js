const openModal = (modalId) => {
    const modal = document.getElementById(modalId)
    modal.style.display = "block";
    window.scrollTo({
        top: 0,
      });
      document.body.style.overflow = "hidden";
  };
  
  // modal 닫기 함수
  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId)
    modal.style.display = "none";
    document.body.style.overflow = "auto";
     
  };

  // 언제든지 ESC 누르면 modal 전체 다 닫기
window.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      const modalGroupList =
        window.document.getElementsByClassName(".modalGroup");
  
      for (let i = 0; i < modalGroupList.length; i++) {
        const modal = modalGroupList.item(i);
        modal.style = "display: none";
      }
    }
  });