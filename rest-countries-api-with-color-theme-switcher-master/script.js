var countries;
var githubpages = true
var home_query = '?fields=cca2,ccn3,cca3,cioc,flags,name,population,region,capital'
var detail_query = '?fields=cca2,ccn3,cca3,cioc,flags,name,population,region,subregion,capital,borders,languages,tld,currencies'
var container = document.getElementById('country-container')


if (window.location.pathname.includes('details')) retrieve_data()
else home_initialise()

document.getElementById('theme-switcher').addEventListener('click', () => {
    var body = document.querySelector('html')
    body.classList.toggle('dark')
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme','dark')
    }
    else localStorage.setItem('theme','light')
    console.log(localStorage.getItem('theme'))
})

function home_initialise() {
    fetch(`https://restcountries.com/v3.1/all${home_query}`)
    .then((res) => res.json())
    .then(data => {
        // console.log(data[10])
        initialise_countries(data)
        card_click()
    })
}

function initialise_countries(data) {
    data.forEach(el => {
        var country = document.createElement('div')
        country.classList.add('col')
        var country_code;
        var code = [el.cca2, el.cca3, el.ccn3, el.cioc]
        var i = 0
        while (country_code == undefined) {
            country_code = code[i]
            i++
        }
        country.innerHTML = create_card(country_code, el['flags']['png'], el['name']['common'], el['population'], el.region, el.capital)
        container.appendChild(country)
    });
    countries = document.querySelectorAll('.card')
}

function card_click() {
    countries.forEach(el => {
        el.addEventListener('click', () => {
            var code = el.getAttribute('value')
            get_details_and_redirect(code)
        })    
    });
}
function get_borders(borders) {
    var res = []
    borders.forEach(border=> {
        res.push(
            fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
            .then((res) => res.json())
            .then(data=> data['name']['common'])
        )
    })
    return Promise.all(res)
}
function get_details_and_redirect(code, redirect=true) {
    // console.log('in click 2nd function')
    fetch(`https://restcountries.com/v3.1/alpha/${code}${detail_query}`)
    .then((res) => res.json())
    .then(el => {
        if (el['borders'].length > 0) {
            get_borders(el['borders'])
            .then((res)=> {
                console.log(res)
                localStorage.setItem('border_countries', JSON.stringify(res))
                localStorage.setItem('country_data', JSON.stringify(el))
                // return [res, el]
                if (githubpages) window.location.href = '/FrontendMentor/rest-countries-api-with-color-theme-switcher-master/details.html'
                else window.location.href = '/rest-countries-api-with-color-theme-switcher-master/details.html'    
            })
        }
        else {
            localStorage.setItem('border_countries', JSON.stringify([]))
            localStorage.setItem('country_data', JSON.stringify(el))
            // return el
            if (githubpages) window.location.href = '/FrontendMentor/rest-countries-api-with-color-theme-switcher-master/details.html'
            else window.location.href = '/rest-countries-api-with-color-theme-switcher-master/details.html'    
        }
    })
    // .then((x)=>{
    //     console.log(x)
    // })
}

function retrieve_data() {
    var el = JSON.parse(localStorage.getItem('country_data'))
    var lang_keys = Object.keys(el['name']['nativeName'])
    var currency = Object.keys(el['currencies'])
    var border_countries = JSON.parse(localStorage.getItem('border_countries'))
    console.log(el)
    console.log(border_countries)

    document.querySelector('#details img[alt="country_flag"]').src = el['flags']['png']
    document.querySelector('#details .country_name').innerHTML = el['name']['common']
    document.querySelector('#details .population span').innerHTML = el['population'].toLocaleString('en-US')
    document.querySelector('#details .native_name span').innerHTML = el['name']['nativeName'][lang_keys[0]]['common']
    document.querySelector('#details .region span').innerHTML = el.region
    document.querySelector('#details .sub_region span').innerHTML = el['subregion']
    document.querySelector('#details .languages span').innerHTML = Object.values(el['languages']).join(', ')
    document.querySelector('#details .capital span').innerHTML = el.capital
    document.querySelector('#details .currencies span').innerHTML = el['currencies'][currency[0]]['name']
    document.querySelector('#details .top_level_domain span').innerHTML = Object.values(el['tld']).join(', ')

    if (border_countries.length > 0) {
        var i = 0
        var border_countries_container = document.querySelector('#border_countries')
        // border_countries_container.innerHTML=''
        border_countries.forEach(country => {
            var borderbutton = document.createElement('button')
            borderbutton.innerHTML = country
            borderbutton.classList.add('btn', 'custom-btn', 'border-btn')
            borderbutton.value = el['borders'][i]
            i++
            border_countries_container.appendChild(borderbutton)
            // borderbutton.addEventListener('click', ()=>{
            //     get_details_and_redirect(borderbutton.value)
            // })
        });
    }
}
var border_countries = document.querySelectorAll('.custom-btn.border-btn')
border_countries.forEach(btn => {
    btn.addEventListener('click', ()=>{
        get_details_and_redirect(btn.value, false)
    })
});

function filter(el) {
    // console.log(el.value !== '' && el.id)
    var url = `https://restcountries.com/v3.1/region/${el.value}${home_query}`
    if (el.value == 'all') url = `https://restcountries.com/v3.1/all${home_query}`
    else if (el.id=='search-box' && el.value !== '') url = `https://restcountries.com/v3.1/name/${el.value}${home_query}`
    fetch(url)
    .then((res) => {
        if (!res.ok) throw Error(res.status)
        return res.json()
    })
    .then(data => {
        container.innerHTML = ''
        initialise_countries(data)
        countries = document.querySelectorAll('.card')
        card_click()
    })
    .catch(error=>console.log(error))
}

function create_card(country_code, image, name, population, region, capital) {
    return `<div class="card country_card" value="`+country_code+`">
            <img src="`+ image +`" alt="" class="card-img-top">
            <div class="card-body">
                <div class="country-name card-title">`+ name +`</div>
                <div class="population">Population: <span>`+ population.toLocaleString('en-US') +`</span></div>
                <div class="region">Region: <span>`+ region +`</span></div>
                <div class="capital">Capital: <span>`+ capital +`</span></div>
            </div>
        </div>`
}
