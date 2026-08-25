const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const email = document
        .getElementById("email")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value;


    if (email === "" || password === "") {

        alert("Please enter your email and password.");

        return;
    }


    const loginData = {
        email: email,
        password: password
    };


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(loginData)
            }
        );


        const data = await response.json();


        // Login failed
        if (!response.ok) {

            alert(data.detail || "Login failed.");

            return;
        }


        // Store logged-in user ID
        localStorage.setItem(
            "learner_id",
            data.learner.id
        );


        alert("Login successful!");

        // Go to profile page
        window.location.href = "profile.html";

    }

    catch (error) {

        console.error("Login error:", error);

        alert(
            "Unable to connect to the server. Make sure the backend is running."
        );

    }

});