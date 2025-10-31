// 从 localStorage 获取用户数据
const userName = localStorage.getItem("userName") || "User";
const userImage = localStorage.getItem("userImage") || "";
const loadingOverlay = document.getElementById("loadingOverlay");
const bgContainer = document.getElementById("bgContainer");

document.getElementById("userName").textContent = userName;

if (userImage) {
    document.getElementById("previewImage").src = userImage;
    document.getElementById("previewImage").style.display = "block";
    document.getElementById("previewHint").style.display = "none";
} else {
    document.getElementById("previewImage").style.display = "none";
    document.getElementById("previewHint").style.display = "block";
}

document.getElementById("generateBtn").addEventListener("click", () => {
    const veg = document.getElementById("vegetableSelect").value;
    if(!userName || !userImage) {
        alert("Please provide your name and upload a photo first.");
        return;
    }
    alert(`Generating report for ${userName}, vegetable: ${veg}`);
});

const pureBase64 = userImage.split(",")[1];

fetch("https://serverless.roboflow.com/vegetable-classification-t6t4d/1?api_key=G1F1T8rZDpAB5gRrJa13", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: pureBase64
})
    .then(response => response.json())
    .then(data => {
        console.log("Roboflow API result:", data);
        const topPrediction = data.top;
        console.log("Top prediction:", topPrediction);
        const selectElement = document.getElementById("vegetableSelect");
        if(topPrediction && selectElement) {
            selectElement.value = topPrediction.toLowerCase();
        }
    })
    .catch(err => console.error(err))
    .finally(() => {
        loadingOverlay.style.display = "none";
        bgContainer.style.display = "block";
    });

