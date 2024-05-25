let firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

let organizators = {};
let organizator = {};
let id = getParamValue("id");  

getOrganizatorData();


function getOrganizatorData() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4){
            if (this.status == 200) {
                organizators = JSON.parse(request.responseText);
                console.log(organizators); 
                organizator = organizators[id];

                    document.getElementById('logo_org').value = organizator.logo;
                    document.getElementById('name_org').value = organizator.naziv;
                    document.getElementById('email_org').value = organizator.email;
                    document.getElementById('year_org').value = organizator.godinaOsnivanja;
                    document.getElementById('phone_org').value = organizator.kontaktTelefon;
                    document.getElementById('address_org').value = organizator.adresa;
                    document.getElementById('festival_org').value = organizator.festivali;

                    console.log(organizator);
        }
             else {
              window.location.href = "greska.html"; 
            
           }
        }
    };
    request.open("GET", firebaseUrl + "/organizatoriFestivala.json");
    request.send();

}


document.addEventListener("DOMContentLoaded", function() {
    let editOrganizator = document.getElementById("editOrganizator");
    editOrganizator.addEventListener("submit", function (e) {
        e.preventDefault(); 

        let logo = document.getElementById('logo_org').value;
        let name = document.getElementById('name_org').value;
        let email = document.getElementById('email_org').value;
        let year = document.getElementById('year_org').value;
        let phone = document.getElementById('phone_org').value;
        let address = document.getElementById('address_org').value;
        let festival = document.getElementById('festival_org').value;

        let isValid = true;

        if (logo) {
            organizator.logo = logo;
        } else {
            document.getElementById('logoValid').innerText = "Logo polje ne smije biti prazno.";
            isValid = false;
        }

        if (name) {
            organizator.naziv = name;
        } else {
            document.getElementById('nameValid').innerText = "Ime ne smije biti prazno.";
            isValid = false;
        }

        let validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (validRegex.test(email)) {
            organizator.email = email;
        } else {
            document.getElementById('emailValid').innerText = "Email nije u dobrom obliku.";
            isValid = false;
        }

        if (phone) {
            organizator.kontaktTelefon = phone;
        } else {
            document.getElementById('phoneValid').innerText = "Telefon ne smije biti prazan.";
            isValid = false;
        }

        if (address) {
            organizator.adresa = address;
        } else {
            document.getElementById('addressValid').innerText = "Adresa ne smije biti prazna.";
            isValid = false;
        }

        if(year){
            organizator.godinaOsnivanja = year;
        } else {
            document.getElementById('yearValid').innerText = "Godina osnivanja ne smije biti prazna.";
            isValid = false;
        }
        

        if (festival) {
            organizator.festivali = festival;
        } else {
            document.getElementById('festivalValid').innerText = "Festival ne smije biti prazan.";
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        let putRequest = new XMLHttpRequest();
        putRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "formaIzmjenaOrganizatora.html"; 
                } else {
                    alert("Greška prilikom izmjene organizatora.");
                }
            }
        };
        putRequest.open("PUT", firebaseUrl + "/organizatoriFestivala/" + id + ".json");
        putRequest.send(JSON.stringify(organizator));
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