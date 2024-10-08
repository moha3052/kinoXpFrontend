class MovieApp {
    constructor() {
        this.apiKey = '2b5953c6a0951ac2ba0f1d30493b74ec'; // API-nøgle til TMDb
        this.init();
    }

    // Initialiserer applikationen ved at tilføje event listeners til DOM-elementer
    init() {
        document.getElementById('searchButton').addEventListener('click', () => {
            const query = document.getElementById('searchInput').value.trim();
            this.searchMovies(query);
        });

        document.getElementById('searchInput').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = document.getElementById('searchInput').value.trim();
                this.searchMovies(query);
            }
        });

        this.fetchMoviesFrom2024();
        this.fetchGenres();
    }

    // Søg efter film baseret på brugerinput (query) og vis resultaterne
    searchMovies(query) {
        if (query.trim() === '') {
            alert('Søgefeltet er tomt. Indtast venligst et søgeord.');
            return;
        }

        const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=da-DK&api_key=${this.apiKey}`;

        this.fetchData(apiUrl, (data) => {
            const movieContainer = document.getElementById('movies');
            movieContainer.innerHTML = '';

            if (data.results && data.results.length > 0) {
                this.displayMovies(data.results);
            } else {
                movieContainer.innerHTML = '<p>Ingen film fundet</p>';
            }
        });
    }

    fetchMoviesFrom2024() {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_year=2024&api_key=${this.apiKey}`;
        this.fetchData(apiUrl, (data) => {
            if (data.results.length > 0) {
                this.displayMovies(data.results);
            } else {
                alert('Ingen film fundet for 2024');
            }
        });
    }

    fetchGenres() {
        const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`;
        this.fetchData(apiUrl, (data) => {
            this.populateGenreFilter(data.genres);
        });
    }

    populateGenreFilter(genres) {
        const genreSelect = document.getElementById('genreFilter');
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });

        genreSelect.addEventListener('change', (event) => {
            const selectedGenreId = parseInt(event.target.value);
            this.filterMoviesByGenre(selectedGenreId);
        });
    }

    filterMoviesByGenre(genreId) {
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            const movieGenreIds = card.dataset.genres.split(',').map(Number);
            card.style.display = (genreId === 0 || movieGenreIds.includes(genreId)) ? 'block' : 'none';
        });
    }

    displayMovies(movies) {
        const movieContainer = document.getElementById('movies');
        movieContainer.innerHTML = '';

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.dataset.genres = movie.genre_ids.join(',');
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p class="movie-year">${movie.release_date.substring(0, 4)}</p>
                    <p class="movie-rating">${this.getMPAARating(movie.adult)}</p>
                    <button class="trailer-button" onclick="app.showTrailer(${movie.id})">Se Trailer</button>
                </div>
            `;
            movieContainer.appendChild(movieCard);
        });
    }

    getMPAARating(isAdult) {
        return isAdult ? 'Aldersgrænse: 18+' : 'Aldersgrænse: 13+';
    }

    // Hent trailer for en given film fra TMDb API
    showTrailer(movieId) {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.apiKey}`;
        this.fetchData(apiUrl, (data) => {
            const youtubeVideo = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');

            if (youtubeVideo) {
                const trailerKey = youtubeVideo.key;
                this.showTrailerThumbnail(trailerKey); // Vis trailer via thumbnail og modal
            } else {
                alert('Ingen trailer fundet for denne film.');
            }
        });
    }

    showTrailerThumbnail(trailerKey) {
        this.openTrailerModal(trailerKey);
    }

    openTrailerModal(trailerKey) {
        const modal = document.getElementById('trailerModal');
        const iframe = document.getElementById('trailerIframe');
        const thumbnail = document.getElementById('trailerThumbnail');
        const playButton = document.getElementById('playButton');

        iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
        modal.style.display = 'block';

        thumbnail.src = `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`;
        thumbnail.style.display = 'block';
        iframe.style.display = 'none';

        playButton.onclick = () => {
            thumbnail.style.display = 'none';
            iframe.style.display = 'block';
        };

        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.classList.contains('close-button')) {
                modal.style.display = 'none';
                iframe.src = '';
                thumbnail.style.display = 'block';
            }
        });
    }

    fetchData(apiUrl, callback) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.apiKey}`
            }
        };

        fetch(apiUrl, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP-fejl! Status: ${response.status}, besked: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                callback(data);
            })
            .catch(error => {
                console.log('Fejl ved API-kaldet:', error);
                alert('Noget gik galt ved hentning af data. Se konsollen for detaljer.');
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new MovieApp();
});
