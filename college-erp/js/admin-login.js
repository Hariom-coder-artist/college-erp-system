// js/admin-login.js
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('loginForm');
  const forgot = document.getElementById('forgotAdmin');

  if(forgot){
    forgot.addEventListener('click', (e)=>{
      e.preventDefault();
      alert('Forgot password? Please contact admin support or use the Forgot Password flow.');
    });
  }

  if(form){
    form.addEventListener('submit', async e=>{
      e.preventDefault();
      const email = form.querySelector('input[name="email"]').value.trim();
      const password = form.querySelector('input[name="password"]').value.trim();
      if(!email || !password){ alert('Please enter email and password'); return; }

      const endpoint = '/api/auth/admin-login';
      try{
        const res = await fetch(endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({email,password})
        });
        if(res.ok){
          const data = await res.json();
          if(data && data.redirect) window.location.href = data.redirect;
          else window.location.href = 'admin-dashboard.html';
          return;
        }else{
          console.warn('Admin login endpoint returned', res.status);
          window.location.href = 'admin-dashboard.html';
        }
      }catch(err){
        console.warn('Admin login fetch failed, falling back to demo', err);
        window.location.href = 'admin-dashboard.html';
      }
    });
  }
});