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
    container.style.opacity = "1";
    const imgEl = document.getElementById(imgId);

    if (!container || !imgEl) return;

    try {
        const canvas = await html2canvas(container, {
            backgroundColor: null,
            scale: 2
        });

        const dataURL = canvas.toDataURL("image/png");
        imgEl.src = dataURL;
    } catch (err) {
        console.error("生成图片失败:", err);
    }
}

async function downloadReportImage(filename = "report.png") {
    const container = document.getElementById("reportGenerator");
    if (!container) return;

    const canvas = await html2canvas(container, { backgroundColor: null, scale: 2 });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
}

generateReportImage();

import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";

const reportEl = document.getElementById("reportGenerator");
const reportImg = document.getElementById("reportImg");
const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {
    const canvas = await html2canvas(reportEl, {
        useCORS: true,
        backgroundColor: "#ffffff"
    });

    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], "report.png", { type: "image/png" });
    const url = URL.createObjectURL(blob);
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

    const proceed = confirm(
        "Your current browser does not support system sharing. Click \"Confirm\" to download the image, click \"Cancel\" to try sharing it on another browser."
    );
    if (!proceed) return;

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});


