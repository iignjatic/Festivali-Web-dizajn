firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

//trazenje festivala po idu
let festivals = {};
let festival;

let ids = getParamValue("id");       //uzima se proslijedjeni kljuc preko dugmeta za organizatora

let festivalID = ids.split("|")[1];       //uzima se id festivala
let organizatorID = ids.split("|")[0];    //uzima se id organizatora



getFestivals(organizatorID);

function getFestivals(id /*= "/-MNVEu6iMr2EFlQO6TW60"*/) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {

                festivals = JSON.parse(request.responseText);
                for (let key in festivals) {
                    festival = festivals[key];
                    createCard("kartice", festival, key);     //prave se kartice u sectionu sa idem kartice

                }
                console.log(festivals);
            }
        }
    };

    request.open("GET", firebaseUrl + "/festivali/" + id + ".json");        //uzimaju se kljucevi festivala
    request.send();
}

function createCard(cardId, festival, keyOfFestival) { //keyOfFestival je kljuc festivala
    let cardElement = document.createElement("div");
    cardElement.classList.add("card", "col-4", "mx-auto");
    cardElement.style.width = "25rem";

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "align-items-center", "bg-success-subtle", "border-dark");
    cardElement.style.marginRight = "25px";
    cardElement.style.marginBottom = "25px";

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "m-3", "text-success");
    cardTitle.textContent = festival.naziv;

    let cardSubtitle = document.createElement("h6", "my-4");
    cardSubtitle.classList.add("card-subtitle", "text-muted");
    cardSubtitle.innerText = "Tip: " + festival.tip + "\n" + "Cijena: " + festival.cena + "\n"
        + "Maksimalno osoba: " + festival.maxOsoba + "\n" + "Prevoz: " + festival.prevoz;


    let addFestival = document.createElement("button");
    addFestival.classList.add("btn","btn-lg", "col-6", "btn-success", "m-3");
    addFestival.onclick = function () {
        window.location.href = "formaZaFestival.html?id=" + organizatorID + "|" + keyOfFestival;      
    }
    addFestival.textContent = "Dodaj festival";

    let deleteFestival = document.createElement("button");
    deleteFestival.classList.add("btn","btn-lg", "col-6","btn-danger", "m-1");
    deleteFestival.onclick = function () {
        window.location.href = "brisanjeFestivala.html?id=" + organizatorID + "|" + keyOfFestival;      
    }
    deleteFestival.textContent = "Obrisi festival";


    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(addFestival);
    cardBody.appendChild(deleteFestival);


    cardElement.appendChild(cardBody);


    document.getElementById(cardId).appendChild(cardElement);
}



function getParamValue(name) {          //funkcija koja rastavlja id iz http linka
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");

    for (let i = 0; i < splitted.length; i++) {
        let s = splitted[i].split("=");
        let pName = s[0];
        let pValue = s[1];
        if (pName == name) {
            return pValue;
        }
    }
}






