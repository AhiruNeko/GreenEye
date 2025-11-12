const uploadInput = document.getElementById("uploadPhoto");
const previewImage = document.getElementById("previewImage");
const uploadHint = document.getElementById("uploadHint");
import {supabase, checkAuthAndRedirect} from "./supabase.js";

checkAuthAndRedirect();

localStorage.setItem("joinPage", "user-join.html");

localStorage.removeItem("chemicalData");
localStorage.removeItem("carbonData");
localStorage.removeItem("waterData");
localStorage.removeItem("soilData");
localStorage.removeItem("image");
localStorage.removeItem("keywords");

window.addEventListener("load", async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);
    const name = user.user_metadata.name;
    localStorage.setItem("name", name);
    document.getElementById("greet").textContent = "Hi👋, " + name + "!";
});

window.addEventListener("pageshow", () => { uploadInput.value = ""; });

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

document.getElementById("myAccountByn").addEventListener("click", () => {
    window.location.href = "my-account.html";
});

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

document.getElementById("startBtn").addEventListener("click", () => {
    const file = uploadInput.files[0];
    if (!file) {
        alert("Please upload a photo!");
        return;
    }
    localStorage.setItem("keywords", JSON.stringify(getRandomKeywords()));
    localStorage.setItem("chemicalData", calculateReduction([0.2, 1], [0.21, 0.5]) + "g");
    localStorage.setItem("carbonData", calculateReduction([0.2, 1], [50, 120], 2) + 'g');
    localStorage.setItem("waterData", calculateReduction([0.2, 1], [30, 60], 2) + "L");
    localStorage.setItem("soilData", calculateReduction([0.2, 1], [1.7, 2.5], 3) + "m²");
    localStorage.setItem("progNav", "true");
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement("canvas");
            const maxWidth = 1200;
            const maxHeight = 1200;
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
            localStorage.setItem("image", compressedDataUrl);
            localStorage.setItem("joinPage", "user-join.html");
            window.location.href = "prepare.html";
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
