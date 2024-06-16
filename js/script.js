"use strict!"

let slccategorie, slcSort;
let divOverview, divDetails;
let dingen = [];
const sortingOptions = ["categorie", "houden", "prijs"];
const details = ["Age", "Job", "Quote", "Voice"];

window.addEventListener("load", initialize);

function initialize() {
    bindElements();
    addEventListeners();
    getrommel();
    showdings();
    loadcategories();
    loadSortingOptions();
    getTotalSellingPrice();
}

function bindElements() {
    slccategorie = document.querySelector("div.side-left > select:nth-child(2)");
    slcSort = document.querySelector("div.side-left > select:last-child");
    divOverview = document.getElementById("overview");
    divDetails = document.getElementsByClassName("details")[0];
}

function addEventListeners() {
    slccategorie.addEventListener("change", showdings);
    slcSort.addEventListener("change", showdings);
}

function getrommel() {
    rommel.forEach(ding => { dingen.push(ding) });
}

function loadcategories() {
    const categories = [];
    rommel.forEach(ding => {
        if (!categories.includes(ding.categorie)) {
            categories.push(ding.categorie);
        }
    });
    categories.forEach(categorie => {
        slccategorie[slccategorie.length] = new Option(categorie);
    });
}

function loadSortingOptions() {
    sortingOptions.forEach(option => {
        slcSort[slcSort.length] = new Option(option);
    });
}

function showdings() {
    divOverview.innerText = "";
    filterdings();
    sortdings();
    getdingboxes();
    getTotalSellingPrice();
}

function filterdings() {
    dingen = [];
    const filter = slccategorie.value;
    if (filter === "all") {
        getrommel();
    } else {
        rommel.forEach(ding => {
            if (ding.categorie === filter) {
                dingen.push(ding);
            }
        });
    }
}

function sortdings() {
    const sortingParameter = slcSort.value;
    if (sortingParameter !== "nosort") {
        dingen.sort((a, b) => {
            if (a[sortingParameter] < b[sortingParameter]) {
                return -1;
            }
            if (a[sortingParameter] > b[sortingParameter]) {
                return 1;
            }
            return 0;
        });
    } else {
        dingen = rommel;
        filterdings();
    }
}

function getdingboxes() {
    dingen.forEach(ding => {
        const divding = document.createElement("div");

        divding.appendChild(getName(ding));
        divding.appendChild(getDingImage(ding));
        divding.appendChild(getInfo(ding));
        divding.setAttribute("id", ding.firstname);
        divOverview.appendChild(divding);
    });
}

function getName(ding) {
    const hdgName = document.createElement("h2");
    hdgName.innerHTML = `${ding.name}<br/>(€ ${ding.price})`;
    return hdgName;
}

function getDingImage(ding) {
    const imgding = document.createElement("img");
    let dingImage;
    dingImage = `img/${ding.image}`;
    imgding.setAttribute("src", dingImage);
    return imgding;
}

function getInfo(ding) {
    const pgrInfo = document.createElement("p");
    let info = `${ding.categorie}`;
    if(ding.info !== undefined){
        info += ` - ${ding.info}`;
    }

    if(ding.keep){
        info += " (Houden)";
    } else {
        info += " (Verkopen)";
    }
    pgrInfo.innerText = info

    return pgrInfo;
}

function getTotalSellingPrice(){
    divDetails.innerText = "";
    let totalPrice = 0;
    dingen.forEach(ding => {
        if(Number(ding.price)){
            totalPrice += ding.price;
        }
    });
    divDetails.innerText = `Totale verkoopprijs dingen = € ${totalPrice}`;
}
