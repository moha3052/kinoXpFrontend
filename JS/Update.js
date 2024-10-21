const genres = ["ACTION", "HORROR", "ROMANCE", "SCIENCE_FICTION", "THRILLER", "ADVENTURE", "ANIMATION", "COMEDY", "CRIME", "DOCUMENTARY", "DRAMA", "FANTASY", "MYSTERY", "WAR", "WESTERN", "UNKNOWN"];
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

async function putMovie(event) {
    event.preventDefault();

    // Hent filmens ID fra input-feltet
    const movieId = document.getElementById("input-movie-id").value;

    // Hent varighed i sekunder
    const durationInSeconds = () => {
        const [hours, minutes, seconds] = movieForm.querySelector("#input-duration").value.split(":");
        return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    };

    // Saml alle de opdaterede data fra formularen
    const updatedMovieData = {
        imageURL: movieForm.querySelector("#input-image-URL").value,
        title: movieForm.querySelector("#input-name").value,
        genre: movieForm.querySelector("#input-genre").value,
        duration: durationInSeconds(),  // Konverteret til sekunder
        ageLimit: movieForm.querySelector("#input-age").value
    };

    try {
        const res = await myFetch(`http://localhost:8080/api/movies/${movieId}`, updatedMovieData);
        if (res.ok) {
            console.log("Movie created successfully");

            // Redirect to the desired page after successful creation
            window.location.href = "http://localhost:63342/kinoXpFrontend/index.html?_ijt=iphv715d89olt3rpf6pavng0hv&_ij_reload=RELOAD_ON_SAVE"; // Replace 'yourSuccessPage.html' with the actual page
        } else {
            console.log("An error occurred while creating the movie");
        }
    }catch (err){
        console.log("Fetch error: ", error);
    }
}


document.querySelector('.btn-secondary').addEventListener('click', function() {
    // Omdirigerer brugeren til en anden side
    window.location.href = "http://localhost:63342/kinoXpFrontend/index.html?_ijt=iphv715d89olt3rpf6pavng0hv&_ij_reload=RELOAD_ON_SAVE"; // Udskift med den side du vil redirecte til
});


// Funktion til at sende PUT-anmodningen
async function myFetch(url, body) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    return await fetch(url, options);
}



// Tilføj event listener til formularen
const movieForm = document.getElementById("movieForm");

movieForm.addEventListener("submit", putMovie);

document.getElementById("btn-save").addEventListener("click", function() {
    window.location = "http://localhost:63342/kinoXpFrontend/html/index.html";
});

document.getElementById("btn btn-secondary").addEventListener("click", function() {
    window.location = "http://localhost:63342/kinoXpFrontend/html/index.html";
});
