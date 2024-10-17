// Liste af genrer
const genres= ["ACTION", "HORROR", "ROMANCE", "SCIENCE_FICTION", "THRILLER", "ADVENTURE", "ANIMATION", "COMEDY", "CRIME", "DOCUMENTARY", "DRAMA", "FANTASY", "MYSTERY", "WAR", "WESTERN", "UNKNOWN"];
const ages = [ "ALL_AGES", "G",  "PG",  "PG_13", "R", "NC_17", "UNKNOWN"];

// Funktion til at tilføje muligheder til en dropdown
function populateSelect(selectElement, options) {
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.toUpperCase();
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}


// Populerer dropdowns
const genreSelect = document.getElementById("input-genre");
const ageSelect = document.getElementById("input-age");

populateSelect(genreSelect, genres);
populateSelect(ageSelect, ages);

const movieForm = document.querySelector("#movieForm");

const movieFormBtn = document.querySelector("#btn-save");

movieFormBtn.addEventListener("click", postMovie);

async function postMovie(event) {
    event.preventDefault();
    console.log("IN POST FETCH FUNCTION")

    console.log(movieForm);

    const durationInSeconds = (str) => {
        const [hours, min, seconds] = movieForm.querySelector("#input-duration").value.split(":");
        return Number(hours)*60*60+Number(min)*60+Number(seconds);
    }
    console.log(movieForm.querySelector("#input-duration").value)

    const postBody = {
        imageURL: movieForm.querySelector("#input-image-URL").value,
        title: movieForm.querySelector("#input-name").value,
        genre: movieForm.querySelector("#input-genre").value,
        duration: durationInSeconds(movieForm.querySelector("#input-duration").value),
        ageLimit: movieForm.querySelector("#input-age").value
    }

    try {
        const res = await myFetch("http://localhost:8080/api/movies", postBody);

        // Check if the response is OK (status code in 200-299 range)
        if (res.ok) {
            console.log("Movie created successfully");

            // Redirect to the desired page after successful creation
            window.location.href = "http://localhost:63342/kinoXpFrontend/index.html?_ijt=iphv715d89olt3rpf6pavng0hv&_ij_reload=RELOAD_ON_SAVE"; // Replace 'yourSuccessPage.html' with the actual page
        } else {
            console.log("An error occurred while creating the movie");
        }
    } catch (error) {
        console.log("Fetch error: ", error);
    }
}

document.getElementById("btn-secondary").addEventListener("click", function() {
    // Omdirigerer brugeren til en anden side
    window.location = "http://localhost:63342/kinoXpFrontend/html/index.html"; // Udskift med den side du vil redirecte til
});

document.getElementById("btn-save").addEventListener("click", function (){
    window.location = "http://localhost:63342/kinoXpFrontend/html/index.html";
});






async function myFetch(url,body) {
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }
    return await fetch(url,options);
}

