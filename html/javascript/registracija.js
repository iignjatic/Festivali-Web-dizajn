firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";


document.addEventListener("DOMContentLoaded", function() {
    let addUser = document.getElementById("addUser");

    addUser.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let name = document.getElementById("name").value;
        let surname = document.getElementById("surname").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let date = document.getElementById("date").value;
        let phone = document.getElementById("phone").value;
        let role = document.getElementById("role").value;

        let isValid = true;
    
        if (username != "") {
            document.getElementById('usernameValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('usernameValidReg').innerText = "Korisnicko ime ne smije biti prazno.";
            isValid = false;            
        }
        
        if (password != "") {
            document.getElementById('passwordValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('passwordValidReg').innerText = "Lozinka ne smije biti prazna.";
            isValid = false;
        }
        
        if (name != "") {
            document.getElementById('nameValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('nameValidReg').innerText = "Ime ne smije biti prazno.";
            isValid = false;        
        }
        
        if (surname != "") {
            document.getElementById('surnameValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('surnameValidReg').innerText = "Prezime ne smije biti prazno.";
            isValid = false;           
        }  
        
        let validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // provjera za email
        if (validRegex.test(email)) {
            document.getElementById('emailValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('emailValidReg').innerText = "Email nije u dobrom obliku.";
            isValid = false;
        }    
        
        if (phone != "") {
            document.getElementById('phoneValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('phoneValidReg').innerText = "Morate unijeti broj telefona.";
            isValid = false;            
        }
        
        if (address != "") {
            document.getElementById('addressValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('addressValidReg').innerText = "Adresa ne smije biti prazna.";
            isValid = false;            
        }    
        
        if (role != "") {
            document.getElementById('roleValidReg').innerText = "";
            isValid = true;
        } else {
            document.getElementById('roleValidReg').innerText = "Zanimanje ne smije biti prazno.";
            isValid = false;            
        }
        
        if (!isValid) {
                return;
            }    
        

        let newUser = {
            korisnickoIme: username,
            lozinka: password,
            ime: name,
            prezime: surname,
            email: email,
            adresa: address,
            datumRodjenja: date,
            telefon: phone,
            uloga: role
        };

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://festivali-90667-default-rtdb.firebaseio.com/korisnici.json", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Korisnik je uspešno dodat!");
            }
        };
        xhr.send(JSON.stringify(newUser));
    });
});

