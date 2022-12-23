var countries;
var test;
var home_query = '?fields=cca2,ccn3,cca3,cioc,flags,name,population,region,capital'
var detail_query = '?fields=cca2,ccn3,cca3,cioc,flags,name,population,region,subregion,capital,borders,languages,tld,currencies'
var container = document.getElementById('country-container')
if (window.location.pathname.includes('details')) {
    retrieve_data()
}
else {
    home_initialise()
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
    localStorage.setItem('country_data', JSON.stringify(el))
}
function retrieve_data() {
    el = JSON.parse(localStorage.getItem('country_data'))
    test = el
    console.log(el)
    var lang_keys = Object.keys(el['name']['nativeName'])

    document.querySelector('#details img[alt="country_flag"]').src = el['flags']['png']
    document.querySelector('#details .country_name').innerHTML = el['name']['common']
    document.querySelector('#details .population span').innerHTML = el['population'].toLocaleString('en-US')
    document.querySelector('#details .native_name span').innerHTML = el['name']['nativeName'][lang_keys[0]]['common']
    document.querySelector('#details .region span').innerHTML = el.region
    document.querySelector('#details .sub_region span').innerHTML = el['subregion']
    document.querySelector('#details .languages span').innerHTML = Object.values(el['languages']).join(', ')
    document.querySelector('#details .capital span').innerHTML = el.capital
    document.querySelector('#details .top_level_domain span').innerHTML = Object.values(el['tld']).join(', ')
    if (el['borders'].length > 0) {
        var border_countries = el['borders'].split(',')
        var border_countries_container = document.querySelector('#border_countries h4')
        border_countries.forEach(country => {
            var borderbutton = document.createElement('button')
            borderbutton.innerHTML = country
            border_countries_container.appendChild(borderbutton)
        });

    }
}

function back() {
    window.location.href = '/rest-countries-api-with-color-theme-switcher-master/'
}
document.getElementById('theme-switcher').addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark')
})

function filter(el) {
    fetch(`https://restcountries.com/v3.1/region/${el.value}${home_query}`)
    .then((res) => res.json())
    .then(data => {
        container.innerHTML = ''
        data.forEach(el => {
            var country = document.createElement('div')
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
        details_redirect()
    })
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