const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessages();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError('Email and password are required');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing In...';

    try {
        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            if (error.message.includes('Invalid login credentials')) {
                showError('Invalid email or password. Please check your credentials.');
            } else if (error.message.includes('Email not confirmed')) {
                showError('Please confirm your email address before signing in. Check your inbox for the confirmation link.');
            } else {
                showError(error.message);
            }
            return;
        }

        if (data.user) {
            // Get user profile from our custom table
            const userProfile = await GreenEyeDB.getUserProfile(data.user.id);

            if (userProfile.success) {
                showSuccess('Login successful! Redirecting...');

                // Store user data in localStorage
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('userName', userProfile.user.name);
                localStorage.setItem('userFullName', userProfile.user.full_name || userProfile.user.name);
                localStorage.setItem('userEmail', data.user.email);

                // Redirect to main app after 1 second
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showError('User profile not found. Please contact support.');
            }
        } else {
            showError('Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('An unexpected error occurred. Please try again.');
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
    }
});

function continueAsGuest() {
    // Clear any existing user data completely
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('currentUser');

    // Clear any session storage as well
    sessionStorage.clear();

    // Redirect to main app
    window.location.href = 'index.html';
}

// Check if user is already logged in
window.addEventListener('load', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        showSuccess('You are already logged in. Redirecting...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
});