function onClickToggle(event) {
    if (event.target.checked === true) {
        document.documentElement.setAttribute("dark", "true");
    } else {
        document.documentElement.setAttribute("dark", "false");
    }
}
