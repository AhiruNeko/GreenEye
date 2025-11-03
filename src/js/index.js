document.getElementById("logInBtn").addEventListener("click", () => {
    window.location.href = "login.html";
})

document.getElementById("logInHereBtn").addEventListener("click", () => {
    window.location.href = "login.html";
})

document.getElementById("guestBtn").addEventListener("click", () => {
    window.location.href = "guest-join.html";
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










