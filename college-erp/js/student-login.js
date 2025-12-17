// js/student-login.js
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('loginForm');
  const forgot = document.getElementById('forgotStudent');

  if(forgot){
    forgot.addEventListener('click', (e)=>{
      e.preventDefault();
      alert('Forgot password? Please contact support or use the Forgot Password flow.'); // per request
    });
  }

  if(form){
    form.addEventListener('submit', async e=>{
      e.preventDefault();
      const email = form.querySelector('input[name="email"]').value.trim();
      const password = form.querySelector('input[name="password"]').value.trim();
      if(!email || !password){ alert('Please enter email and password'); return; }

      // Real endpoint - replace with your backend URL
      const endpoint = '/api/auth/student-login';
      try{
        const res = await fetch(endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({email,password})
        });
        if(res.ok){
          // backend should return { success:true, redirect:'/student-dashboard.html' } or similar
          const data = await res.json();
          if(data && data.redirect) window.location.href = data.redirect;
          else window.location.href = 'student-dashboard.html';
          return;
        }else{
          console.warn('Student login endpoint returned', res.status);
          // fallback to demo redirect
          window.location.href = 'student-dashboard.html';
        }
      }catch(err){
        console.warn('Student login fetch failed, falling back to demo', err);
        window.location.href = 'student-dashboard.html';
      }
    });
  }
});