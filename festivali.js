firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

//trazenje festivala po idu
let festivals = {};
let festival;

let festivalId = getParamValue("id");       //uzima se proslijedjeni kljuc preko dugmeta za organizatora

getFestivals(festivalId);

function getFestivals(id /*= "/-MNVEu6iMr2EFlQO6TW60"*/){
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){

                festivals = JSON.parse(request.responseText);
                for(let key in festivals){
                    festival = festivals[key];
                    createCard("kartice",festival);     //prave se kartice u sectionu sa idem kartice

                }
                console.log(festivals);
            }
        }
    };

    request.open("GET", firebaseUrl +"/"+ id + ".json");        //uzimaju se kljucevi festivala
    request.send();
}

function createCard(cardId, festival){
    let cardElement = document.createElement("div");
    cardElement.classList.add("card","col-3");
    
    
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body","align-items-center","text-center","border-success-subtle");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title","m-3","text-success");
    cardTitle.textContent = festival.naziv;

    let cardSubtitle = document.createElement("h6","my-4");
    cardSubtitle.classList.add("card-subtitle","text-muted");
    cardSubtitle.innerText = "Tip: " + festival.tip + "\n" + "Cijena: " + festival.cena + "\n"
    + "Maksimalno osoba: " + festival.maxOsoba + "\n"+ "Prevoz: "+ festival.prevoz;



    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);

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
  





