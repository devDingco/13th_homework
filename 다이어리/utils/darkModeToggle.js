const darkModeToggle = (event) => {
  const mode = document.documentElement;
  event.target.checked
    ? mode.setAttribute("mode", "dark")
    : mode.setAttribute("mode", "light");
};
