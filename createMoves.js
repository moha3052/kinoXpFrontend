// Liste af genrer
const genres = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Fantasy", "Romance", "Thriller", "Animation", "Documentary"];
const ages = ["ALL_AGES", "G", "PG", "PG-13", "R", "NC-17", "UNKNOWN"];

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

    const res = await myFetch("http://localhost:8080/api/movies",postBody);

    if (!res.ok) {
        console.log("An error occured");
    } else {
        const resJson = await JSON.stringify(res);
        console.log(resJson)
    }


}

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

