
let firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

let organizatorsId = getParamValue("id");  
let organizators = {};

getAllOrganizators();

//dodavanje u tabelu svih organizatora

function getAllOrganizators(){
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){

                organizators = JSON.parse(request.responseText);        //parsira json
                for (let id in organizators){
                    let organizator = organizators[id];                 //svaki organizator posebno

                    appendOrganizatorRow("allOrganizators", id, organizator);       //dodaje se u tabelu
                }
            }
        }
    };

    request.open("GET", firebaseUrl + "/organizatoriFestivala.json");       //uzimaju se kljucevi ispod organizatora festivala
    request.send();
}




//DODAVANJE REDA U TABELU

function appendOrganizatorRow(tBody, id, organizator){
    let organizatorRow = document.createElement("tr");      //svaki put se kreira novi red

    let logoTd = document.createElement("td");
    let logoImg = document.createElement("img");
    logoImg.src = organizator.logo;                        // link za sliku
    logoTd.appendChild(logoImg); 
    organizatorRow.appendChild(logoTd);

    let nazivTd = document.createElement("td");
    nazivTd.innerText = organizator.naziv;
    organizatorRow.appendChild(nazivTd);

    let godinaTd = document.createElement("td");
    godinaTd.innerText = organizator.godinaOsnivanja;
    organizatorRow.appendChild(godinaTd);

    let adresaTd = document.createElement("td");
    adresaTd.innerText = organizator.adresa;
    organizatorRow.appendChild(adresaTd);

    let kontaktTd = document.createElement("td");
    kontaktTd.innerText = organizator.kontaktTelefon;
    organizatorRow.appendChild(kontaktTd);

    let emailTd = document.createElement("td");
    emailTd.innerText = organizator.email;
    organizatorRow.appendChild(emailTd);

    let festivaliTd = document.createElement("td");
    let festivalButton = document.createElement("button");
    festivalButton.textContent = "Saznajte vise"; 
    festivalButton.onclick = function FestivalsFunction(){
       window.location.href = 'festivali.html?id=' + organizator.festivali;         //salje se na stranicu festivali kljuc za festivale

        }
                //funkcija koja otvara festivale za odredjenog organizatora

    festivaliTd.appendChild(festivalButton);
    organizatorRow.appendChild(festivaliTd);

    document.getElementById(tBody).appendChild(organizatorRow);     //id za tabelu gdje se unose podaci u tbody tagu
}




/*
    Pomocna funkcija koja ocitava vrednost URL parametra sa prosledjenim imenom
 */
    function getParamValue(name) {
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
      
