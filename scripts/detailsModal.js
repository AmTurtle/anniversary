document.querySelector('.countdown').addEventListener('click', () => {
      const modal = document.getElementById('modal');
      modal.style.display = 'flex';
});
  
document.getElementById('close-btn').addEventListener('click', () => {
      const modal = document.getElementById('modal');
      modal.style.display = 'none';
});
  
// hide modal when clicking outside the modal content
window.addEventListener('click', (event) => {
      const modal = document.getElementById('modal');
      if (event.target === modal) {
            modal.style.display = 'none';
      }
});