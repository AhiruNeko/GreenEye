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
    "joinPage",
    "food"
];

const missing = requiredKeys.filter(key => !localStorage.getItem(key));

if (missing.length > 0) {
    if (localStorage.getItem("joinPage")) window.location.href = localStorage.getItem("joinPage");
    else window.location.href = "index.html";
}

const items = document.querySelectorAll("#summaryPage *:not(#reminderContainer):not(#reminderContainer *)");

items.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.filter = "blur(20px)";
    item.style.transition = "opacity 1.6s ease, filter 1.6s ease";

    setTimeout(() => {
        item.style.opacity = "1";
        item.style.filter = "blur(0)";
    }, index * 300);
});



document.getElementById("username").textContent = "@" + localStorage.getItem("name");
document.getElementById("userImg").src = localStorage.getItem("image");

const [kw1, kw2] = JSON.parse(localStorage.getItem("keywords"));
document.getElementById("keywords").innerHTML = "My contribution keywords:</br><span style=\"text-indent: 2em; display: inline-block;\"><b>" + kw1.keyword + " × " + kw2.keyword + "</b></span>";

document.getElementById("foodName").innerHTML = "My local organic food: <b>" + localStorage.getItem("food") + "</b>";
document.getElementById("contribution").innerHTML = "My contributions: </br><span style=\"text-indent: 2em; display: inline-block;\">Chemical pesticide residues reduction: <b>"
    + localStorage.getItem("chemicalData") + "</b></br><span style=\"text-indent: 2em; display: inline-block;\">Carbon emission reduction: <b>"
    + localStorage.getItem("carbonData") + "</b></span></br><span style=\"text-indent: 2em; display: inline-block;\">Precious clean water saved: <b>"
    + localStorage.getItem("waterData") + "</b></span></br><span style=\"text-indent: 2em; display: inline-block;\">Healthy soil protected: <b>"
    + localStorage.getItem("soilData") + "</b></span></span>";

async function generateReportImage(containerId = "reportGenerator", imgId = "reportImg") {
    const container = document.getElementById(containerId);
    const imgEl = document.getElementById(imgId);

    if (!container || !imgEl) return;
    const canvas = await html2canvas(container, {
        backgroundColor: null,
        scale: 2
    });

    const dataURL = canvas.toDataURL("image/png");
    imgEl.src = dataURL;
}

generateReportImage();

import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";

const reportEl = document.getElementById("reportGenerator");
const reportImg = document.getElementById("reportImg");
const shareBtn = document.getElementById("shareBtn");

let url = "";

shareBtn.addEventListener("click", async () => {
    const canvas = await html2canvas(reportEl, {
        useCORS: true,
        backgroundColor: "#ffffff"
    });

    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], "report.png", { type: "image/png" });
    url = URL.createObjectURL(blob);
    reportImg.src = url;
    reportImg.style.display = "block";

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
            title: "My Report",
            text: "Check out this report!",
            files: [file]
        });
        return;
    }

    alert("reminder");
    const reminderContainer = document.getElementById("reminderContainer");
    reminderContainer.style.opacity = "0";
    reminderContainer.style.filter = "blur(20px)";
    reminderContainer.style.transition = "opacity 0.8s ease, filter 0.8s ease";
    reminderContainer.style.display = "flex";
    setTimeout(() => {
        reminderContainer.style.opacity = "1";
        reminderContainer.style.filter = "blur(0)";
    }, 20);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    const reminderContainer = document.getElementById("reminderContainer");
    reminderContainer.style.opacity = "0";
    reminderContainer.style.filter = "blur(20px)";
    setTimeout(() => {
        reminderContainer.style.display = "none";
    }, 400);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.png";
    a.click();
});

document.getElementById("changeBtn").addEventListener("click", () => {
    const reminderContainer = document.getElementById("reminderContainer");
    reminderContainer.style.opacity = "0";
    reminderContainer.style.filter = "blur(20px)";
    setTimeout(() => {
        reminderContainer.style.display = "none";
    }, 400);
})

document.getElementById("doneBtn").addEventListener("click", () => {
    localStorage.removeItem("image");
    localStorage.removeItem("chemicalData");
    localStorage.removeItem("carbonData");
    localStorage.removeItem("waterData");
    localStorage.removeItem("soilData");
    localStorage.removeItem("keywords");
    localStorage.removeItem("food");
    localStorage.removeItem("joinPage");
    window.location.href = "index.html";
});

document.getElementById("learnMoreBtn").addEventListener("click", () => {
    window.open("learn-more.html", "_blank");
})
