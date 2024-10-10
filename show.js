document.addEventListener('DOMContentLoaded', () => {
    // Funktion til at hente URL-parameteren
    function getMovieIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('movieId'); // Hent 'movieId' fra URL'en
    }

    const movieId = getMovieIdFromURL(); // Hent filmens ID fra URL'en

    // Hardcoded showtimes for demonstration
    const showtimes = {
        533535: [
            { time: "12:00", hall: "Sal 1" },
            { time: "15:00", hall: "Sal 2" },
            { time: "18:00", hall: "Sal 1" }
        ],
        519182: [
            { time: "14:00", hall: "Sal 3" },
            { time: "17:00", hall: "Sal 2" },
            { time: "20:00", hall: "Sal 1" }
        ]
    };

    const showtimesContainer = document.getElementById('showtimes-container');

    // Tjek om filmens ID findes i showtimes-objektet
    if (movieId && showtimes[movieId]) {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-showtimes');
        movieDiv.innerHTML = `<h3>Film ID: ${movieId}</h3>`;

        const ul = document.createElement('ul');
        showtimes[movieId].forEach(showtime => {
            const li = document.createElement('li');
            li.innerHTML = `${showtime.time} - ${showtime.hall} <button onclick="selectShowtime('${showtime.time}', '${showtime.hall}')">Vælg</button>`;
            ul.appendChild(li);
        });

        movieDiv.appendChild(ul);
        showtimesContainer.appendChild(movieDiv);
    } else {
        alert("Ingen tidspunkter fundet for denne film.");
    }

    // Funktion til at håndtere valg af showtime
    window.selectShowtime = function(time, hall) {
        const modal = document.getElementById('showtimeModal');
        const showtimeInfo = document.getElementById('showtime-info');
        const confirmButton = document.getElementById('confirm-button');

        // Opdater modal-indhold med den valgte forestilling
        showtimeInfo.textContent = `Du har valgt kl. ${time} i ${hall}`;
        modal.style.display = 'block';

        // Bekræft valget
        confirmButton.onclick = () => {
            alert(`Forestillingen kl. ${time} i ${hall} er bekræftet!`);
            modal.style.display = 'none'; // Luk modal
        };
    };

    // Luk modal, når kryds-knappen klikkes
    document.querySelector('.close-button').onclick = function() {
        document.getElementById('showtimeModal').style.display = 'none';
    };
});
