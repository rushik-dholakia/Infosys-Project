const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const fullName = document
        .getElementById("fullName")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim();

    const age = document
        .getElementById("age")
        .value;

    const language = document
        .getElementById("language")
        .value;

    const password = document
        .getElementById("password")
        .value;

    const confirmPassword = document
        .getElementById("confirmPassword")
        .value;


    // Check empty fields
    if (
        fullName === "" ||
        email === "" ||
        age === "" ||
        language === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }


    // Check password length
    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }


    // Check passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }


    // Data to send to FastAPI
    const learnerData = {
        full_name: fullName,
        email: email,
        password: password,
        age: Number(age),
        preferred_language: language
    };


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(learnerData)
            }
        );


        const data = await response.json();


        // Registration failed
        if (!response.ok) {

            alert(data.detail || "Registration failed.");

            return;
        }


        // Registration successful
        alert("Registration successful! Please login.");

        window.location.href = "login.html";

    }

    catch (error) {

        console.error("Error:", error);

        alert(
            "Unable to connect to the server. Make sure the FastAPI backend is running."
        );

    }

});