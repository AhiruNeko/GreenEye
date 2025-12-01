import {supabase} from "./supabase.js";

const logInBtn = document.getElementById("logInBtn");

const { data: { session } } = await supabase.auth.getSession();

async function updateLoginButton() {
    if (session) {
        logInBtn.textContent = "My account";
        logInBtn.onclick = async () => {
            window.location.href = "my-account.html";
        };
    } else {
        logInBtn.textContent = "Log in";
        logInBtn.onclick = () => {
            localStorage.setItem("from", "learn-more.html logInBtn")
            window.location.href = "login.html";
        };
    }
}

window.addEventListener("load", updateLoginButton);
supabase.auth.onAuthStateChange((event, session) => {
    updateLoginButton();
});


