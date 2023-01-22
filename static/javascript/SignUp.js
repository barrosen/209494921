function init() {
    // Check if the current URL is the page you want
    if (location.pathname === '/SignUp') {
        const myForm = document.querySelector('#form2');

        myForm.addEventListener('submit', onSub);

        function onSub(e) {
            // e.preventDefault();
            const myMail = document.querySelector('#email').value;
            const myPass = document.querySelector('#pass').value;
            const myFirst = document.querySelector('#first').value;
            const myLast = document.querySelector('#last').value;
            const myAge = document.querySelector('#Age').value;
            const msg = document.querySelector('.msg');
            let letters = /^[A-Za-z]+$/;

            if (EmailValidation(myMail) === false) {
                msg.classList.add('error');
                msg.innerHTML = "Invalid email address";
                setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
                e.preventDefault();
                return false;
            }

            if (myPass.length < 8 && myPass.length < 15) {
                msg.classList.add('error');
                msg.innerHTML = 'Password must be at least 8 characters and less then 15';
                setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
                e.preventDefault();
                return false;
            }

            if (myLast.length<2 || myFirst.length<2)
            {
                msg.classList.add('error');
                msg.innerHTML = "First and Last name must be at least 2 letters";
                setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
                e.preventDefault();
                return false;
            }

            if(myAge<15 || myAge>120)
            {
                msg.classList.add('error');
                msg.innerHTML = "Minimum Age 15 and Maximum 120";
                setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
                e.preventDefault();
                return false;
            }
            if (myLast.match(letters) && myFirst.match(letters))
            {
                return true;
            }
            else {
                msg.classList.add('error');
                msg.innerHTML = "First and Last name must be english letters only";
                setTimeout(()=>{ msg.innerHTML="",msg.classList.remove('error')},2000)
                e.preventDefault();
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

    }

}


window.addEventListener('load', init);

