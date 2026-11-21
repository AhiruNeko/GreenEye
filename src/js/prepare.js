const navEntries = performance.getEntriesByType("navigation");
if (navEntries.length > 0) {
    const type = navEntries[0].type;
    if (type === "navigate" && !localStorage.getItem("progNav")) {
        localStorage.removeItem("image");
        localStorage.removeItem("chemicalData");
        localStorage.removeItem("carbonData");
        localStorage.removeItem("waterData");
        localStorage.removeItem("soilData");
        localStorage.removeItem("keywords");
        localStorage.removeItem("food");
        localStorage.removeItem("joinPage");
        localStorage.removeItem("saved");
    }
}

localStorage.removeItem("progNav");

const requiredKeys = [
    "name",
    "image",
    "keywords",
    "chemicalData",
    "carbonData",
    "waterData",
    "soilData",
    "joinPage"
];

const missing = requiredKeys.filter(key => !localStorage.getItem(key));

if (missing.length > 0) {
    if (localStorage.getItem("joinPage")) window.location.href = localStorage.getItem("joinPage");
    else window.location.href = "index.html";
}

localStorage.removeItem("food");

const userName = localStorage.getItem("name") || "User";
const userImage = localStorage.getItem("image") || "";
const loadingOverlay = document.getElementById("loadingOverlay");
const bgContainer = document.getElementById("bgContainer");

document.getElementById("userName").textContent = userName + "!";

if (userImage) {
    document.getElementById("previewImage").src = userImage;
    document.getElementById("previewImage").style.display = "block";
    document.getElementById("previewHint").style.display = "none";
} else {
    document.getElementById("previewImage").style.display = "none";
    document.getElementById("previewHint").style.display = "block";
}

document.getElementById("generateBtn").addEventListener("click", () => {
    const veg = document.getElementById("foodSelect").value;
    if(!veg) {
        alert("Please enter your food.");
        return;
    }
    localStorage.setItem("food", veg);
    localStorage.setItem("progNav", "true");
    window.location.href = "report.html";
});

const pureBase64 = userImage.split(",")[1];

async function classifyVegetable() {
    const progressBar = document.getElementById("progressBar");

    const progressPromise = (async () => {
        let percent = 0;
        while (percent < 99) {
            percent += Math.random() * 10;
            percent = Math.min(percent, 99);
            progressBar.style.width = percent + "%";
            await new Promise(r => setTimeout(r, 100));
        }
    })();

    try {
        const response = await fetch("/api/classify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: pureBase64 })
        });

        const data = await response.json();
        if (!response.ok) {
            console.error(data.error || `Image classification failed (${response.status}).`);
            return;
        }
        console.log("Roboflow API result:", data);

        const options = [
            "Bean", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Broccoli",
            "Cabbage", "Capsicum", "Carrot", "Cauliflower", "Cucumber",
            "Papaya", "Potato", "Pumpkin", "Radish", "Tomato"
        ];
        let topPrediction = data.top;
        if (!topPrediction) {
            const randomIndex = Math.floor(Math.random() * options.length);
            topPrediction = options[randomIndex];
        }
        const selectElement = document.getElementById("foodSelect");
        if (topPrediction && selectElement) {
            selectElement.value = topPrediction.toLowerCase();
        }

    } catch (err) {
        console.error(err);
    } finally {
        await progressPromise;
        await animateProgress(100, 10);

        loadingOverlay.style.display = "none";
        bgContainer.style.display = "block";
        const titles = Array.from(bgContainer.querySelectorAll("h1, h2, h3"));
        const images = Array.from(bgContainer.querySelectorAll("img"));
        const buttons = Array.from(bgContainer.querySelectorAll("button"));
        const paragraphs = Array.from(bgContainer.querySelectorAll("p, span, div:not(:has(img, button, h1, h2, h3))"));
        function shuffle(arr) {
            return arr.sort(() => Math.random() - 0.5);
        }
        const orderedElements = [
            ...titles,
            ...shuffle(paragraphs),
            ...shuffle(images),
            ...shuffle(buttons)
        ];
        orderedElements.forEach((el, index) => {
            el.style.opacity = "0";
            el.style.filter = "blur(4vw)";
            el.style.transition = "opacity 1.2s ease-out, filter 1.5s ease-out, transform 1.5s ease-out";
            const delay = index * 100;
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.filter = "blur(0)";
            }, delay);
        });
    }

}

classifyVegetable();

function animateProgress(targetPercent = 100, duration = 1000) {
    return new Promise(resolve => {
        const progressBar = document.getElementById("progressBar");
        const startWidth = parseFloat(progressBar.style.width) || 0;
        const endWidth = Math.min(targetPercent, 100);
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const currentWidth = startWidth + (endWidth - startWidth) * progress;
            progressBar.style.width = currentWidth + "%";

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(step);
    });
}

