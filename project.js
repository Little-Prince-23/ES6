const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


//Download all elements
eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms)
}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" | director === "" | url === ""){
        console.error(`Bütün inputlar doldurulmayıb!`);
        UI.displayMessages("Bütün xanaları doldurun!", "danger")
    }
    else{
        //New movie
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm)//Add movie to screen

        Storage.addFilmToStorage(newFilm); //Add movie to storage

        UI.displayMessages("Film əlavə olundu!", "success")

    }

    UI.clearInputs(titleElement, directorElement, urlElement);


    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silindi...", "success");

    }
}

function clearAllFilms(){
    if(confirm("Əminsinizmi")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
    // ui.displayMessages("Bütün filmlər silindi...", "success");
}

