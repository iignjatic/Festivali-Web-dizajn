let firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

let organizators = {};
let id = getParamValue("id");       //uzima se proslijedjeni kljuc preko dugmeta za organizatora

getOrganizatorData();

function getOrganizatorData() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {


                organizators = JSON.parse(request.responseText);        //parsira json

                let organizator = organizators[id];                 //svaki organizator posebno

                document.getElementById('logo_org').value = organizator.logo;
                console.log(organizator.logo)
                document.getElementById('name_org').value = organizator.naziv;
                console.log(organizator.naziv)
                document.getElementById('email_org').value = organizator.email;
                console.log(organizator.email)
                document.getElementById('year_org').value = organizator.godinaOsnivanja;
                console.log(organizator.godinaOsnivanja)
                document.getElementById('phone_org').value = organizator.kontaktTelefon;
                console.log(organizator.kontaktTelefon)
                document.getElementById('address_org').value = organizator.adresa;
                console.log(organizator.adresa)
                document.getElementById('festival_org').value = organizator.festivali;
                console.log(organizator.festivali)

                console.log(organizator)

                }
            else {
                window.location.href = "greska.html";
            }
        }

    };
    request.open("GET", firebaseUrl + "/organizatoriFestivala.json");       //uzimaju se kljucevi ispod organizatora festivala
    request.send();
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