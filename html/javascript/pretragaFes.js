firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

//trazenje festivala po idu
let festivali = {};

let Id = getParamValue("id");       //uzima se proslijedjeni kljuc preko dugmeta za organizatora

let festivalId = Id.split("|")[1];       //uzima se id festivala
let organizatorId = Id.split("|")[0];    //uzima se id organizatora



let form = document.getElementById("search");


document.addEventListener("DOMContentLoaded", function() {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        let organizatorData = document.getElementById("organizator");
        organizatorData.innerHTML = "";

        let cards = document.getElementById("kartice");
            cards.innerHTML = "";
    
       
    
        let name = document.getElementById("name").value;
        let type = document.getElementById("type").value;

    
    
        getFestivals(organizatorId, name, type);
    });
    });

function getFestivals(id /*= "/-MNVEu6iMr2EFlQO6TW60"*/, name, type) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4){
            if(this.status == 200) {

                festivali = JSON.parse(request.responseText);
                for (let key in festivali) {
                    let festival = festivals[key];

                    console.log(name);
                    console.log(type);

                    if (typeof name !== "undefined" && name!="" && typeof type !== "undefined" && type!="") {
                    if (festival.naziv.toLowerCase().includes(name.toLowerCase()) && festival.tip.toLowerCase().includes(type.toLowerCase())) {       //ako se poklapa sa unesenim nazivom
                    createCard("kartice", festival, key, name, type);     //prave se kartice u sectionu sa idem kartice
                    }
                }
                    else if ((typeof name === "undefined" || name === "") && festival.tip.toLowerCase().includes(type.toLowerCase())) {
                        createCard("kartice", festival, key, undefined, type);
                    }
                    else if ((typeof type === "undefined" || type === "") && festival.naziv.toLowerCase().includes(name.toLowerCase())) {
                        createCard("kartice", festival, key, name, undefined);
                    }
                else{
                    continue;
                }
                console.log(festivals);
            
        }
        
    }
   
            else {
                window.location.href = "greska.html";
            }
        }
    };

    request.open("GET", firebaseUrl + "/festivali/" + id + ".json");        //uzimaju se kljucevi festivala
    request.send();
}

function createCard(cardId, festival, keyOfFestival, name, type) { //keyOfFestival je kljuc festivala
    let cardElement = document.createElement("div");
    cardElement.classList.add("card", "col-4", "mx-auto");
    cardElement.style.width = "25rem";
    cardElement.style.border = "3px solid grey";

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "align-items-center", "bg-success-subtle", "border-dark");
    cardElement.style.marginRight = "25px";
    cardElement.style.marginBottom = "25px";

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "m-3", "text-success");

    if(typeof name != "undefined" && name != ""){
    if (festival.naziv.toLowerCase().includes(name.toLowerCase())) {
    let marked = document.createElement("mark");
    marked.textContent = festival.naziv;

    cardTitle.appendChild(marked);
}
    }
    else{
        cardTitle.innerText = festival.naziv;
    }

    let cardSubtitle = document.createElement("h6");
    cardSubtitle.classList.add("my-4", "card-subtitle", "text-muted");
    cardSubtitle.textContent = "Tip: ";
    
    if (typeof type !== "undefined" && type !=="") {
        if (festival.tip.toLowerCase().includes(type.toLowerCase())) {
            let marked = document.createElement("mark");
            marked.textContent = festival.tip;
            cardSubtitle.appendChild(marked);
        } else {
            cardSubtitle.textContent += festival.tip;
        }
    } else {
        cardSubtitle.textContent += festival.tip;
    }
    
    let additionalInfo = `
    Cijena: ${festival.cena}
    Maksimalno osoba: ${festival.maxOsoba}
    Prevoz: ${festival.prevoz}
    `;
    
    cardSubtitle.appendChild(document.createTextNode(additionalInfo));
    
    let buttonFestival = document.createElement("button");
    buttonFestival.classList.add("btn", "btn-success", "m-3");
    buttonFestival.onclick = function () {
        window.location.href = "pojedinacni_festival.html?id=" + organizatorId + "|" + keyOfFestival;     //na stranicu za festival se salje kljuc tog festivala 
        //za organizatora
    }
    buttonFestival.textContent = "Detalji";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(buttonFestival);


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






