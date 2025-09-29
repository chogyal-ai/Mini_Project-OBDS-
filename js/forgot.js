let generatedOTP;

function sendOTP() {
    const email = document.getElementById("email").value;
    if (!email) {
        alert("Please enter your email");
        return;
    }

    // Generate 6-digit OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    alert("OTP sent to your email: " + generatedOTP); // Simulate email sending

    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
}

function verifyOTP() {
    const otp = document.getElementById("otp").value;
    if (otp == generatedOTP) {
        document.getElementById("step2").classList.add("hidden");
        document.getElementById("step3").classList.remove("hidden");
    } else {
        alert("Incorrect OTP! Try again.");
    }
}

function resetPassword() {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    document.getElementById("step3").classList.add("hidden");
    document.getElementById("message").innerText = "Your password has been successfully reset!";
}