const uploadInput = document.getElementById("uploadPhoto");
const previewImage = document.getElementById("previewImage");
const uploadHint = document.getElementById("uploadHint");

uploadInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
            previewImage.style.display = "block";
            uploadHint.style.display = "none";
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.style.display = "none";
        uploadHint.style.display = "block";
    }
});

document.getElementById("startBtn").addEventListener("click", () => {
    const name = document.getElementById("username").value.trim();
    const file = uploadInput.files[0];

    if (!name || !file) {
        alert("Please enter your name and upload a photo!");
        return;
    }

    localStorage.setItem("userName", name);

    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem("userImage", event.target.result);
        window.location.href = "prepare.html";
    };
    reader.readAsDataURL(file);
});

document.getElementById("logInBtn").addEventListener("click", () => {
    window.location.href = "login.html";
})

fetch('../assets/data/data.json')
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










