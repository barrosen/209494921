const myForm = document.querySelector('#form7');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', btnSub);

function btnSub(e) {
       e.preventDefault();
       msg.classList.add('valid');
       msg.innerHTML = 'Thanks For Contacting Me';
       setTimeout(() => window.location.href = '../views/SignIn.html', 2000);
}