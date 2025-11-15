import {supabase} from "./supabase.js";

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

async function fetchData(created_at) {
    const {data, error} = await supabase
        .from('total_environmental_data')
        .select('*')
        .order('id', { ascending: false })
        .limit(1);
    console.log(data);
    console.log(error);
    if (error || data.length === 0) { return null; }
    return data[0];
}

fetchData("2025-11-04T08:08:49Z").then(data => {
    document.getElementById('chemicalData').textContent = data.chemical + 'g';
    document.getElementById('carbonData').textContent = data.carbon + 'g';
    document.getElementById('waterData').textContent = data.water + 'L';
    document.getElementById('soilData').textContent = data.soil + 'm²';
})

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

localStorage.removeItem("image");
localStorage.removeItem("chemicalData");
localStorage.removeItem("carbonData");
localStorage.removeItem("waterData");
localStorage.removeItem("soilData");
localStorage.removeItem("keywords");
localStorage.removeItem("food");
localStorage.removeItem("joinPage");
