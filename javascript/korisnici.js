let firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com";

let users = {};

getUsers();

function getUsers(){
    let request = new XMLHttpRequest();

    let whichTable = 1;

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                users = JSON.parse(request.responseText);

                for(let key in users){
                   let user = users[key];

                if (whichTable == 1) {
                    createContent("izmjenaKorisnika1", user);       //dodaje se u tabelu
                }
                else{
                    createContent("izmjenaKorisnika2", user);
                }
                whichTable *= -1;
            }
            };
        }
    }
    request.open("GET", firebaseUrl + "/korisnici.json");
    request.send();
}

function createContent(tbody, user){
    let newLine = document.createElement("hr");
    newLine.classList.add("mt-3", "border-3");

    let firstHeader = document.createElement("tr");
    firstHeader.classList.add("fw-bold", "text-center");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    
    td1.textContent = "Ime";
    td2.textContent = "Prezime";
    td3.textContent = "Email";
    td4.textContent = "Korisnicko ime";
    td5.textContent = "Lozinka";

    firstHeader.appendChild(td1);
    firstHeader.appendChild(td2);
    firstHeader.appendChild(td3);
    firstHeader.appendChild(td4);
    firstHeader.appendChild(td5);


    let secondHeader = document.createElement("tr");
    secondHeader.classList.add("fw-bold", "text-center");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    let td9 = document.createElement("td");
    let td10 = document.createElement("td");

    td6.textContent = "Telefon";
    td7.textContent = "Zanimanje";
    td8.textContent = "Adresa";
    td9.textContent = "Datum rodjenja";
    
  
    td10.textContent = "Izmjena";


    secondHeader.appendChild(td6);
    secondHeader.appendChild(td7);
    secondHeader.appendChild(td8);
    secondHeader.appendChild(td9);
    secondHeader.appendChild(td10);

    let userRow = document.createElement("tr");
    let dataRow = document.createElement("tr");

    let userName = document.createElement("td");
    userName.textContent = user.ime;
    userRow.appendChild(userName);

    let userSurname = document.createElement("td");
    userSurname.textContent = user.prezime;
    userRow.appendChild(userSurname);

    let email = document.createElement("td");
    email.textContent = user.email;
    userRow.appendChild(email);

    let username = document.createElement("td");
    username.textContent = user.korisnickoIme;
    userRow.appendChild(username);

    let password = document.createElement("td");
    password.textContent = user.lozinka ;
    userRow.appendChild(password);

 

    

    let phone = document.createElement("td");
    phone.textContent =  user.telefon;
    dataRow.appendChild(phone);


    let role = document.createElement("td");
    role.textContent = user.zanimanje;
    dataRow.appendChild(role);

    

    let address = document.createElement("td");
    address.textContent =   user.adresa;
    dataRow.appendChild(address);

    let birth = document.createElement("td");
    birth.textContent = user.datumRodjenja;
    dataRow.appendChild(birth);

    let button = document.createElement("button");
    button.classList.add("btn", "btn-success", "btn-lg","mx-auto","right-aligned-button");
    button.style.width = "100%";
    button.style.height = "100%";
    button.textContent = "Izmijeni korisnika";
    button.onclick = function(){
        window.location.href = "formaIzmjenaKorisnika.html";
    }

    dataRow.appendChild(button);


    document.getElementById(tbody).appendChild(firstHeader);
    document.getElementById(tbody).appendChild(userRow);
    document.getElementById(tbody).appendChild(secondHeader);
    document.getElementById(tbody).appendChild(dataRow);
    document.getElementById(tbody).appendChild(newLine);


   

}