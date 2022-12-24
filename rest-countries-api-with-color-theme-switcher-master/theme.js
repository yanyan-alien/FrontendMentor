console.log(localStorage.getItem('theme'))
if (localStorage.getItem('theme') == 'dark') {
    var body = document.querySelector('html')
    body.classList.add('dark')
}