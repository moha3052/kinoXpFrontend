async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:8080/api/movies');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        console.log(movies);
        displayMovies(movies); // Funktion til at vise filmene på siden
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayMovies(movies) {
    const moviesSection = document.querySelector("#movies");
    moviesSection.innerHTML = ""; // Clear the current movies

    movies.forEach(movie => {
        const movieCard = document.createElement('div');

        movieCard.innerHTML = `
            <img src="${movie.imageURL}" alt="${movie.title}" class="movie-poster" />
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <p>Age Limit: ${movie.ageLimit}</p>
                <p>Duration: ${movie.duration} seconds</p>
                <div>
                <button id="time_Btn" type="button">Releases</button>
                    <button id="delete_Btn" type="button" onclick="deleteMovie(${movie.movieID})" >Delete</button>
                </div>
            </div>
           
        `;
        moviesSection.appendChild(movieCard); // Brug moviesSection til at tilføje filmene
    });
}

// Kald fetchMovies, når siden er indlæst
document.addEventListener('DOMContentLoaded', async function() {
    await fetchMovies();
});




async function deleteMovie(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
            method: 'DELETE' // Specificér DELETE-metoden
        });
        if (!response.ok) {
            throw new Error('Failed to delete the movie');
        }
        console.log(`Movie with ID ${id} deleted successfully`);
        await fetchMovies(); // Opdater listen efter sletning

    } catch (error) {
        console.error('Delete error:', error);
    }
}


document.getElementById("createMovieButton").addEventListener("click", function() {
    window.location = "http://localhost:63342/kinoXpFrontend/html/CreateMovies.html";
});

document.getElementById("updateMovieButton").addEventListener("click", function() {
    window.location = "http://localhost:63342/kinoXpFrontend/html/update.html?_ijt=du8vs189di2fciehk0ikatdk9a";
});
