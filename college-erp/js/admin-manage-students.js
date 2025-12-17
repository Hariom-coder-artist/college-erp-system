// js/admin-manage-students.js
document.addEventListener('DOMContentLoaded', ()=>{
  const tbody = document.querySelector('#studentsTable tbody');
  function render(){
    tbody.innerHTML = '';
    App.api.getStudents().forEach((s, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.name}</td><td>${s.email}</td><td><a href="#" class="edit" data-idx="${idx}">Edit</a> | <a href="#" class="del" data-idx="${idx}">Delete</a></td>`;
      tbody.appendChild(tr);
    });
  }
  render();

  document.getElementById('addStudentBtn').addEventListener('click', async ()=>{
    const name = prompt('Student name');
    const email = prompt('Student email');
    if(!name || !email) return;
    try{
      const res = await fetch('/api/admin/student', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email})
      });
      if(res.ok){ alert('Student added'); render(); return; }
    }catch(err){ console.warn('Student API not available', err); }
    const store = App.api.readStore();
    store.students.push({name,email});
    App.api.writeStore(store);
    render();
  });

  tbody.addEventListener('click', (e)=>{
    if(e.target.matches('.del')){
      e.preventDefault();
      const idx = Number(e.target.dataset.idx);
      if(!confirm('Remove this student?')) return;
      const store = App.api.readStore();
      store.students.splice(idx,1);
      App.api.writeStore(store);
      render();
    }
    if(e.target.matches('.edit')){
      e.preventDefault();
      const idx = Number(e.target.dataset.idx);
      const store = App.api.readStore();
      const s = store.students[idx];
      const name = prompt('Edit name', s.name);
      const email = prompt('Edit email', s.email);
      if(name && email){
        store.students[idx] = {name,email};
        App.api.writeStore(store);
        render();
      }
    }
  });
});