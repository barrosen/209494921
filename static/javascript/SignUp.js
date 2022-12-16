const myForm = document.querySelector('#form2');

myForm.addEventListener('submit', onSub);

function onSub(e) {
    e.preventDefault();
    const myMail = document.querySelector('#email').value;
    const myPass = document.querySelector('#pass').value;
    const myFirst = document.querySelector('#first').value;
    const myLast = document.querySelector('#last').value;
    const myAge = document.querySelector('#Age').value;
    const msg = document.querySelector('.msg');
    let letters = /^[A-Za-z]+$/;

    for (let i = 0; i < Users.length; i++) {
        if (Users[i].getUsername() === myMail) {
            msg.classList.add('error');
            msg.innerHTML = 'Username in use';
            setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
            return false;
        }
    }

    if (EmailValidation(myMail) === false) {
        msg.classList.add('error');
        msg.innerHTML = "Invalid email address";
        setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
        return false;
    }

    if (myPass.length < 8 && myPass.length < 15) {
        msg.classList.add('error');
        msg.innerHTML = 'Password must be at least 8 characters and less then 15';
        setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
        return false;
    }

    if (myLast.length<2 || myFirst.length<2)
    {
        msg.classList.add('error');
        msg.innerHTML = "First and Last name must be at least 2 letters";
        setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
        return false;
    }

    if(myAge<15 || myAge>120)
    {
        msg.classList.add('error');
        msg.innerHTML = "Minimum Age 15 and Maximum 120";
        setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
        return false;
    }
    if (myLast.match(letters) && myFirst.match(letters))
    {
        var newUser = new User('myMail', 'myPass', 'myFirst', 'myLast', 'myAge.value');
        Users.push(newUser);
        console.log(Users);
        msg.classList.add('valid');
        msg.innerHTML = 'Account Created Succesfully';
        setTimeout(() => window.location.href = '../views/SignIn.html', 1000);
    }
    else {
        msg.classList.add('error');
        msg.innerHTML = "First and Last name must be english letters only";
        setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
        return false;
    }
}
function EmailValidation(mail) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) //regex to check if valid email
    {
        return true;
    }
    return false;
}

function PasswordValidation(password) {
    if ((/^[a-zA-Z]$/) && (/^[a-zA-Z0-9]$/) && (/^[a-zA-Z0-9]*$/)) //regex to check if valid password
    {
        return true;
    }
    return false;
}
