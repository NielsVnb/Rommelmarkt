window.addEventListener("load", getDataFormat);

function getDataFormat(){
    const body = document.querySelector("body");
    const divData = document.createElement("div");
    let data = 'const rommel = [<br/>';
    for(let i = 0; i < 157; i++){
        data += `{id : "${i}", name : "name", categorie : "categorie", image : "image", prijs : "prijs", info : "info", houden : "false"},<br/>`;
    }
    data += "]";

    divData.innerHTML = data;
    body.appendChild(divData);
}