// Function to fetch movies from backend API
async function fetchMovies() {
    try {
        const response = await fetch("http://localhost:8080/api/movies");
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Function to display movies in the section
function displayMovies(movies) {
    const moviesSection = document.querySelector("#movies");
    moviesSection.innerHTML = ""; // Clear the current movies

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        // Check if the imageURL is valid, otherwise provide a default image
        const imageURL = movie.imageURL || 'default-image-url.jpg'; // Replace with a valid default URL

        movieCard.innerHTML = `
            <img src="${imageURL}" alt="${movie.title}" class="movie-poster" />
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <p>Age Limit: ${movie.ageLimit}</p>
                <p>Duration: ${movie.duration} seconds</p>
            </div>
        `;
        moviesSection.appendChild(movieCard);
    });
}











