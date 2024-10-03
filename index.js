document.getElementById('searchButton').addEventListener('click', fetchMovies);

function fetchMovies() {
    const query = document.getElementById('searchInput').value || '';
    const url = `https://omdbapi.com/?s=${query}&page=1&apikey=581030e7`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movies = data.Search;
            const movieContainer = document.getElementById('movies');
            movieContainer.innerHTML = ''; // Rens tidligere resultater

            movies.forEach(movie => {
                const movieCard = `
                    <div class="movie-card">
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <div class="movie-info">
                            <h2>${movie.Title}</h2>
                            <p>${movie.Year}</p>
                        </div>
                    </div>
                `;
                movieContainer.innerHTML += movieCard;
            });
        })
        .catch(error => {
            console.error('Fejl ved hentning af film:', error);
        });
}