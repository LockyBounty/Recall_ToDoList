
let bouton1 = document.querySelector("#login-button");
let bouton2 =document.querySelector("#signup-button");



let toCheck = () => {
    console.log("ok");
    // similar behavior as an HTTP redirect
    window.location.href="logged.html";
}

let toSign = () => {
    window.location.href="register.html";
}



bouton1.addEventListener("click", toCheck);
bouton2.addEventListener("click", toSign);