var countries;
var home_query = '?fields=cca2,ccn3,cca3,cioc,flags,name,population,region,capital'
var detail_query = '?fields=cca2,ccn3,cca3,cioc,flags,name,population,region,subregion,capital,borders,languages,tld,currencies'
var container = document.getElementById('country-container')
if (window.location.pathname == '/rest-countries-api-with-color-theme-switcher-master/') {
    home_initialise()
}
else {
    retrieve_data()
}

function home_initialise() {
    fetch(`https://restcountries.com/v3.1/all${home_query}`)
    .then((res) => res.json())
    .then(data => {
        console.log(data[10])
        initialise_countries(data)
        details_redirect()
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

function details_redirect() {
    countries.forEach(el => {
        el.addEventListener('click', () => {
            var code = el.getAttribute('value')
            fetch(`https://restcountries.com/v3.1/alpha/${code}${detail_query}`)
            .then((res) => res.json())
            .then(data => {

                store_details(data)
                window.location.href = '/rest-countries-api-with-color-theme-switcher-master/details.html'
            })
        })    
    });
}

function store_details(el) {
    console.log(el)
    localStorage.setItem('country_flag', el['flags']['png'])
    localStorage.setItem('country_name', el['name']['common'])
    var lang_keys = Object.keys(el['name']['nativeName'])
    localStorage.setItem('native_name', el['name']['nativeName'][lang_keys[0]]['common'])
    localStorage.setItem('population', el['population'].toLocaleString('en-US'))
    localStorage.setItem('region', el.region)
    localStorage.setItem('subregion', el.subregion)
    localStorage.setItem('capital', el.capital)
    localStorage.setItem('tld', el['tld'].join(', '))
    // localStorage.setItem('currencies', el['currencies'])
    localStorage.setItem('languages', Object.values(el['languages']).join(', '))
    localStorage.setItem('border', el['borders'])
    var border_countries = localStorage.getItem('border').split(',')
    console.log(border_countries)

}
function retrieve_data() {
    document.querySelector('#details img[alt="country_flag"]').src = localStorage.getItem('country_flag')
    document.querySelector('#details .country_name').innerHTML = localStorage.getItem('country_name')
    document.querySelector('#details .population span').innerHTML = localStorage.getItem('population')
    document.querySelector('#details .native_name span').innerHTML = localStorage.getItem('native_name')
    document.querySelector('#details .region span').innerHTML = localStorage.getItem('region')
    // document.querySelector('#details .subregion span').innerHTML = localStorage.getItem('subregion') ? localStorage.getItem('subregion') : ""
    document.querySelector('#details .languages').innerHTML = localStorage.getItem('languages')
    document.querySelector('#details .capital span').innerHTML = localStorage.getItem('capital')
    document.querySelector('#details .top_level_domain span').innerHTML = localStorage.getItem('tld')
    var border_countries = localStorage.getItem('border').split(',')
    var border_countries_container = document.querySelector('#border_countries h4')
    border_countries.forEach(country => {
        var borderbutton = document.createElement('button')
        borderbutton.innerHTML = country
        border_countries_container.appendChild(borderbutton)
    });
}

function back() {
    window.location.href = '/rest-countries-api-with-color-theme-switcher-master/'
}

function filter(el) {
    fetch(`https://restcountries.com/v3.1/region/${el.value}${home_query}`)
    .then((res) => res.json())
    .then(data => {
        container.innerHTML = ''
        data.forEach(el => {
            var country = document.createElement('div')
            country.classList.add('col')
            var country_code;
            var code = [el.cca2, el.cca3, el.ccn3, el.cioc]
            var i = 0
            while (typeof country_code != 'undefined') {
                country_code = code[i]
            }
            if (el['name']['common'] == 'Pitcairn Islands') {

                console.log(country_code, code)
            }
            country.innerHTML = create_card(country_code, el['flags']['png'], el['name']['common'], el['population'], el.region, el.capital)
            container.appendChild(country)
        });
        countries = document.querySelectorAll('.card')
        details_redirect()
    })
}

function create_card(country_code, image, name, population, region, capital) {
    return `<div class="card country_card" value="`+country_code+`">
            <img src="`+ image +`" alt="" class="card-img-top">
            <div class="card-body">
                <div class="country-name card-title">`+ name +`</div>
                <div class="population">Population: <span>`+ population.toLocaleString('en-US') +`</span></div>
                <div class="region">Region: <span>`+ region +`</span</div>
                <div class="capital">Capital: <span>`+ capital +`</span></div>
            </div>
        </div>`
}