const onFocusActiveModal = (modal) => {
  switch (modal) {
    case "aside_layout":
      document.getElementById("check_happy").focus();
      break;
    case "diary_cancel_modal":
      document.getElementById("cancelRegistrationBtn").focus();
      break;
    case "diary_registration_modal": {
      diaryEntry.commentList = [];
      getDiaryTitleAndContent(diaryEntry);
      document.getElementById("confirmRegistration").focus();
      break;
    }
    case "confirm_delete_diary_modal":
    case "confirm_delete_diary_modal_detail_page": {
      document.getElementById("deleteDiaryBtn").focus();
      break;
    }
  }
};