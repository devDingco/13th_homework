const copyToastBox = () => {
    window.document.getElementById("toastMessage").style =
      "display: block";
  
    setTimeout(() => {
      window.document.getElementById("toastMessage").style =
        "display: none";
    }, 1000);
  };