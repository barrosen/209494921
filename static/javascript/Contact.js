const name = document.getElementById('c_name');
const mail = document.getElementById('c_mail');
const subject = document.getElementById('subject');
const country = document.getElementById('country');
const submit = document.getElementsByClassName('form7')[0];
const msg = document.querySelector('.msg');

submit.addEventListener('submit',(e)=>{
    e.preventDefault();

    Email.send({
        SecureToken : "e6a3ca12-24d4-4e24-a2e0-355b8d3371cc",
        To : 'barrosen6@gmail.com',
        From : "barrosen6@gmail.com",
        Subject : `${name.value} sent you a message`,
        Body : `Name:${name.value} <br> Email:${mail.value} <br> Country:${country.value}<br> Message:${subject.value}`
    }).then(
        msg.classList.add('valid'),
        msg.innerHTML = 'Thanks For Contacting Us',
        setTimeout(() => window.location.href = '../views/Contact.html', 2000),
    );
})



