const logout = async (e) => {
  e.preventDefault();

  const res = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  res.ok ? document.location.replace('/') : alert(readdirSync.statusText);
};

document.querySelector('#logout').addEventListener('click', logout);
