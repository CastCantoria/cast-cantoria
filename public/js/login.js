document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: e.target.email.value,
      password: e.target.password.value
    })
  });

  const data = await res.json();
  if (data.token) {
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    localStorage.setItem('token', data.token);

    if (payload.role === 'admin') {
      window.location.href = '/admin/dashboard.html';
    } else if (payload.role === 'editor') {
      window.location.href = '/editor/dashboard.html';
    } else {
      alert("Accès limité");
    }
  } else {
    alert("Échec de la connexion");
  }
});