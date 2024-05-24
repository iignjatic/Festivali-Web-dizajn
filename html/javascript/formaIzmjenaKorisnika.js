let firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

let users = {};
let id = getParamValue("id");       //uzima se proslijedjeni kljuc preko dugmeta za organizatora
let user;

getUserData();

function getUserData() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {


                users = JSON.parse(request.responseText);        //parsira json

                user = users[id];                 //svaki organizator posebno

                document.getElementById('username_us').value = user.korisnickoIme;
                document.getElementById('password_us').value = user.lozinka;
                document.getElementById('name_us').value = user.ime;
                document.getElementById('surname_us').value = user.prezime;
                document.getElementById('email_us').value = user.email;
                document.getElementById('phone_us').value = user.telefon;
                document.getElementById('address_us').value = user.adresa;
                document.getElementById('date_us').value = user.datumRodjenja;
                document.getElementById('role_us').value = user.zanimanje;
                

                }
            
            else {
                window.location.href = "greska.html";
            }
        }


    };
    request.open("GET", firebaseUrl + "/korisnici.json");       //uzimaju se kljucevi ispod organizatora festivala
    request.send();
}


//izmjena korisnika na submit
document.addEventListener("DOMContentLoaded", function() {
    let editUser = document.getElementById("editUser");
    // Dodaj slušača događaja...

    //cekamo submit dogadjaj
    editUser.addEventListener("submit", function (e) {

        // sprjecavanje slanja forme na server prije provjere
        e.preventDefault();

        let usernameInput = document.getElementById('username').value;
        let passwordInput = document.getElementById('password').value;
        let nameInput = document.getElementById('name').value;
        let surnameInput = document.getElementById('surname').value;
        let emailInput = document.getElementById('email').value;
        let phoneInput = document.getElementById('phone').value;
        let addressInput = document.getElementById('address').value;
        let dateInput = document.getElementById('date').value;
        let roleInput = document.getElementById('role').value;

        let isValid = true;
    
        if (usernameInput != "") {
            user.korisnickoIme = usernameInput;
            }
            else{
                document.getElementById('usernameValid').innerText = "Korisnicko ime ne smije biti prazno.";
                isValid = false;            
            }
        
        if (passwordInput != "") {
            user.lozinka = passwordInput;
        }
        else{
            document.getElementById('passwordValid').innerText = "Lozinka ne smije biti prazna.";
            isValid = false;
        }
        
        if (nameInput != "") {
            user.ime = nameInput
            }
            else{
                document.getElementById('nameValid').innerText = "Ime ne smije biti prazno.";
        
                isValid = false;        
        }
        
        if (surnameInput != "") {
            user.prezime = surnameInput
            }
            else{
                document.getElementById('surnameValid').innerText = "Prezime ne smije biti prazno.";
                isValid = false;           
            }  
        
        let validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // provjera za email
        if (validRegex.test(emailInput)) {
            user.email = emailInput
        } else {
            document.getElementById('emailValid').innerText = "Email nije u dobrom obliku.";
            isValid = false;
        }    
        
        if (phoneInput != "") {
            user.telefon = phoneInput
            }
            else{
                document.getElementById('phoneValid').innerText = "Morate unijeti broj telefona.";
                isValid = false;            
            }
        
        if (addressInput != "") {
            user.adresa = addressInput
            }
            else{
                document.getElementById('addressValid').innerText = "Adresa ne smije biti prazna.";
                isValid = false;            
            }    
        
        if (roleInput != "") {
            user.zanimanje = roleInput
            }
            else{
                document.getElementById('roleValid').innerText = "Zanimanje ne smije biti prazno.";
                isValid = false;            
            }    
        
        if (!isValid) {
                return;
            }    
        
        let putRequest = new XMLHttpRequest();

        putRequest.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "formaIzmjenaKorisnika.html";
                } else {
                    alert("Greška prilikom izmjene korisnika.");
                }
            }
        };

        putRequest.open("PUT", firebaseUrl + "/korisnici/" + id +".json");
        putRequest.send(JSON.stringify(user));
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