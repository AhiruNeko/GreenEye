const keywordsWithPoeticDesc = [
    { keyword: "Carbon Saver", desc: "Breathing lighter for the Earth." },
    { keyword: "Green Soul", desc: "Heart rooted in nature's embrace." },
    { keyword: "Earth Friend", desc: "Walking gently upon the land." },
    { keyword: "Nature Ally", desc: "Standing with forests and streams." },
    { keyword: "Water Keeper", desc: "Guarding rivers and quiet lakes." },
    { keyword: "Soil Healer", desc: "Nurturing life beneath our feet." },
    { keyword: "Eco Helper", desc: "Whispering care to every leaf." },
    { keyword: "Clean Choice", desc: "Choosing paths the Earth would smile at." },
    { keyword: "Planet Supporter", desc: "Lifting the planet, one act at a time." },
    { keyword: "Organic Believer", desc: "Trusting in the gifts of nature." },
    { keyword: "Nature Guardian", desc: "Watching over hills and meadows." },
    { keyword: "Eco Dreamer", desc: "Dreaming of forests untouched by time." },
    { keyword: "Local Supporter", desc: "Rooted in the hands that sow." },
    { keyword: "Soil Protector", desc: "Shielding the cradle of life below." },
    { keyword: "Blue Earth", desc: "Honoring oceans and crystal streams." },
    { keyword: "Eco Spirit", desc: "Living with the whisper of leaves." },
    { keyword: "Green Guardian", desc: "A sentinel for the shaded groves." },
    { keyword: "Earth Helper", desc: "Lending hands to quiet fields." },
    { keyword: "Pure Grower", desc: "Tending life in untamed soil." },
    { keyword: "Water Saver", desc: "Capturing the gift of rain." },
    { keyword: "Fresh Mind", desc: "Breathing clarity through green thoughts." },
    { keyword: "Eco Minded", desc: "Thinking in harmony with the wild." },
    { keyword: "Sustain Hero", desc: "Championing life for years to come." },
    { keyword: "Eco Friend", desc: "Walking softly among the flowers." },
    { keyword: "Nature Saver", desc: "Preserving whispers of the forest." },
    { keyword: "Clean Planet", desc: "Wiping away the dust of time." },
    { keyword: "Green Action", desc: "Turning hands into growing green." },
    { keyword: "Earth Hero", desc: "Guarding every hill and vale." },
    { keyword: "Eco Partner", desc: "Joining forces with sky and soil." },
    { keyword: "Nature Keeper", desc: "Holding balance in gentle palms." }
];

function getRandomKeywords() {
    const shuffled = [...keywordsWithPoeticDesc].sort(() => Math.random() - 0.5);
    const first = shuffled[0];
    const second = shuffled[1];
    return [first, second];
}

const [kw1, kw2] = getRandomKeywords();
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

function randomNormal(mean, stdDev) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * stdDev + mean;
}

function calculateReduction(range1, range2, digits=4) {
    const mean1 = (range1[0] + range1[1]) / 2;
    const std1 = (range1[1] - range1[0]) / 6;
    const mean2 = (range2[0] + range2[1]) / 2;
    const std2 = (range2[1] - range2[0]) / 6;
    const var1 = randomNormal(mean1, std1);
    const var2 = randomNormal(mean2, std2);
    const validVar1 = Math.min(Math.max(var1, range1[0]), range1[1]);
    const validVar2 = Math.min(Math.max(var2, range2[0]), range2[1]);
    return (validVar1 * validVar2).toFixed(digits);
}

document.getElementById("chemicalData").textContent = calculateReduction([0.2, 1], [0.21, 0.5]) + "g";

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

document.getElementById("carbonData").textContent = calculateReduction([0.2, 1], [50, 120], 2) + 'g';

document.getElementById("waterData").textContent = calculateReduction([0.2, 1], [30, 60], 2) + "L";

document.getElementById("soilData").textContent = calculateReduction([0.2, 1], [1.7, 2.5], 3) + "m²";
