firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

//trazenje festivala po idu
let festivals = {};
let festival;

let ids = getParamValue("id");       //uzima se proslijedjeni kljuc preko dugmeta za organizatora

let festivalID = ids.split("|")[1];       //uzima se id festivala
let organizatorID = ids.split("|")[0];    //uzima se id organizatora


getOrganizator(festivalID);

function getOrganizator(id) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if(this.status == 200) {
                let organizator = JSON.parse(request.responseText);
                let data = document.createElement("div");
                data.classList.add("bg-success-subtle", "border-dark", "rounded", "p-2", "mx-auto");

                let row = document.createElement("div");   
                row.classList.add("row", "justify-content-center","bg-success-subtle");
                row.style.position = "sticky";
                row.style.top = "60px";
                row.style.zIndex = "2";

                let logo1 = document.createElement("img");
                logo1.src = "slike/logo.png";
                logo1.classList.add("col-2", "mx-auto");
                row.appendChild(logo1);

                let name = document.createElement("h1");
                name.classList.add("display-3");
                name.textContent = organizator.naziv;
                name.classList.add("col-md-4", "col-sm-2","mt-4");

                row.appendChild(name);

                let logo2 = document.createElement("img");
                logo2.src = "slike/logo.png";
                logo2.classList.add("col-2", "mx-auto");
                row.appendChild(logo2);

                let hr = document.createElement("hr");
                hr.classList.add("mt-2" ,"border-3");
                hr.style.zIndex = "1";


                

                let email = document.createElement("h3");
                email.textContent ="Email: " + organizator.email;

                let address = document.createElement("h3");
                address.textContent = organizator.adresa;

                let phone = document.createElement("h3");
                phone.textContent = "Telefon: " + organizator.kontaktTelefon;

                let year = document.createElement("h3");
                year.textContent = "Godina osnivanja: " + organizator.godinaOsnivanja;



                let hr1 = document.createElement("hr");
                hr1.classList.add("mt-2" ,"border-3");


                data.appendChild(row);
                data.appendChild(hr);
                data.appendChild(phone);
                data.appendChild(year);
                data.appendChild(email);

                data.appendChild(address);


                data.appendChild(hr1);

                document.getElementById("organizator").appendChild(data);
        }
        else {
            window.location.href = "greska.html";
        }
    }
    };

    request.open("GET", firebaseUrl + "/organizatoriFestivala/" + id + ".json");
    request.send();
}


getFestivals(organizatorID);

function getFestivals(id /*= "/-MNVEu6iMr2EFlQO6TW60"*/) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4){
            if(this.status == 200) {

                festivals = JSON.parse(request.responseText);
                for (let key in festivals) {
                    festival = festivals[key];
                    createCard("kartice", festival, key);     //prave se kartice u sectionu sa idem kartice

                }
                console.log(festivals);
            
        }
            else {
                window.location.href = "greska.html";
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
    cardElement.style.border = "3px solid grey";

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

    let buttonFestival = document.createElement("button");
    buttonFestival.classList.add("btn", "btn-success", "m-3");
    buttonFestival.onclick = function () {
        window.location.href = "pojedinacni_festival.html?id=" + organizatorID + "|" + keyOfFestival;     //na stranicu za festival se salje kljuc tog festivala 
        //za organizatora
    }
    buttonFestival.textContent = "Detalji";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(buttonFestival);


    cardElement.appendChild(cardBody);


    document.getElementById(cardId).appendChild(cardElement);
}



document.addEventListener("DOMContentLoaded", function() {
    let addFestivalForm = document.getElementById("addForm");

    addFestivalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let type = document.getElementById("type").value;
        let transport = document.getElementById("transport").value;
        let persons = document.getElementById("persons").value;
        let price = document.getElementById("price").value;
        let picture = document.getElementById("picture").value;
        let description = document.getElementById("description").value;
   

        let isValid = true;
    
        if (type != "") {
            document.getElementById('typeValid').innerText = "";
            isValid = true;
        } else {
            document.getElementById('typeValid').innerText = "Polje tip ne smije biti prazno.";
            isValid = false;            
        }
        
        if (transport != "") {
            document.getElementById('transportValid').innerText = "";
            isValid = true;
        } else {
            document.getElementById('transportValid').innerText = "Transport polje ne smije biti prazno.";
            isValid = false;
        }
        
        if (name != "") {
            document.getElementById('nameValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('nameValidReg').innerText = "Ime ne smije biti prazno.";
            isValid = false;        
        }
        
        if (persons != "" && persons > 0 && isNaN(persons) == false) {
            document.getElementById('personsValid').innerText = "";
            isValid = true;
        } else {
            document.getElementById('personsValid').innerText = "Broj ljudi mora biti broj veci od 0.";
            isValid = false;           
        }  
        
        
        if (price != "" && price > 0 && isNaN(price) == false) {
            document.getElementById('priceValid').innerText = "";
            isValid = true;
        } else {
            document.getElementById('priceValid').innerText = "Cijena mora biti broj veci od 0.";
            isValid = false;            
        }
        
        if (picture != "") {
            document.getElementById('pictureValid').innerText = "";
            isValid = true;
        } else {
            document.getElementById('pictureValid').innerText = "Polje za sliku ne smije biti prazno.";
            isValid = false;            
        }    
        
        if (description != "") {
            document.getElementById('descriptionValid').innerText = "";
            isValid = true;
        } else {
            document.getElementById('descriptionValid').innerText = "Opis polje ne smije biti prazno.";
            isValid = false;            
        }
        
        if (!isValid) {
                return;
            }    
        

        let newFestival = {
            naziv: name,
            tip: type,
            prevoz: transport,
            maxOsoba: parseInt(persons),
            cena: parseFloat(price),
            slika: picture,
            opis: description
        };

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://festivali-90667-default-rtdb.firebaseio.com/festivali/"+organizatorID+".json", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Festival je uspješno dodat!");
            } else {
            alert("Greška prilikom dodavanja festivala.");
        }
        };
        xhr.send(JSON.stringify(newFestival));
    });
});






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






