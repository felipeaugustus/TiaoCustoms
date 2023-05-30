document.addEventListener("DOMContentLoaded", function () { // sera executado quando pagina carregar
    document.getElementById("login").addEventListener("submit", function (event) {
        event.preventDefault();
        var username = document.getElementById("user").value;
        var password = document.getElementById("password").value;

        if (username === "usuario" && password === "123456") {
            sessionStorage.setItem("logged", "true");
            window.location.href = "vehicle-list.html";
        } else {
            alert("Nome de usuário ou senha inválidos. Tente novamente.");
        }
    });
});

