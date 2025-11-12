const requiredKeys = [
    "name",
    "image",
    "keywords",
    "chemicalData",
    "carbonData",
    "waterData",
    "soilData",
    "joinPage",
    "food"
];

const missing = requiredKeys.filter(key => !localStorage.getItem(key));

if (missing.length > 0) {
    if (localStorage.getItem("joinPage")) window.location.href = localStorage.getItem("joinPage");
    else window.location.href = "index.html";
}

const [kw1, kw2] = JSON.parse(localStorage.getItem("keywords"));
document.getElementById("keyword1").textContent = kw1.keyword;
document.getElementById("keyword2").textContent = kw2.keyword;
document.getElementById("description1").textContent = kw1.desc;
document.getElementById("description2").textContent = kw2.desc;

let count = 0;
const pages = [
    "pageKeywords",
    "pageChemical",
    "pageCarbon",
    "pageWater",
    "pageSoil"
];
const animations = {
    "pageKeywords": animatePageKeywords,
    "pageChemical": animatePageChemical
}
updatePage();

document.addEventListener("click", () => {
    count++;
    updatePage()
});

function updatePage() {
    const targetElement = document.getElementById(pages[count]);

    if (count === 0) {
        targetElement.style.transition = "opacity 5s ease";
        requestAnimationFrame(() => {
            targetElement.classList.add("visible");
            animations[pages[count]]?.(targetElement);
        });
    } else if (count === 5) {
        const currentElement = document.getElementById(pages[count - 1]);
        currentElement.style.transition = "";
        requestAnimationFrame(() => {
            currentElement.classList.remove("visible");
            setTimeout(() => {
                window.location.href = "summary.html";
            }, 2000);
        })
    } else {
        const currentElement = document.getElementById(pages[count - 1]);
        targetElement.style.transition = "opacity 3s ease";
        currentElement.style.transition = "";

        requestAnimationFrame(() => {
            currentElement.classList.remove("visible");
            setTimeout(() => {
                targetElement.classList.add("visible");
                animations[pages[count]]?.(targetElement);
            }, 2100);
        });
    }
}

function animatePageKeywords(el) {
    const items = el.children;

    Array.from(items).forEach((item, index) => {
        if (item.classList.contains("click-prompt")) return;
        const initialBlur = window.getComputedStyle(item).filter || 'blur(0px)';

        item.style.filter = 'blur(100px)';
        item.style.opacity = '0';
        item.style.transition = `filter 2s ease, opacity 2s ease, transform 2s ease ${index * 200}ms`;
        setTimeout(() => {
            item.style.filter = initialBlur;
            item.style.opacity = '1';
        }, index * 500);
    });
}

function generateChemicalElements(containerId, repeat = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const images = [
        'assets/report/chemicalElement1.svg',
        'assets/report/chemicalElement2.svg',
        'assets/report/chemicalElement3.svg',
        'assets/report/chemicalElement4.svg'
    ];
    container.innerHTML = '';
    for (let i = 0; i < repeat; i++) {
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'chemical-element';
            container.appendChild(img);
        });
    }
}

generateChemicalElements("chemicalContainer1", 3);
generateChemicalElements("chemicalContainer2", 3);
generateChemicalElements("chemicalContainer3", 3);

function startChemicalAnimation(containerId, direction = 'right', speed = 2.5) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const elements = Array.from(container.querySelectorAll('.chemical-element'));
    if (elements.length === 0) return;

    const containerWidth = 200;
    const spacing = containerWidth / elements.length;

    elements.forEach((el, i) => {
        el.style.left = spacing * i + 'vw';
        el.style.opacity = 1;
        el.style.filter = 'blur(0vw)';
        el.dataset.visible = 'true';
        el.style.transition = "opacity 2s ease, filter 2s ease";
    });

    let disappearTimer = null;
    setTimeout(() => {
        disappearTimer = setInterval(() => {
            let candidates = elements.filter(el => {
                const left = parseFloat(el.style.left);
                return left > 50 && left < 150 && el.dataset.visible === 'true';
            });
            if (candidates.length <= 3) return;
            candidates = candidates.sort(() => Math.random() - 0.5);
            let count = 0;
            for (let i = 0; i < candidates.length; i++) {
                const el = candidates[i];
                if (Math.random() < 0.2) {
                    el.style.opacity = 0;
                    el.style.filter = 'blur(1vw)';
                    el.dataset.visible = 'false';
                    count++;
                }
                const remaining = candidates.length - count;
                if (remaining <= 3) break;
            }
        }, 1000);
    }, 800);

    let running = true;

    function animate() {
        const page = document.getElementById('pageChemical');
        const opacity = parseFloat(getComputedStyle(page).opacity);
        const visible = opacity > 0.05;

        if (visible) {
            elements.forEach(el => {
                let left = parseFloat(el.style.left);
                if (direction === 'left') {
                    left -= speed * 0.016;
                    if (left + (el.offsetWidth / window.innerWidth * 100) < 0) {
                        left += spacing * elements.length;
                        el.style.opacity = 1;
                        el.style.filter = 'blur(0vw)';
                        el.dataset.visible = 'true';
                    }
                } else if (direction === 'right') {
                    left += speed * 0.016;
                    if (left > containerWidth) {
                        left -= spacing * elements.length;
                        el.style.opacity = 1;
                        el.style.filter = 'blur(0vw)';
                        el.dataset.visible = 'true';
                    }
                }
                el.style.left = left + 'vw';
            });
        }
        if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
        running = false;
        clearInterval(disappearTimer);
    };
}

function animatePageChemical() {
    startChemicalAnimation("chemicalContainer1");
    startChemicalAnimation("chemicalContainer2", "left", 2.8);
    startChemicalAnimation("chemicalContainer3", "right", 3.1);
}

document.getElementById("chemicalData").textContent = localStorage.getItem("chemicalData");
document.getElementById("carbonData").textContent = localStorage.getItem("carbonData");
document.getElementById("waterData").textContent = localStorage.getItem("waterData");
document.getElementById("soilData").textContent = localStorage.getItem("soilData");
