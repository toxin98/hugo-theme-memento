(() => {
  const mirror = document.querySelector('.mirror__svg');
  if (!mirror) return;

  // Give keyboard users the same subtle focus treatment as pointer users.
  mirror.querySelectorAll('.mirror-piece-link').forEach((link) => {
    link.addEventListener('focus', () => link.classList.add('focused'));
    link.addEventListener('blur', () => link.classList.remove('focused'));
  });
})();
