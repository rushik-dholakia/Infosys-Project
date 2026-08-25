const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");


forgotPasswordForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const newPassword = document
            .getElementById("newPassword")
            .value;

        const confirmPassword = document
            .getElementById("confirmPassword")
            .value;


        // Check empty fields
        if (
            email === "" ||
            newPassword === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }


        // Check password length
        if (newPassword.length < 6) {
            alert(
                "Password must contain at least 6 characters."
            );
            return;
        }


        // Check passwords match
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        // Data to send to backend
        const resetData = {
            email: email,
            new_password: newPassword
        };


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/forgot-password",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(resetData)
                }
            );


            const data = await response.json();


            // If password reset fails
            if (!response.ok) {

                alert(
                    data.detail ||
                    "Password reset failed."
                );

                return;
            }


            // Success
            alert(
                "Password reset successful! Please login with your new password."
            );


            // Redirect to login page
            window.location.href = "login.html";

        }

        catch (error) {

            console.error(
                "Password reset error:",
                error
            );

            alert(
                "Unable to connect to the server. Make sure the backend is running."
            );

        }

    }
);