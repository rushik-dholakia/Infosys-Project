const learner = {
    fullName: "Learner",
    email: "learner@email.com",
    age: "--",
    language: "English",

    readingLevel: "Beginner",
    writingLevel: "Beginner",
    vocabularyLevel: "Beginner",
    comprehensionLevel: "Beginner",

    overallLevel: "Beginner"
};


// Display learner name

document.getElementById("navUserName").textContent =
    learner.fullName;

document.getElementById("welcomeName").textContent =
    `Welcome, ${learner.fullName}!`;


// Profile information

document.getElementById("profileName").textContent =
    learner.fullName;

document.getElementById("profileEmail").textContent =
    learner.email;

document.getElementById("profileAge").textContent =
    learner.age;

document.getElementById("profileLanguage").textContent =
    learner.language;


// Avatar letter

document.getElementById("avatarLetter").textContent =
    learner.fullName.charAt(0).toUpperCase();


// Proficiency levels

document.getElementById("readingLevel").textContent =
    learner.readingLevel;

document.getElementById("writingLevel").textContent =
    learner.writingLevel;

document.getElementById("vocabularyLevel").textContent =
    learner.vocabularyLevel;

document.getElementById("comprehensionLevel").textContent =
    learner.comprehensionLevel;

document.getElementById("overallLevel").textContent =
    learner.overallLevel;


// Logout

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (confirmLogout) {

        window.location.href = "login.html";

    }

});