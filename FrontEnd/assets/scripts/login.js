window.onload=function() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const login = document.querySelector(".login-form");
    const alert = document.createElement("div");

    email.addEventListener('change', (event) => {
        if (!email.value.includes("@")) {
            alert.classList.add("alert-box", "warning-alert");
            alert.innerText = "L'adresse mail doit contenir un @.";
            login.appendChild(alert);
        }
    } )

    const loginForm = document.querySelector(".login-form");
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const connect = JSON.stringify({
            "email": email.value,
            "password": password.value
        });

        if (connect["email"] === "" || connect["password"] === "") {
            alert.classList.add("alert-box", "warning-alert");
            alert.innerText = "Merci de renseigner tous les champs.";
            login.appendChild(alert);
        }

        async function fetchLogin() {
            const response = await fetch('http://localhost:5678/api/users/login',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: connect
            });

            const message = await response.json();

            console.log(message);

            if (message["message"] == "user not found") {
                alert.classList.add("alert-box", "warning-alert");
                alert.innerText = "Utilisateur inconnu";
                login.appendChild(alert);
            }

            if (message["error"]) {
                alert.classList.add("alert-box", "warning-alert");
                alert.innerText = "Mot de passe incorrect";
                login.appendChild(alert);
            }

            if (message["token"]) {
                const token = message["token"];
                window.location.replace("index.html");
            }
        }

        fetchLogin();
    })
};