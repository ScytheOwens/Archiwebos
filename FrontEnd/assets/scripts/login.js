window.onload=function() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    function displayAlert(alertType, alertMessage) {
        const login = document.querySelector(".login-form");
        const alert = document.createElement("div");

        alert.classList.add("alert-box", alertType);
        alert.innerText = alertMessage;
        login.appendChild(alert);
    }

    email.addEventListener('change', (event) => {
        if (!email.value.includes("@")) {
            displayAlert("warning-alert", "L'adresse mail doit contenir un @.")
        }
    } );

    const loginForm = document.querySelector(".login-form");
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const connect = JSON.stringify({
            "email": email.value,
            "password": password.value
        });

        async function fetchLogin() {
            const response = await fetch('http://localhost:5678/api/users/login',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: connect
            });

            const message = await response.json();

            if (message["message"] == "user not found") {
                displayAlert("warning-alert", "Utilisateur inconnu")
            }

            if (message["error"]) {
                displayAlert("warning-alert", "Mot de passe incorrect")
            }

            if (message["token"]) {
                const token = message["token"];
                window.location.replace("index.html");
            }
        }

        fetchLogin();
    })
};