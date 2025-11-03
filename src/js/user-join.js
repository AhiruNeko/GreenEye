const uploadInput = document.getElementById("uploadPhoto");
const previewImage = document.getElementById("previewImage");
const uploadHint = document.getElementById("uploadHint");
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// const SUPABASE_URL = 'https://lcpbgtfrwxtagaefbusl.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGJndGZyd3h0YWdhZWZidXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzA0MjUsImV4cCI6MjA3NzY0NjQyNX0.73gt5IJ3aOh1WStLZK77-MNk_coAbUQpB13COz3CFcQ';

const SUPABASE_URL = 'https://mvgbkwwdciuxpdksoduv.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z2Jrd3dkY2l1eHBka3NvZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODgwMjUsImV4cCI6MjA3NzU2NDAyNX0.Hup9lRdDaHjxKrYIc5icjToIyutor9eBRwPpj3kz8KA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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