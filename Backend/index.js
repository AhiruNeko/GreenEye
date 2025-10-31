// 获取 DOM 元素
const uploadInput = document.getElementById("uploadPhoto");
const previewImage = document.getElementById("previewImage");
const uploadHint = document.getElementById("uploadHint");

uploadInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
            previewImage.style.display = "block"; // 显示图片
            uploadHint.style.display = "none";    // 隐藏文字
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.style.display = "none";
        uploadHint.style.display = "block";
    }
});

document.getElementById("startBtn").addEventListener("click", () => {
    const name = document.getElementById("username").value.trim();
    const fileInput = document.getElementById("uploadPhoto");
    const file = fileInput.files[0];

    if(name && file) {
        localStorage.setItem("userName", name);
        const reader = new FileReader();
        reader.onload = function(event) {
            localStorage.setItem("userImage", event.target.result);
            window.location.href = "prepare.html";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please enter your name and upload a photo!");
    }
});

fetch('../assets/data/data.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chemicalData').textContent = data.chemical + 'g';
        document.getElementById('carbonData').textContent = data.carbon + 'kg';
        document.getElementById('waterData').textContent = data.water + 'L';
        document.getElementById('soilData').textContent = data.soil + 'm²';
    })
    .catch(error => console.error('Error loading JSON:', error));

// JS: 自动给页面中所有元素加浮现效果
document.addEventListener("DOMContentLoaded", () => {
    const allElements = Array.from(document.querySelectorAll("body *"));

    // 排除图片及包含图片的容器
    const elementsToFade = allElements.filter(el => {
        if (el.tagName.toLowerCase() === "img") return false;
        if (el.querySelector("img")) return false;
        return true;
    });

    // 给元素加初始 class
    elementsToFade.forEach(el => el.classList.add("fade-in-js"));

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible"); // 滑出视口时去掉 class
                }
            });
        },
        { threshold: 0.2 }
    );

    elementsToFade.forEach(el => observer.observe(el));
});










