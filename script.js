function goToDashboard() {

    const userValue = document.getElementById('username').value;
    const passValue = document.getElementById('password').value;

    const loginSection = document.getElementById('login-container');
    const dashSection = document.getElementById('dashboard-container');

    if (userValue === "admin" && passValue === "1234") {
        loginSection.style.display = "none";
        dashSection.style.display = "block";

        window.scrollTo(0, 0);
    } else {
        alert("email or password wrong please try again!");
    }
}

function goToLogin() {
    document.getElementById('dashboard-container').style.display = "none";
    document.getElementById('login-container').style.display = "flex";

    document.getElementById('loginForm').reset();
}

function goToDashboard(){
    document.getElementById("login-container").classList.add("d-none");
    document.getElementById("dashboard-container").classList.remove("d-none");
}

function goToLogin(){
    document.getElementById("dashboard-container").classList.add("d-none");
    document.getElementById("login-container").classList.remove("d-none");
}