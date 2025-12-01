import {supabase, checkAuthAndRedirect} from "./supabase.js";

checkAuthAndRedirect();

console.log(window.location.pathname);

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    sidebar.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (!clickedInsideSidebar && !clickedMenuButton && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

if (window.location.pathname.endsWith("my-account.html")) {
    const {data: {user}} = await supabase.auth.getUser();
    console.log(user);
    const avatarUrl = user.user_metadata.avatar_url;
    const name = user.user_metadata.name;
    const fullName = user.user_metadata.full_name;
    const email = user.user_metadata.email;
    const iss = user.user_metadata.iss;
    document.getElementById("avatar").src = avatarUrl;
    document.getElementById("name").textContent = name;
    document.getElementById("email").textContent = email;
    document.getElementById("fullName").textContent = fullName;
    document.getElementById("moreAboutAccount").href = iss;
}

if (window.location.pathname.endsWith("my-account-settings.html")) {
    const {data: {user}} = await supabase.auth.getUser();
    document.getElementById("moreSettings").href = user.user_metadata.iss;
    const logOutBtn = document.getElementById('logOutBtn')

    logOutBtn.onclick = async () => {
        const {error} = await supabase.auth.signOut()
        if (error) {
            console.error('Logout failed:', error)
            return
        }
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        localStorage.removeItem('userEmail')
        sessionStorage.clear()
        localStorage.setItem("from", "my-account-settings.html logOutBtn")
        window.location.href = 'login.html'
    }
}

localStorage.removeItem("image");
localStorage.removeItem("chemicalData");
localStorage.removeItem("carbonData");
localStorage.removeItem("waterData");
localStorage.removeItem("soilData");
localStorage.removeItem("keywords");
localStorage.removeItem("food");
localStorage.removeItem("joinPage");

if (window.location.pathname.endsWith("my-account-contribution.html")) {
    const {data: {user}} = await supabase.auth.getUser();
    const user_id = user.id;
    const { data, error } = await supabase
        .from("user_data")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

    const tbody = document.querySelector("#contributionsTable tbody");
    tbody.innerHTML = "";

    let rowData = null;
    let selectedImgUrl = null;
    data.forEach(row => {
        const tr = document.createElement("tr");
        const time = new Date(row.created_at).toLocaleString();
        const filename = row.food_image;
        const { data } = supabase.storage.from('food_image').getPublicUrl(filename);
        const imgUrl = data.publicUrl;

        tr.innerHTML = `
            <td>${time}</td>
            <td>${row.food_type || "—"}</td>
            <td>
                ${ row.food_image ?
            `<img src="${imgUrl}" style="width:10vmin;height:10vmin;border-radius:1vmin;object-fit:cover;">`
            : "No image"
        }
            </td>
        `;
        tbody.appendChild(tr);

        tr.addEventListener("click", () => {
            if (tr.classList.contains("selected")) {
                tr.classList.remove("selected");
                rowData = null;
                selectedImgUrl = null;
                return;
            }
            document.querySelectorAll("#contributionsTable tbody tr")
                .forEach(r => r.classList.remove("selected"));
            tr.classList.add("selected");
            rowData = row;
            const filename = rowData.food_image;
            const { data } = supabase.storage.from('food_image').getPublicUrl(filename);
            selectedImgUrl = data.publicUrl;
        });
    });

    document.getElementById("addButton").addEventListener("click", () => {
       window.location.href = 'user-join.html';
    });

    document.getElementById("reviewButton").addEventListener("click", async () => {
        if (rowData == null) {
            alert("Please click a row to select a row to review.");
            return;
        }
        localStorage.setItem("keywords", rowData.keywords);
        localStorage.setItem("chemicalData", rowData.chemical_data + "g");
        localStorage.setItem("carbonData", rowData.carbon_data + "g");
        localStorage.setItem("waterData", rowData.water_data + "L");
        localStorage.setItem("soilData", rowData.soil_data + "m²");
        localStorage.setItem("joinPage", "my-account-contribution.html");
        localStorage.setItem("saved", "true");
        localStorage.setItem("food", rowData.food_type);
        localStorage.setItem("progNav", "true");

        const response = await fetch(selectedImgUrl);
        const blob = await response.blob();
        const base64 = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
        localStorage.setItem("image", base64);

        window.location.href = 'report.html';
    })
}
