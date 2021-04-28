// login handler
const login = async (e) => {
  e.preventDefault();
  const username = document.querySelector('#usernameLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();

  if (username && password) {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    res.ok ? console.log('You are logged in!') : alert(res.statusText);
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
