const myForm = document.querySelector('#form1');

myForm.addEventListener('submit',onSubmit);

function onSubmit (e) {
    console.log(Users);
    const myUser = document.querySelector('#email').value;
    const myPass = document.querySelector('#pass').value;
    const msg = document.querySelector('.msg');
    e.preventDefault();
    if(myUser === '' || myPass === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
        return false
    }
    else {
        let x = 0;
        for (let i = 0; i < Users.length; i++) {
            if (Users[i].getUsername() === myUser && Users[i].getPassword() === myPass)
            {
                msg.classList.add('valid');
                msg.innerHTML = 'Connection Successfull';
                setTimeout(() => window.location.href = '../views/Search.html', 1000);
                x = 1;
            }
        }
        if(x === 0) {
            for (let i = 0; i < Users.length; i++)
            {
                if (Users[i].getUsername() === myUser)
                {
                    msg.classList.add('error');
                    msg.innerHTML = 'Password Invalid';
                    setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
                    return false;
                }
                if (Users[i].getPassword() === myPass)
                {
                    msg.classList.add('error');
                    msg.innerHTML = 'Username Invalid';
                    setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
                    return false;
                }
            }
            msg.classList.add('error');
            msg.innerHTML = 'Both Username and Password Invalid';
            setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
            return false;
        }
    }
}



