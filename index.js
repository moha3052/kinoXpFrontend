function searchMovies(query) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=da-DK`;  // Tilføjet sprog parameter (juster efter behov)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjU5NTNjNmEwOTUxYWMyYmEwZjFkMzA0OTNiNzRlYyIsIm5iZiI6MTcyNzk4NzIxOS4yOTU1NzIsInN1YiI6IjY2ZmRjZDEwZmEzZTY5ZTBlZjdjNjg2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HtpYh8QPDIkLYrk7mXfwj68e6aRYrRLVYakqaEDNSok'  // Sørg for at bruge en gyldig API-nøgle
        }
    };

    if (query.trim() === '') {
        alert('Søgefeltet er tomt. Indtast venligst et søgeord.');
        return;
    }

    fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API-fejl: ${response.status}`); // Tilføjet mere eksplicit fejlbesked
            }
            return response.json();
        })
        .then(data => {
            const movieContainer = document.getElementById('movies'); // Brug den eksisterende movie container
            movieContainer.innerHTML = ''; // Ryd tidligere resultater

            if (data.results && data.results.length > 0) {
                displayMovies(data.results); // Vis de fundne film
            } else {
                movieContainer.innerHTML = '<p>Ingen film fundet</p>';
            }
        })
        .catch(error => {
            console.error('Fejl ved API-kaldet:', error);
            alert('Noget gik galt ved hentning af film. Se konsollen for detaljer.');
        });
}


// Event listeners til søgning
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    searchMovies(query);
});

document.getElementById('searchInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = document.getElementById('searchInput').value.trim();
        searchMovies(query);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Hent film fra 2024, når siden indlæses
    fetchMoviesFrom2024();
    fetchGenres(); // Hent genrer
});

// Hent film fra 2024
function fetchMoviesFrom2024() {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_year=2024`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjU5NTNjNmEwOTUxYWMyYmEwZjFkMzA0OTNiNzRlYyIsIm5iZiI6MTcyNzk4NzIxOS4yOTU1NzIsInN1YiI6IjY2ZmRjZDEwZmEzZTY5ZTBlZjdjNjg2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HtpYh8QPDIkLYrk7mXfwj68e6aRYrRLVYakqaEDNSok'
        }
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                displayMovies(data.results); // Vis filmene fra 2024
            } else {
                alert('Ingen film fundet for 2024');
            }
        })
        .catch(error => console.log(error));
}

// Hent genrer
function fetchGenres() {
    const apiUrl = 'https://api.themoviedb.org/3/genre/movie/list';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjU5NTNjNmEwOTUxYWMyYmEwZjFkMzA0OTNiNzRlYyIsIm5iZiI6MTcyNzk4NzIxOS4yOTU1NzIsInN1YiI6IjY2ZmRjZDEwZmEzZTY5ZTBlZjdjNjg2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HtpYh8QPDIkLYrk7mXfwj68e6aRYrRLVYakqaEDNSok'
        }
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            populateGenreFilter(data.genres); // Udfyld genre-filter
        })
        .catch(error => console.log(error));
}

// Udfyld genre-filter
function populateGenreFilter(genres) {
    const genreSelect = document.getElementById('genreFilter');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });

    genreSelect.addEventListener('change', (event) => {
        const selectedGenreId = parseInt(event.target.value);
        filterMoviesByGenre(selectedGenreId);
    });
}

// Filtrér film efter genre
function filterMoviesByGenre(genreId) {
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        const movieGenreIds = card.dataset.genres.split(',').map(Number);
        if (genreId === 0 || movieGenreIds.includes(genreId)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Vis film
function displayMovies(movies) {
    const movieContainer = document.getElementById('movies');
    movieContainer.innerHTML = ''; // Ryd tidligere resultater

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.dataset.genres = movie.genre_ids.join(','); // Gem genre ID'er som data-attribut
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="movie-year">${movie.release_date.substring(0, 4)}</p>
                <p class="movie-rating">${getMPAARating(movie.adult)}</p> <!-- Vis aldersgrænse -->
                <button class="trailer-button" onclick="showTrailer(${movie.id})">Se Trailer</button> <!-- Tilføj trailer knap -->
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}

// Helper-funktion til at returnere aldersgrænsen
function getMPAARating(isAdult) {
    return isAdult ? 'Aldersgrænse: 18+' : 'Aldersgrænse: 13+'; // Juster efter behov
}

// Åbn modal for trailer
function openTrailerModal(trailerKey, thumbnailPath) {
    const modal = document.getElementById('trailerModal');
    const iframe = document.getElementById('trailerIframe');
    const thumbnail = document.getElementById('trailerThumbnail');
    const playButton = document.getElementById('playButton');

    // Sæt iframe-kilde til trailer
    iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
    modal.style.display = 'block'; // Vis modal
    console.log('Modal displayed'); // Tjek om modal vises

    // Sæt thumbnail
    thumbnail.src = `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`; // Brug Youtube thumbnail
    thumbnail.style.display = 'block'; // Vis thumbnail

    // Skjul iframe
    iframe.style.display = 'none';

    // Når play-knappen klikkes, skjul thumbnail og vis iframe
    playButton.onclick = () => {
        thumbnail.style.display = 'none'; // Skjul thumbnail
        iframe.style.display = 'block'; // Vis iframe
        console.log('Play button clicked'); // Tjek om play-knappen fungerer
    };

    // Luk modal ved at klikke på krydset eller uden for iframe
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('close-button')) {
            modal.style.display = 'none';
            iframe.src = ''; // Stop trailer når modal lukkes
            thumbnail.style.display = 'block'; // Vis thumbnail igen
        }
    });
}

// Hent trailer for filmen
function showTrailer(movieId) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer YOUR_API_KEY' // Sørg for at ændre til din API-nøgle
        }
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Tjek API-respons
            if (data.results.length > 0) {
                const trailerKey = data.results[0].key; // Tag den første trailer
                console.log('Trailer Key:', trailerKey); // Tjek trailerKey
                showTrailerThumbnail(movieId, trailerKey); // Vis trailer thumbnail
            } else {
                alert('Ingen trailer fundet');
            }
        })
        .catch(error => console.log('Fejl ved hentning af trailer:', error));
}

function showTrailerThumbnail(movieId, trailerKey) {
    const thumbnailPath = ''; // Tilføj eventuelt en metode til at hente en specifik thumbnail
    openTrailerModal(trailerKey, thumbnailPath);
}
