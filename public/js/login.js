// login handler
const login = async (e) => {
  e.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    res.ok ? document.location.replace('/') : alert(res.statusText);
  }
};

// signup handler
const signup = async (e) => {
  e.preventDefault();

  const username = document.querySelector('#usernameSignUp').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#passwordSignUp').value.trim();

  if (username && email && password) {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    res.ok ? document.location.replace('/') : alert(res.statusText);
  }
};

// event listeners
document.querySelector('.login-form').addEventListener('submit', login);
document.querySelector('.signup-form').addEventListener('submit', signup);
