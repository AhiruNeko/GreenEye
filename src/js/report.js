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
    "pageChemical"
];
const animations = {
    "pageKeywords": animatePageKeywords
}
updatePage();

document.addEventListener("click", () => {
    count++;
    updatePage()
});

function updatePage() {
    const targetElement = document.getElementById(pages[count]);

    if (count === 0) {
        targetElement.style.display = "flex";
        targetElement.style.transition = "opacity 5s ease";
        requestAnimationFrame(() => {
            targetElement.classList.add("visible");
            animations[pages[count]]?.(targetElement);
        });
    } else {
        const currentElement = document.getElementById(pages[count - 1]);
        targetElement.style.transition = "";
        currentElement.style.transition = "";

        requestAnimationFrame(() => {
            targetElement.style.display = "flex";
            currentElement.classList.remove("visible");
            currentElement.addEventListener("transitionend", () => {
                currentElement.style.display = "none";
                targetElement.classList.add("visible");
            }, { once: true });
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

function chemicalReduction() {
    const weightKgMean = (0.2 + 1) / 2;
    const weightKgStd = (1 - 0.2) / 6;
    const chemicalReductionMean = (0.21 + 0.5) / 2;
    const chemicalReductionStd = (0.5 - 0.21) / 6;
    const weightKg = randomNormal(weightKgMean, weightKgStd);
    const chemicalReductionGPerKg = randomNormal(chemicalReductionMean, chemicalReductionStd);
    const validWeightKg = Math.min(Math.max(weightKg, 0.2), 1);
    const validChemicalReductionGPerKg = Math.min(Math.max(chemicalReductionGPerKg, 0.21), 0.5);
    return (validWeightKg * validChemicalReductionGPerKg).toFixed(4);
}

document.getElementById("chemicalData").textContent = chemicalReduction() + "g";
