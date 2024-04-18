firebaseUrl = "https://festivali-90667-default-rtdb.firebaseio.com/";

let festivals = {};
let festival;

let id = getParamValue("id");
let festivalId = id.split("|")[1];          //uzima se id festivala
let organizatorId = id.split("|")[0];       //uzima se id organizatora

getFestivals(festivalId);

function getFestivals(festivalId) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                festival = JSON.parse(request.responseText);        //preuzima se festival sa atributima
                createContent("main", festival);
                console.log(festival);
            }

        }
    };

    let url = firebaseUrl + "/festivali/" + organizatorId + "/" + festivalId + ".json";     //URL je link do odredjenog festivala
    console.log(url);
    request.open("GET", url);
    request.send();

}

function createContent(main, festival) {
    let mainTitle = document.createElement("div");              //kreiranje naslova
    mainTitle.classList.add("display-2", "text-center", "text-dark", "mt-3");
    mainTitle.textContent = festival.naziv;
    let mainLine1 = document.createElement("hr");
    mainLine1.classList.add("mt-3")
    
    let mainText = document.createElement("p");         //kreiranje opstih podataka
    mainText.classList.add("h5", "fw-normal", "bg-success-subtle", "border-success", "border", "rounded", "p-2", "mx-auto","text-align:left");
    mainText.innerHTML = "Tip: " + festival.tip + "<br>" +
        "Cijena: " + festival.cena + "<br>" +
        "Maks osoba: " + festival.maxOsoba + "<br>" +
        "Prevoz: " + festival.prevoz;
    
    
    let mainDescription = document.createElement("div");        //kreiranje opisa
    mainDescription.classList.add("h4", "fw-light", "text-muted");
    mainDescription.style.marginTop = "30px";
    mainDescription.textContent = festival.opis;
    let mainLine2 = document.createElement("hr");

    document.getElementById(main).appendChild(mainTitle);
    document.getElementById(main).appendChild(mainLine1);
    document.getElementById(main).appendChild(mainText);
    document.getElementById(main).appendChild(mainDescription);
    document.getElementById(main).appendChild(mainLine2);

    let picturesArray = festival.slike;         //kreiranje slika

    for (let picture in picturesArray) {

        let card = document.createElement("div");
        card.classList.add("card", "col-4", "mx-auto");
        card.style.width = "30rem";

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "align-items-center", "bg-success-subtle", "border-dark");
        // card.style.height = "30rem";

        let img = document.createElement("img");
        img.src = picturesArray[picture];
        img.style.height = "15rem";
        img.classList.add("card-img-top", "img-fluid");

        let cardText = document.createElement("p");
        cardText.textContent = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.";
        cardText.classList.add("fst-italic", "text-center");
        cardBody.appendChild(cardText);
        cardBody.appendChild(img);

        card.appendChild(cardBody);

        document.getElementById("main").appendChild(card);

    }



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






