import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Dylan
// const SUPABASE_URL = 'https://lcpbgtfrwxtagaefbusl.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGJndGZyd3h0YWdhZWZidXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzA0MjUsImV4cCI6MjA3NzY0NjQyNX0.73gt5IJ3aOh1WStLZK77-MNk_coAbUQpB13COz3CFcQ';

// Thomas
const SUPABASE_URL = 'https://mvgbkwwdciuxpdksoduv.supabase.co';
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z2Jrd3dkY2l1eHBka3NvZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODgwMjUsImV4cCI6MjA3NzU2NDAyNX0.Hup9lRdDaHjxKrYIc5icjToIyutor9eBRwPpj3kz8KA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function checkAuthAndRedirect() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        window.location.href = 'login.html';
    }
}