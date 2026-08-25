const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", function (event) {

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


    // Validate age

    if (age < 5 || age > 100) {

        alert("Please enter a valid age.");

        return;
    }


    // Validate password length

    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    // Check passwords

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    // Temporary frontend registration

    console.log("New Learner:");

    console.log("Name:", fullName);
    console.log("Email:", email);
    console.log("Age:", age);
    console.log("Preferred Language:", language);


    alert(
        "Registration successful! Please login with your new account."
    );


    // Redirect to existing login page

    window.location.href = "login.html";

});