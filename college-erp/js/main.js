/* js/main.js - shared utilities and localStorage demo persistence */
const App = (() => {
  const STORAGE_KEY = 'college_erp_demo_v1';

  function readStore(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {
        notices: [],
        students: [{name:'Hariom Kumar',email:'hariom@gmail.com'}],
        faculties: [{name:'Gini Rastogi',email:'gini@gmail.com'}],
        courses: [{name:'B.Tech CSE'}],
        metrics: {faculty:1,students:1,courses:1,totalFees:89000}
      };
    }catch(e){
      console.error('readStore error',e);
      return {notices:[],students:[],faculties:[],courses:[],metrics:{}};
    }
  }

  function writeStore(data){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch(e){ console.error('writeStore error',e); }
  }

  function addNotice(text){
    const store = readStore();
    store.notices.unshift({text, date: new Date().toLocaleDateString()});
    writeStore(store);
    return store.notices;
  }

  function getNotices(){ return readStore().notices || []; }
  function getStudents(){ return readStore().students || []; }
  function getFaculties(){ return readStore().faculties || []; }
  function getCourses(){ return readStore().courses || []; }
  function getMetrics(){ return readStore().metrics || {}; }

  function initSidebarLinks(){
    document.querySelectorAll('.nav li').forEach(li=>{
      li.addEventListener('click', ()=>{
        document.querySelectorAll('.nav li').forEach(x=>x.classList.remove('active'));
        li.classList.add('active');
        const a = li.querySelector('a');
        if(a && a.getAttribute('href')) window.location.href = a.getAttribute('href');
      });
    });
  }

  function initModalHandlers(){
    document.querySelectorAll('[data-open-modal]').forEach(btn=>{
      btn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        const id = btn.dataset.openModal;
        const modal = document.getElementById(id);
        if(modal) modal.style.display = 'flex';
      });
    });
    document.querySelectorAll('[data-close-modal]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const modal = btn.closest('.modal');
        if(modal) modal.style.display = 'none';
      });
    });
  }

  function initNoticeForms(){
    document.querySelectorAll('#noticeForm').forEach(form=>{
      form.addEventListener('submit', e=>{
        e.preventDefault();
        const input = form.querySelector('input[name="notice"]');
        if(!input) return;
        const text = input.value.trim();
        if(!text){ alert('Enter notice'); return; }
        addNotice(text);
        renderNotices();
        input.value = '';
      });
    });
  }

  function renderNotices(){
    const notices = getNotices();
    document.querySelectorAll('#noticeTable').forEach(table=>{
      const tbody = table.querySelector('tbody');
      if(!tbody) return;
      tbody.innerHTML = '';
      notices.forEach(n=>{
        const tr = document.createElement('tr');
        const td1 = document.createElement('td'); td1.textContent = n.text;
        const td2 = document.createElement('td'); td2.textContent = n.date;
        tr.appendChild(td1); tr.appendChild(td2);
        tbody.appendChild(tr);
      });
    });
  }

  function initSearchForms(){
    document.querySelectorAll('.search-form').forEach(form=>{
      form.addEventListener('submit', e=>{
        e.preventDefault();
        alert('Search executed (demo). Replace with real logic if needed.');
      });
    });
  }

  return {
    init: function(){
      initSidebarLinks();
      initModalHandlers();
      initNoticeForms();
      initSearchForms();
      renderNotices();
    },
    api: {
      addNotice,
      getNotices,
      getStudents,
      getFaculties,
      getCourses,
      getMetrics,
      readStore,
      writeStore
    }
  };
})();

document.addEventListener('DOMContentLoaded', ()=>App.init());