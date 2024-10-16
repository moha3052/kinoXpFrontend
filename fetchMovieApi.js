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
            </div>
        `;
        moviesSection.appendChild(movieCard); // Brug moviesSection til at tilføje filmene
    });
}

// Kald fetchMovies, når siden er indlæst
document.addEventListener('DOMContentLoaded', function() {
    fetchMovies();
});
























