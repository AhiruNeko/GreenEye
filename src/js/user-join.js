const uploadInput = document.getElementById("uploadPhoto");
const previewImage = document.getElementById("previewImage");
const uploadHint = document.getElementById("uploadHint");
import {supabase} from "./supabase.js";

window.addEventListener("load", async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);
    const name = user.user_metadata.name;
    localStorage.setItem("name", name);
    document.getElementById("greet").textContent = "Hi👋, " + name + "!";
})

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
})

document.getElementById("startBtn").addEventListener("click", () => {
    const file = uploadInput.files[0];

    if (!file) {
        alert("Please upload a photo!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem("image", event.target.result);
        window.location.href = "prepare.html";
    };
    reader.readAsDataURL(file);
});