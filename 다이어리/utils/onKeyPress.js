const onKeyPress = (event) => {
  const modalParentId = event.target.offsetParent.id;
  console.log(modalParentId);
  const ENTER_KEY_CODE = event.keyCode === 13;
  const ESCAPE_KEY_CODE = event.keyCode === 27;
  switch (modalParentId) {
    case "aside_layout": {
      ENTER_KEY_CODE
        ? registerDiary(event)
        : ESCAPE_KEY_CODE
        ? triggerModal("diary_cancel_modal")
        : undefined;
      break;
    }
    case "diary_registration_modal":
    case "confirm_delete_diary_modal": {
      ENTER_KEY_CODE || ESCAPE_KEY_CODE
        ? closeAllModals(modalParentId)
        : undefined;
      break;
    }
    case "diary_cancel_modal": {
      ENTER_KEY_CODE
        ? closeAllModals(modalParentId)
        : ESCAPE_KEY_CODE
        ? closeSingleModal(modalParentId)
        : undefined;
      break;
    }
    case "confirm_delete_diary_modal_detail_page": {
      ENTER_KEY_CODE
        ? deleteDiary()
        : ESCAPE_KEY_CODE
        ? closeSingleModal(modalParentId)
        : undefined;
    }
  }
};
