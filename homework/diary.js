function openTab(event, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablinks");
for (var i = 0; i < tablinks.length; i++) {
tablinks[i].className = tablinks[i].className.replace(" active", "");
}

// 클릭된 탭을 보여주고, 탭 링크에 "active" 클래스를 추가합니다.
document.getElementById(tabName).style.display = "block";
evt.currentTarget.className += " active";
}

  
  