const allStars = document.querySelectorAll('.star');
const myForm = document.querySelector('#form6');
const msg = document.querySelector('.msg');

let current_rating = document.querySelector('.current_rating');

allStars.forEach((star,i) => {
    star.onclick = function(){
        let current_star_level = i+1;
        current_rating.innerText = `${current_star_level} of 5`;
        allStars.forEach((star,j) => {
            if(current_star_level >= j+1){
                star.innerHTML = '&#9733';
            }
            else{
                star.innerHTML = '&#9734';
            }
        })

    }
})

myForm.addEventListener('submit', btnSub);

function btnSub(e) {
    e.preventDefault();
    msg.classList.add('valid');
    msg.innerHTML = 'Thanks for Rating!';
    setTimeout(() => window.location.href = '../views/SignIn.html', 1500);
}