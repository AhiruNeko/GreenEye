import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// const SUPABASE_URL = "https://lcpbgtfrwxtagaefbusl.supabase.co";
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGJndGZyd3h0YWdhZWZidXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzA0MjUsImV4cCI6MjA3NzY0NjQyNX0.73gt5IJ3aOh1WStLZK77-MNk_coAbUQpB13COz3CFcQ";

const SUPABASE_URL = 'https://mvgbkwwdciuxpdksoduv.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z2Jrd3dkY2l1eHBka3NvZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODgwMjUsImV4cCI6MjA3NzU2NDAyNX0.Hup9lRdDaHjxKrYIc5icjToIyutor9eBRwPpj3kz8KA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const googleLogin = document.getElementById("GoogleLoginBtn");
const githubLogin = document.getElementById("GithubLoginBtn");
const guestBtn = document.getElementById("guestBtn");

googleLogin.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: replaceLastPathSegment("user-join.html") }
    });
    if (error) console.error('Google login error:', error);
});

githubLogin.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: replaceLastPathSegment("user-join.html") }
    });
    if (error) console.error('Github login error:', error);
});

function continueAsGuest() {
    supabase.auth.signOut();
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    sessionStorage.clear();
    window.location.href = 'guest-join.html';
}
guestBtn.addEventListener("click", continueAsGuest);
window.addEventListener('load', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        const user = session.user;
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.user_metadata.full_name || user.email);
        localStorage.setItem('userEmail', user.email);
        setTimeout(() => {
            window.location.href = 'user-join.html';
        }, 1000);
    }
});

function replaceLastPathSegment(newSegment, url = window.location.href) {
    const urlObj = new URL(url);
    const segments = urlObj.pathname.split('/');
    if (segments.length > 0) {
        segments[segments.length - 1] = newSegment;
    } else {
        segments.push(newSegment);
    }
    urlObj.pathname = segments.join('/');
    return urlObj.toString();
}
