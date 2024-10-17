document.addEventListener("DOMContentLoaded", () => {
    const showtimesContainer = document.getElementById("showtimes-container");

    // Fetch shows from the server
    fetch("http://localhost:8080/api/shows")
        .then((response) => response.json())
        .then((shows) => {
            shows.forEach(show => {
                createShowtimeCard(show);
            });
        })
        .catch((error) => {
            console.error("Error fetching shows: ", error);
        });

    // Function to create a showtime card in the DOM
    function createShowtimeCard(show) {
        const showtimeCard = document.createElement("div");
        showtimeCard.classList.add("showtime-card");

        showtimeCard.innerHTML = `
      <h3>${show.movieTitle}</h3>
      <p>Starttid: ${formatDateTime(show.startTime)}</p>
      <p>Sluttid: ${formatDateTime(show.endTime)}</p>
      <p>Sal: ${show.theater}</p>
      <button class="select-showtime">Vælg Tidspunkt</button>
    `;

        showtimeCard.querySelector(".select-showtime").addEventListener("click", () => {
            openSeatModal(show);
        });

        showtimesContainer.appendChild(showtimeCard);
    }

    // Function to open the seat selection modal
    function openSeatModal(show) {
        const seatModal = document.getElementById("seatModal");
        const seatInfo = document.getElementById("seat-info");
        seatInfo.textContent = `Vælg dine sæder til ${show.movieTitle} i Sal ${show.theater} - Starttid: ${formatDateTime(show.startTime)}`;

        seatModal.style.display = "block";

        const seatSelection = document.getElementById("seat-selection");
        seatSelection.innerHTML = "";  // Clear previous seats

        // Simple seat selection logic
        const seats = 30;  // Example: 30 seats
        for (let i = 1; i <= seats; i++) {
            const seat = document.createElement("div");
            seat.classList.add("seat");
            seat.textContent = i;
            seat.addEventListener("click", () => {
                seat.classList.toggle("selected");
            });
            seatSelection.appendChild(seat);
        }

        // Confirm seat selection
        document.getElementById("confirm-seat-button").addEventListener("click", () => {
            confirmSeatSelection();
        });
    }

    // Function to confirm seat selection
    function confirmSeatSelection() {
        const selectedSeats = Array.from(document.querySelectorAll(".seat.selected")).map(seat => seat.textContent);
        alert(`Du har valgt sæderne: ${selectedSeats.join(", ")}`);
        closeSeatModal();
    }

    // Function to close the seat modal
    function closeSeatModal() {
        const seatModal = document.getElementById("seatModal");
        seatModal.style.display = "none";
    }

    // Utility function to format datetime
    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        return date.toLocaleString("da-DK");
    }

    // Close modal on clicking 'X' button
    document.querySelector(".close-button").addEventListener("click", closeSeatModal);
});
