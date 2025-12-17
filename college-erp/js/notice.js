// js/notice.js
document.addEventListener('DOMContentLoaded', ()=>{
  // main.js already renders notices and handles form
  // If you want to auto-sync with backend:
  const form = document.getElementById('noticeForm');
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const input = form.querySelector('input[name="notice"]');
    const text = input.value.trim();
    if(!text) return alert('Enter notice');
    // Try real endpoint
    try{
      const res = await fetch('/api/notice', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({text})
      });
      if(res.ok){
        const data = await res.json();
        // optionally refresh from backend
      }
    }catch(err){
      console.warn('Notice API not available, using demo', err);
    }
    App.api.addNotice(text);
    App.init && App.init(); // re-render notices
    input.value = '';
  });
});