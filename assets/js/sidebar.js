console.log("sidebar.js loaded");

document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('.toggle-left, .toggle-right');

  buttons.forEach(button => {

    button.addEventListener('click', (e) => {

      e.stopPropagation();

      const target = button.dataset.target;
      const sidebar = document.querySelector('.' + target);

      if (!sidebar) return;

      sidebar.classList.toggle('is-open');

    });

  });

  document.querySelectorAll('.sidebar-left, .sidebar-right').forEach(sidebar => {
    sidebar.addEventListener('click', e => {
      e.stopPropagation();
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-left, .sidebar-right').forEach(sidebar => {
      sidebar.classList.remove('is-open');
    });
  });

});
