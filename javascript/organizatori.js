
let firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

    let organizators = {};

getAllOrganizators();

//dodavanje u tabelu svih organizatora

function getAllOrganizators() {
    let request = new XMLHttpRequest();
    let whichTable = 1;

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {


                organizators = JSON.parse(request.responseText);        //parsira json
                for (let id in organizators) {
                    let organizator = organizators[id];                 //svaki organizator posebno

                    if (whichTable == 1) {
                        if(document.getElementById("allOrganizators1")!=null){
                        appendOrganizatorRow("allOrganizators1", id, organizator);       //dodaje se u tabelu
                        }
                        else{
                        appendOrganizatorRow("izmjena1", id, organizator);
                        }
                    }
                    if (whichTable == -1) {
                        if(document.getElementById("allOrganizators2")!=null){
                        appendOrganizatorRow("allOrganizators2", id, organizator);
                        }
                        else{
                        appendOrganizatorRow("izmjena2", id, organizator);
                        }
                    }
    
                    whichTable *= -1;
                }
            };
        }


    }
    request.open("GET", firebaseUrl + "/organizatoriFestivala.json");       //uzimaju se kljucevi ispod organizatora festivala
    request.send();
}





//DODAVANJE REDA U TABELU

function appendOrganizatorRow(tBody, id, organizator) {
    let hr = document.createElement("hr");
    hr.classList.add("mt-3", "border-3");
    let organizatorRow = document.createElement("tr");      //svaki put se kreira novi red
    let newLine = document.createElement("tr");

    let logoTd = document.createElement("td");
    let logoImg = document.createElement("img");
    logoImg.src = organizator.logo;                        // link za sliku
    logoImg.setAttribute("width", "100");
    logoImg.setAttribute("height", "100");
    logoTd.appendChild(logoImg);
    organizatorRow.appendChild(logoTd);

    let nazivTd = document.createElement("td");
    nazivTd.innerText = organizator.naziv;
    organizatorRow.appendChild(nazivTd);

    let emailTd = document.createElement("td");
    emailTd.innerText = organizator.email;
    organizatorRow.appendChild(emailTd);

    let godinaTd = document.createElement("td");
    godinaTd.innerHTML = "<b>Osnovano: </b>" + organizator.godinaOsnivanja;
    newLine.appendChild(godinaTd);

    let kontaktTd = document.createElement("td");
    kontaktTd.innerHTML = "<b>Kontakt: </b>" + organizator.kontaktTelefon;
    newLine.appendChild(kontaktTd);


    let adresaTd = document.createElement("td");
    adresaTd.innerHTML = "<b>Adresa: </b>" + organizator.adresa;
    newLine.appendChild(adresaTd);


    let festivaliTr = document.createElement("tr");
    festivaliTr.classList.add("text-center", "col-span-3");

     let festivalButton = document.createElement("button");
     if (tBody == "izmjena1" || tBody == "izmjena2") {
     festivalButton.textContent = "Izmijeni organizatora";
     } 
     else{
        festivalButton.textContent = "Festivali";
        
     }
     festivalButton.classList.add("btn","btn-lg", "btn-success", "mx-auto","right-aligned-button","mt-3");
     festivalButton.onclick = function FestivalsFunction(){
        window.location.href = 'festivali.html?id=' + organizator.festivali;         //salje se na stranicu festivali kljuc za festivale
 
         }
                 //funkcija koja otvara festivale za odredjenog organizatora
 
     festivaliTr.appendChild(festivalButton);
 

    document.getElementById(tBody).appendChild(hr);     
    document.getElementById(tBody).appendChild(organizatorRow);     //id za tabelu gdje se unose podaci u tbody tagu
    document.getElementById(tBody).appendChild(newLine);
    document.getElementById(tBody).appendChild(festivaliTr);

        
}





