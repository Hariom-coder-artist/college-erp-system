// js/student-manage-profile.js
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('profileForm');
  const resetBtn = document.getElementById('resetProfile');

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const data = {
      fullname: form.fullname.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim()
    };

    // Try real endpoint, fallback to demo
    try{
      const res = await fetch('/api/student/profile', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      if(res.ok){
        alert('Profile updated successfully');
        return;
      }
    }catch(err){
      console.warn('Profile API not available, using demo save', err);
    }

    // Demo: save to localStorage store
    const store = App.api.readStore();
    const students = store.students || [];
    const idx = students.findIndex(s=>s.email === data.email);
    if(idx >= 0) students[idx].name = data.fullname;
    else students.push({name:data.fullname,email:data.email});
    store.students = students;
    App.api.writeStore(store);
    alert('Saved (demo)');
  });

  resetBtn.addEventListener('click', ()=>{
    form.fullname.value = 'Hariom Kumar';
    form.email.value = 'hariom@gmail.com';
    form.password.value = 'password';
  });
});