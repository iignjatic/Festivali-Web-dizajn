
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


    if (tBody == "izmjena1" || tBody == "izmjena2") {       //kod vezan samo za izmjenu organizatora
        let updateTd = document.createElement("td");
        let updateButton = document.createElement("button");
        updateButton.classList.add("btn","btn-lg", "btn-success", "mx-auto","right-aligned-button");
        updateButton.textContent = "Izmijeni organizatora";
        updateButton.onclick = function(){
            window.location.href = "formaIzmjenaOrganizatora.html?id=" + id;       //salje se kljuc za organizatora
        }
        updateTd.appendChild(updateButton);

        let deleteTd = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn","btn-lg", "btn-danger", "mx-auto","right-aligned-button");
        deleteButton.textContent = "Obrisi organizatora";
        deleteTd.appendChild(deleteButton);

        let updateFestival = document.createElement("td");
        let addButton = document.createElement("button");
        addButton.classList.add("btn","btn-lg", "btn-secondary", "mx-auto","right-aligned-button");
        addButton.style.height = "100%";
        addButton.textContent = "Klikni za uredjivanje festivala";
        updateFestival.appendChild(addButton);

        festivaliTr.appendChild(updateTd);
        festivaliTr.appendChild(deleteTd);
        festivaliTr.appendChild(updateFestival);
    } 



     else{
        let festivaliTd = document.createElement("td");
        let festivalButton = document.createElement("button");
        festivalButton.classList.add("btn","btn-lg", "btn-success", "mx-auto","right-aligned-button");
        festivalButton.textContent = "Festivali";       //inace na stranici sa organizatorima
        festivaliTd.appendChild(festivalButton);   

        festivalButton.onclick = function FestivalsFunction(){                      //funkcija koja otvara festivale za odredjenog organizatora
            window.location.href = 'festivali.html?id=' + organizator.festivali + "|" + id;         //salje se na stranicu festivali kljuc za festivale
     
             }
        
        
        festivaliTr.appendChild(festivaliTd);
     

        
     }
    
                

 
 

    document.getElementById(tBody).appendChild(hr);     
    document.getElementById(tBody).appendChild(organizatorRow);     //id za tabelu gdje se unose podaci u tbody tagu
    document.getElementById(tBody).appendChild(newLine);
    document.getElementById(tBody).appendChild(festivaliTr);

        
}





