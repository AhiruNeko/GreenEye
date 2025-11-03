import {supabase} from "./supabase.js";

const googleLogin = document.getElementById("GoogleLoginBtn");
const githubLogin = document.getElementById("GithubLoginBtn");
const guestBtn = document.getElementById("guestBtn")

let callbackUserURL = "index.html";
let callbackGuestURL = "index.html";
let from = localStorage.getItem("from");
if (from == "index.html contributionBtn") {
    callbackUserURL = "user-join.html";
    callbackGuestURL = "guest-join.html";
} else if (from == "guest-join.html logInBtn") {
    callbackUserURL = "user-join.html";
    callbackGuestURL = "guest-join.html";
} else {
    callbackUserURL = "index.html";
    callbackGuestURL = "index.html";
}

googleLogin.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: replaceLastPathSegment(callbackUserURL)
        }
    });
    if (error) console.error('Google login error:', error);
});

githubLogin.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: replaceLastPathSegment(callbackUserURL) }
    });
    if (error) console.error('Github login error:', error);
});

function continueAsGuest() {
    supabase.auth.signOut();
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    sessionStorage.clear();
    window.location.href = callbackGuestURL;
}

guestBtn.addEventListener("click", continueAsGuest);
window.addEventListener('load', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        const user = session.user;
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.user_metadata.full_name || user.email);
        localStorage.setItem('userEmail', user.email);
        setTimeout(() => {
            window.location.href = 'user-join.html';
        }, 1000);
    }
});

function replaceLastPathSegment(newSegment, url = window.location.href) {
    const urlObj = new URL(url);
    const segments = urlObj.pathname.split('/');
    if (segments.length > 0) {
        segments[segments.length - 1] = newSegment;
    } else {
        segments.push(newSegment);
    }
    urlObj.pathname = segments.join('/');
    return urlObj.toString();
}
