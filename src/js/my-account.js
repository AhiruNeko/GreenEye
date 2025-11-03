import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// const SUPABASE_URL = 'https://lcpbgtfrwxtagaefbusl.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGJndGZyd3h0YWdhZWZidXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzA0MjUsImV4cCI6MjA3NzY0NjQyNX0.73gt5IJ3aOh1WStLZK77-MNk_coAbUQpB13COz3CFcQ';

const SUPABASE_URL = 'https://mvgbkwwdciuxpdksoduv.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z2Jrd3dkY2l1eHBka3NvZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODgwMjUsImV4cCI6MjA3NzU2NDAyNX0.Hup9lRdDaHjxKrYIc5icjToIyutor9eBRwPpj3kz8KA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

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