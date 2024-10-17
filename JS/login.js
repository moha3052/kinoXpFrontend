document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Forhindrer standard formularindsendelse

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: name=`${username}&password=${password}` // Sender navn og adgangskode som form data
});

    if (response.ok) {
        const employee = await response.json();
        alert("Login successful! Welcome, " + employee.name);
        // Her kan du navigere til en ny side eller opdatere UI
    } else {
        alert("Forkert navn eller adgangskode");
    }
});

