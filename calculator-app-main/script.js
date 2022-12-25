const text_container = document.getElementById('screen-text')
const main_btns = document.querySelectorAll('.btn-main')
const toggle = document.querySelectorAll('input[type="radio"')
const body = document.querySelector('body')

if (window.matchMedia('prefers-color-scheme: light')) document.getElementById('theme2').checked = true

toggle.forEach(btn => {
    btn.addEventListener('click', () => {
        var theme = btn.value
        var theme_class = 'one'
        switch (+theme) {
            case 2:
                theme_class = 'two'
                break;
            case 3:
                theme_class = 'three'
                break;
            default:
                break;
        }
        body.classList = []
        body.classList.add(theme_class)
    })
})

main_btns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        var text = text_container.innerHTML
        var replace = false
        var char = btn.value
        switch (char) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                if (text.slice(text.length-3).search(/[0-9]{3}/) == 0 && text.length >= 3) char = ',' + char
                else if (text=='0') replace = true
                break;
            case '/':
            case '-':
            case '+':
            case '*':
                if (text.slice(text.length-1).search(/[0-9]+/g) == -1) char = '' 
                break
            case '.':
            default:
                break;
        }
        if (replace) text_container.innerHTML = char
        else text_container.innerHTML += char
    })
});
function reset() {
    text_container.innerText = 0
}
function del() {
    var text = text_container.innerHTML
    if (text.slice(text.length-2,text.length-1) == ',') text_container.innerHTML = text.slice(0, text.length-2)
    else text_container.innerHTML = text.slice(0, text.length-1)
}
function eval_text() {
    var statement = text_container.innerHTML
    statement = statement.replaceAll(/,||^[0-9./*+-]/g, '')
    try {
        statement = new String(eval(statement)).split('.')
        if (statement[0] !=='undefined') {
            var negative = statement[0].includes('-') 
            chunks = statement[0].replace('-', '')
            chunks = chunks.match(/.{1,3}/g)
            chunks = negative ? ['-' + chunks] : [chunks]
            if (statement.length==2) {
                chunks2 = statement[1].match(/.{1,3}/g)
                chunks = chunks.join(',') + '.' + chunks2.join(',')
            }
            text_container.innerHTML = chunks
        }
    }
    catch {
        console.log('error')
        text_container.innerHTML = 'NAN'
    }

}