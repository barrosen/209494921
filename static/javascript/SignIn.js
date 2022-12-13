const myForm = document.querySelector('#form1');
const myUser = document.querySelector('#email');
const myPass = document.querySelector('#pass');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit',onSubmit);

function onSubmit (e) {
    console.log(Users);
    e.preventDefault();
    if(myUser.value === '' || myPass.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => window.location.href = '../views/SignIn.html',1500);
    }
    else {
        let x = 0;
        for (let i = 0; i < Users.length; i++) {
            if (Users[i].getUsername() === myUser.value && Users[i].getPassword() === myPass.value)
            {
                msg.classList.add('valid');
                msg.innerHTML = 'Connection Successfull';
                setTimeout(() => window.location.href = '../views/Search.html', 1000);
                x = 1;
            }
        }
        if(x === 0) {
            msg.classList.add('error');
            msg.innerHTML = 'Username or Password Invalid';
            setTimeout(() =>window.location.href = '../views/SignIn.html', 1500);
        }
    }
}



