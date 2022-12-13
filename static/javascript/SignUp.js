const myForm = document.querySelector('#form2');
const myMail = document.querySelector('#email');
const myPass = document.querySelector('#pass');
const myFirst = document.querySelector('#first');
const myLast = document.querySelector('#last');
const myAge = document.querySelector('#age')
const msg2 = document.querySelector('.msg');


myForm.addEventListener('submit',onSub);
function onSub(e) {
    e.preventDefault();
    let x = 0;
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].getUsername() === myMail.value) {
            msg2.classList.add('error');
            msg2.innerHTML = 'Username in use';
            setTimeout(() => window.location.href = '../views/SignUp.html', 1500);
            x = 1
        }
    }
        if(x==0) {
            let letters = /^[A-Za-z]+$/;
            if (myFirst.value.match(letters) && myLast.value.match(letters)) {
                console.log(myMail.value);
                var newUser = new User('myMail.value', 'myPass.value', 'myFirst.value', 'myLast.value', 'myAge.value');
                Users.push(newUser);
                console.log(Users);
                msg2.classList.add('valid');
                msg2.innerHTML = 'Account Created Succesfully';
                setTimeout(() => window.location.href = '../views/SignIn.html', 1000);
            } else {
                msg2.classList.add('error');
                msg2.innerHTML = 'Please Enter Only Letters in Name Fields';
                setTimeout(() => window.location.href = '../views/SignUp.html', 1500);
            }
        }
    }