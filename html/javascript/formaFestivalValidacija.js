firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

//trazenje festivala po idu
let festivals = {};
let festival;

let ids = getParamValue("id");       //uzima se proslijedjeni kljuc preko dugmeta za organizatora

let festivalID = ids.split("|")[1];       //uzima se id festivala
let organizatorID = ids.split("|")[0];    //uzima se id organizatora


document.addEventListener("DOMContentLoaded", function() {
    let addFestivalForm = document.getElementById("addForm");

    addFestivalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name_f = document.getElementById("name_f").value;
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
        
        if (name_f != "") {
            document.getElementById('nameValid').innerText = "";
            isValid = true;
        } else {
            document.getElementById('nameValid').innerText = "Ime ne smije biti prazno.";
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
            naziv: name_f,
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

