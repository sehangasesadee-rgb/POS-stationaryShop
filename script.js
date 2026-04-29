function goToDashboard() {
    // values ලබා ගැනීම
    const userValue = document.getElementById('username').value;
    const passValue = document.getElementById('password').value;

    const loginSection = document.getElementById('login-container');
    const dashSection = document.getElementById('dashboard-container');

    // Username සහ Password පරීක්ෂා කිරීම
    if (userValue === "admin" && passValue === "1234") {
        // Login එක සඟවා Dashboard එක පෙන්වීම
        loginSection.style.display = "none";
        dashSection.style.display = "block"; // flex එක වෙනුවට block හෝ flex පාවිච්චි කළ හැක

        // උඩටම scroll කිරීම
        window.scrollTo(0, 0);
    } else {
        alert("වැරදි දත්ත! කරුණාකර නැවත උත්සාහ කරන්න.");
    }
}

function goToLogin() {
    // Logout වීමේදී Dashboard සඟවා Login පෙන්වීම
    document.getElementById('dashboard-container').style.display = "none";
    document.getElementById('login-container').style.display = "flex";

    // Form එක reset කිරීම
    document.getElementById('loginForm').reset();
}