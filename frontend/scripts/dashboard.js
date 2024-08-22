const logoutForm = document.querySelector('[data-logout-form]');
const logoutBtn = document.querySelector('[data-logout-btn]');

let isLoading = false;
logoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (isLoading) return;

  isLoading = true;
  logoutBtn.classList.add('loading');

  fetch('/logout', {
    method: 'POST'
  })
  .then(data => {
    if (data.ok) {
        location.assign('/');
    }
  })
  .finally(() => {
    logoutBtn.classList.remove('loading');
    isLoading = false;
  })
})