const top_scroll = () => {
    window.scrollTo( {top:0, behavior:"smooth" })
}

window.onscroll = () => {
    const selectElemnet = document.querySelector(".diary_select>select");

    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        selectElemnet.classList.add("d_change_color");
    }
    else{
        selectElemnet.classList.remove("d_change_color");
    }
}

const JS_scroll = () => {
    const scroll_down = window.document.getElementById("").scrollTop;

    if(scroll_down){
        window.document.getElementById("").style="background-color:gray;";
    }
    else{
        window.document.getElementById("").style="background-color:red;";
    }
}
// getElementById("") ?