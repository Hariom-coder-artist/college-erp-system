// js/student-attendance.js
document.addEventListener('DOMContentLoaded', async ()=>{
  // Try to fetch attendance from API, fallback to demo zeros
  try{
    const res = await fetch('/api/student/attendance');
    if(res.ok){
      const data = await res.json();
      // expected { overallPercent, totalLectures, courses: [{name,attended,total}] }
      document.getElementById('attendancePercent').textContent = `Attendance: ${data.overallPercent}%`;
      document.getElementById('totalLectures').textContent = `Total Lectures: ${data.totalLectures}`;
      const tbody = document.querySelector('#attendanceTable tbody');
      tbody.innerHTML = '';
      data.courses.forEach(c=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${c.name}</td><td>${c.attended}</td><td>${c.total}</td>`;
        tbody.appendChild(tr);
      });
      return;
    }
  }catch(err){
    console.warn('Attendance API not available, using demo', err);
  }

  // Demo fallback: use localStorage or defaults
  const attended = 0, total = 0;
  document.getElementById('attendancePercent').textContent = `Attendance: 0%`;
  document.getElementById('totalLectures').textContent = `Total Lectures: 0`;
  document.getElementById('attended').textContent = attended;
  document.getElementById('total').textContent = total;
});