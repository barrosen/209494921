const buttons = document.querySelectorAll('.star');
const currentRating = document.querySelector('.current_rating');

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    currentRating.textContent = event.target.value + ' of 5';
  });
});
