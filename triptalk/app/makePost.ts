function makePost({ username:string, password:string, title:string, content:string, address:string, youtubeLink:string, files:null }) {
    let idxstr:string | null = localStorage.getItem('lastIndex');
    if (idxstr === null) {
        localStorage.setItem('lastIndex', "0");
        idxstr = "0";
    }
    let idx: number = Number(idxstr)+1;
   // const post = 
    localStorage.setItem(idx.toString(), )
}