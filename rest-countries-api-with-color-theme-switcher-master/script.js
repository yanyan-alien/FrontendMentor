var countries;
var test;
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
            .then(el => {
                var border_countries = []
                if (el['borders'].length > 0) {
                    for (let i = 0; i < el['borders'].length; i++) {
                        fetch(`https://restcountries.com/v3.1/alpha/${el['borders'][i]}?fields=name`)
                        .then((res) => res.json())
                        .then(data => {
                            border_countries.push(data['name']['common'])
                            localStorage.setItem('border_countries', JSON.stringify(border_countries))
                        })                
                    }
                }
                else localStorage.setItem('border_countries', JSON.stringify(border_countries))
                localStorage.setItem('country_data', JSON.stringify(el))
            })
            fetchdetails(code)
        })    
    });
}
function fetchdetails(code) {
    fetch(`https://restcountries.com/v3.1/alpha/${code}${detail_query}`)
    .then((res) => res.json())
    .then(el => {
        var border_countries = []
        if (el['borders'].length > 0) {
            for (let i = 0; i < el['borders'].length; i++) {
                fetch(`https://restcountries.com/v3.1/alpha/${el['borders'][i]}?fields=name`)
                .then((res) => res.json())
                .then(data => {
                    border_countries.push(data['name']['common'])
                    localStorage.setItem('border_countries', JSON.stringify(border_countries))
                })                
            }
        }
        else localStorage.setItem('border_countries', JSON.stringify(border_countries))
        localStorage.setItem('country_data', JSON.stringify(el))
        if (githubpages) window.location.href = '/FrontendMentor/rest-countries-api-with-color-theme-switcher-master/details.html'
        else window.location.href = '/rest-countries-api-with-color-theme-switcher-master/details.html'
        
    })
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
        var border_countries_container = document.querySelector('#border_countries h4')
        border_countries.forEach(country => {
            var borderbutton = document.createElement('button')
            borderbutton.innerHTML = country
            borderbutton.classList.add('btn', 'custom-btn')
            borderbutton.value = el['borders'][i]
            i++
            border_countries_container.appendChild(borderbutton)
            borderbutton.addEventListener('click', ()=>{
                fetchdetails(borderbutton.value)
            })
        });
    }
}

function filter(el) {
    var url = `https://restcountries.com/v3.1/region/${el.value}${home_query}`
    if (el.value == 'all') {
        url = `https://restcountries.com/v3.1/all${home_query}`
    }
    fetch(url)
    .then((res) => res.json())
    .then(data => {
        container.innerHTML = ''
        initialise_countries(data)
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