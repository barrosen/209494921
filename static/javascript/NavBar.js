let currentPage = window.location.pathname;
console.log(currentPage);
const activePage = document.querySelectorAll("nav a").forEach(link =>{
    if(link.href.includes(`${currentPage}`)){
        link.classList.add('active');
    }
})


