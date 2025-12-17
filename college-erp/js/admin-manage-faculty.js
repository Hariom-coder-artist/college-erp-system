// js/admin-manage-faculty.js
document.addEventListener('DOMContentLoaded', ()=>{
  const tbody = document.querySelector('#facultyTable tbody');
  function render(){
    tbody.innerHTML = '';
    App.api.getFaculties().forEach((f, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${f.name}</td><td>${f.email}</td><td><a href="#" class="edit" data-idx="${idx}">Edit</a> | <a href="#" class="del" data-idx="${idx}">Delete</a></td>`;
      tbody.appendChild(tr);
    });
  }
  render();

  document.getElementById('addFacultyBtn').addEventListener('click', async ()=>{
    const name = prompt('Faculty name');
    const email = prompt('Faculty email');
    if(!name || !email) return;
    // Try real endpoint
    try{
      const res = await fetch('/api/admin/faculty', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email})
      });
      if(res.ok){ alert('Faculty added'); render(); return; }
    }catch(err){ console.warn('Faculty API not available', err); }
    // Demo fallback
    const store = App.api.readStore();
    store.faculties.push({name,email});
    App.api.writeStore(store);
    render();
  });

  tbody.addEventListener('click', (e)=>{
    if(e.target.matches('.del')){
      e.preventDefault();
      const idx = Number(e.target.dataset.idx);
      if(!confirm('Remove this faculty?')) return;
      const store = App.api.readStore();
      store.faculties.splice(idx,1);
      App.api.writeStore(store);
      render();
    }
    if(e.target.matches('.edit')){
      e.preventDefault();
      const idx = Number(e.target.dataset.idx);
      const store = App.api.readStore();
      const f = store.faculties[idx];
      const name = prompt('Edit name', f.name);
      const email = prompt('Edit email', f.email);
      if(name && email){
        store.faculties[idx] = {name,email};
        App.api.writeStore(store);
        render();
      }
    }
  });
});