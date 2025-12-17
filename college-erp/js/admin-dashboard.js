// js/admin-dashboard.js
document.addEventListener('DOMContentLoaded', ()=>{
  const metrics = App.api.getMetrics();
  document.getElementById('metricFacultyVal').textContent = metrics.faculty ?? App.api.getFaculties().length;
  document.getElementById('metricStudentsVal').textContent = metrics.students ?? App.api.getStudents().length;
  document.getElementById('metricCoursesVal').textContent = metrics.courses ?? App.api.getCourses().length;
  document.getElementById('metricFeesVal').textContent = (metrics.totalFees ?? 0);
});