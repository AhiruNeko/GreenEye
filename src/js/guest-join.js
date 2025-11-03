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

    localStorage.setItem("name", name);

    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem("image", event.target.result);
        window.location.href = "prepare.html";
    };
    reader.readAsDataURL(file);
});

document.getElementById("logInBtn").addEventListener("click", () => {
    localStorage.setItem("from", "guest-join.html logInBtn")
    window.location.href = "login.html";
})
