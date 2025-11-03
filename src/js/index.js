import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://lcpbgtfrwxtagaefbusl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGJndGZyd3h0YWdhZWZidXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzA0MjUsImV4cCI6MjA3NzY0NjQyNX0.73gt5IJ3aOh1WStLZK77-MNk_coAbUQpB13COz3CFcQ";

// const SUPABASE_URL = 'https://mvgbkwwdciuxpdksoduv.supabase.co';
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z2Jrd3dkY2l1eHBka3NvZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODgwMjUsImV4cCI6MjA3NzU2NDAyNX0.Hup9lRdDaHjxKrYIc5icjToIyutor9eBRwPpj3kz8KA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const logInBtn = document.getElementById("logInBtn");

let contributionBtnTo = "login.html";

async function updateLoginButton() {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        contributionBtnTo = "user-join.html";
        logInBtn.textContent = "My account";
        logInBtn.onclick = async () => {
            window.location.href = "my-account.html";
        };
    } else {
        logInBtn.textContent = "Log in";
        logInBtn.onclick = () => {
            localStorage.setItem("from", "index.html logInBtn")
            window.location.href = "login.html";
        };
    }
}

window.addEventListener("load", updateLoginButton);
supabase.auth.onAuthStateChange((event, session) => {
    updateLoginButton();
});

document.getElementById("contributionBtn").addEventListener("click", () => {
    if (contributionBtnTo == "login.html") {
        localStorage.setItem("from", "index.html contributionBtn");
    }
    window.location.href = contributionBtnTo;
})

document.getElementById("learnMoreBtn").addEventListener("click", () => {
    window.location.href = "learn-more.html";
})

fetch('assets/data/data.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chemicalData').textContent = data.chemical + 'g';
        document.getElementById('carbonData').textContent = data.carbon + 'kg';
        document.getElementById('waterData').textContent = data.water + 'L';
        document.getElementById('soilData').textContent = data.soil + 'm²';
    })
    .catch(error => console.error('Error loading JSON:', error));

document.addEventListener("DOMContentLoaded", () => {
    const allElements = Array.from(document.querySelectorAll("body *"));
    const elementsToFade = allElements.filter(el => {
        if (el.tagName.toLowerCase() === "img") return false;
        if (el.querySelector("img")) return false;
        return true;
    });
    elementsToFade.forEach(el => el.classList.add("fade-in-js"));
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { threshold: 0.4 }
    );

    elementsToFade.forEach(el => observer.observe(el));
});










