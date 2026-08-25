const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();


    if (email === "" || password === "") {

        alert("Please enter your email and password.");

        return;
    }


    console.log("Login attempt");

    console.log("Email:", email);


    // Backend connection will be added later

window.location.href = "profile.html";
});