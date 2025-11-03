import {supabase} from "./supabase.js";

window.addEventListener("load", async () => {
    const { data: { user } } = await supabase.auth.getUser();
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
})

// const logoutBtn = document.getElementById('logoutBtn')
//
// logoutBtn.onclick = async () => {
//     const { error } = await supabase.auth.signOut()
//     if (error) {
//         console.error('Logout failed:', error)
//         return
//     }
//     localStorage.removeItem('userId')
//     localStorage.removeItem('userName')
//     localStorage.removeItem('userEmail')
//     sessionStorage.clear()
//     localStorage.setItem("from", "my-account.html logOutBtn")
//     window.location.href = 'login.html'
// }

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

menuBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // 阻止事件冒泡，防止点击按钮立即触发“关闭”逻辑
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('shifted');
});

document.addEventListener('click', (event) => {
    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (!clickedInsideSidebar && !clickedMenuButton && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        mainContent.classList.remove('shifted');
    }
});