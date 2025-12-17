// js/admin-manage-course.js
document.addEventListener('DOMContentLoaded', ()=>{
  const tbody = document.querySelector('#coursesTable tbody');
  function render(){
    tbody.innerHTML = '';
    App.api.getCourses().forEach((c, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${c.name}</td><td><a href="#" class="edit" data-idx="${idx}">Edit</a> | <a href="#" class="del" data-idx="${idx}">Delete</a></td>`;
      tbody.appendChild(tr);
    });
  } 
  render();

  document.getElementById('addCourseBtn').addEventListener('click', async ()=>{
    const name = prompt('Course name');
    if(!name) return;
    try{
      const res = await fetch('/api/admin/course', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name})
      });
      if(res.ok){ alert('Course added'); render(); return; }
    }catch(err){ console.warn('Course API not available', err); }
    const store = App.api.readStore();
    store.courses.push(name);
    App.api.writeStore(store);
    render();
  });

  tbody.addEventListener('click', (e)=>{
    if(e.target.matches('.del')){
      e.preventDefault();
      const idx = Number(e.target.dataset.idx);
      if(!confirm('Remove this course?')) return;
      const store = App.api.readStore();
      store.courses.splice(idx,1);
      App.api.writeStore(store);
      render();
    }
    if(e.target.matches('.edit')){
      e.preventDefault();
      const idx = Number(e.target.dataset.idx);
      const store = App.api.readStore();
      const name = prompt('Edit course name', store.courses[idx]);
      if(name){
        store.courses[idx] = name;
        App.api.writeStore(store);
        render();
      }
    }
  });
});