/* GLOBAL VARIABLES */
var plan = ''
var planmonthly = true
var chosen_add_on = []


/* BUTTONS FOR NEXT AND PREVIOUS (START)*/
function nextbutton(el) {
    var tabpane = el.closest('.form-tab')
    var id = tabpane.id
    var next = true
    // console.log(id)
    switch (id) {
        case 'form-tab-1':
            next = validateStepOne()   
            break;
        case 'form-tab-2':
            storeStepThree()
            break;
        case 'form-tab-3':
            populateDataForStepFour()
        default:
            break;
    }
    if (next) {
        var tabpane_id = tabpane.id.split('-')
        var current_number = tabpane_id[2]
        tabpane_id[2] = parseInt(tabpane_id[2]) + 1
        var nextid = tabpane_id.join('-')
        var next_tabpane = document.getElementById(nextid)
        var cur_circle = document.querySelector('.step' + current_number + ' .step-circle')
        if (tabpane_id[2] != '5') {
            var next_circle = document.querySelector('.step' + tabpane_id[2] + ' .step-circle')
            next_circle.classList.add('active')
            cur_circle.classList.remove('active')
        }
        
        tabpane.classList.remove('active')
        next_tabpane.classList.add('active')
    }
}
function backbutton(el) {
    var tabpane = el.closest('.form-tab')
    var tabpane_id = tabpane.id.split('-')
    var current_number = tabpane_id[2]
    tabpane_id[2] = parseInt(tabpane_id[2]) - 1
    var nextid = tabpane_id.join('-')
    var next_tabpane = document.getElementById(nextid)
    tabpane.classList.remove('active')
    next_tabpane.classList.add('active')

    var cur_circle = document.querySelector('.step' + current_number + ' .step-circle')
    var prev_circle = document.querySelector('.step' + tabpane_id[2] + ' .step-circle')
    
    cur_circle.classList.remove('active')
    prev_circle.classList.add('active')

}
/* BUTTONS FOR NEXT AND PREVIOUS (END)*/

/* BUTTONS FOR CHANGE (CHANGE)*/
function changebutton(el) {
    var tabpane4 = document.getElementById('tab-pane-4')
    var tabpane2 = document.getElementById('tab-pane-2')

    var cur_circle = document.querySelector('.step' + 4 + ' .step-circle')
    var prev_circle = document.querySelector('.step' + 2 + ' .step-circle')

    tabpane4.classList.remove('active')
    cur_circle.classList.remove('active')  
    
    tabpane2.classList.remove('active')
    prev_circle.classList.remove('active')
}
/* BUTTONS FOR CHANGE (END)*/

/* VALIDATE STEP 1 (START)*/
// RETURN BOOLEAN VALUES
function validateStepOne() {
    steponeinputs = [document.getElementById('formname'),
    document.getElementById('formemail'),
    document.getElementById('formphone')]
    correct = true

    steponeinputs.forEach(el => {
        // console.log(el.id)
        if (el.value == "") {
            el.classList.add('error')
            document.querySelector('span.' + el.id).classList.add('show')
            correct = false
        }
        else {
            el.classList.remove('error')
            document.querySelector('span.' + el.id).classList.remove('show')
        }
    });
    return correct
}
/* VALIDATE STEP 1 (END)*/

/* VALIDATE STEP 2 (START)*/
// RETURN BOOLEAN VALUES
function validateStepTwo(params) {
    return true 
}
function planbutton() {
    var buttons = document.querySelectorAll('.col.plan button')
    var buttons_arr = Array.from(buttons)
    buttons.forEach(el => {
        var index = buttons_arr.indexOf(el)
        el.addEventListener('click', () => {
            plan = el.id
            el.classList.add('active')
            var other_buttons = [...buttons]
            other_buttons.splice(index, 1)
            // console.log(other_buttons)
            other_buttons.forEach(element => {
                element.classList.remove('active')
            });
        })
    });
}
planbutton()
function checkplan(el) {
    var yearly = ['$90/yr', '$120/yr', '$150/yr']
    var monthly = ['$9/mo', '$12/mo', '$15/mo']

    var check = el.checked
    // console.log(check)
    
    const additional = document.querySelectorAll('.plan-additional')

    if (check) {
        text = document.getElementById('yearly')
        other_text = document.getElementById('monthly')
        planmonthly = false
        additional.forEach(element => {
            element.classList.add('active')
        });
        var chosen = yearly
    }
    else {
        text = document.getElementById('monthly')
        other_text = document.getElementById('yearly')
        planmonthly = true
        additional.forEach(element => {
            element.classList.remove('active')
        });
        var chosen = monthly

    }
    const price = document.querySelectorAll('.plan-price')
    for (i=0; i<3; i++) {
        price[i].innerHTML = chosen[i]
    }
    text.classList.add('chosen-plan')
    other_text.classList.remove('chosen-plan')
}
/* VALIDATE STEP 2 (END)*/

/* DISPLAY STEP 3 YEARLY AND MONTHLY (START)*/
function storeStepThree(params) {
    var yearly = ['+10/yr', '+$20/yr', '+$20/yr']
    var monthly = ['+$1/mo', '+$2/mo', '+$2/mo']
    const add_ons = document.querySelectorAll('.add-on-price')

    var chosen = planmonthly ? monthly : yearly

    for (i=0; i<add_ons.length; i++) {
        add_ons[i].innerHTML = chosen[i]
        // console.log(chosen[i])
    }
}
/* DISPLAY STEP 3 (END)*/

/* POPULATE DATA FOR STEP 4 (START)*/
function populateDataForStepFour() {
    var yearlyplan = {'Arcarde':'$90/yr', 'Advanced':'$120/yr', 'Pro':'$150/yr'}
    var monthlyplan = {'Arcade':'$9/mo', 'Advanced':'$12/mo', 'Pro':'$15/mo'}

    var yearly = ['+10/yr', '+$20/yr', '+$20/yr']
    var monthly = ['+$1/mo', '+$2/mo', '+$2/mo']

    var chosenplanperiod = planmonthly ? monthlyplan : yearlyplan
    var price = planmonthly ? monthly : yearly
    var plantitle = planmonthly ? plan + ' (Monthly)' :plan + ' (Yearly)' 
    document.querySelector('#plan-name').innerHTML = plantitle
    document.querySelector('.final-plan-price').innerHTML = chosenplanperiod[plan]
    const parent = document.getElementById('final_add_on_container')
    parent.innerHTML = ''
    chosen_add_on.forEach(el => {
        switch (el) {
            case 'online-service':
                var title = 'Online Service'
                var add_on_price = price[0]
                break;
    
            case 'larger-storage':
                var title = 'Larger Storage'
                var add_on_price = price[1]
                break
            case 'customizable-profile':
                var title = 'Customizable Profile'
                var add_on_price = price[2]
            default:
                break;
        }
        var final_add_on = document.createElement('div')

        final_add_on.innerHTML = '<span class="add-on-title">' + title + '</span><span class="final-add-on-price">' + add_on_price + '</span>'
        final_add_on.classList.add('d-flex', 'final-add-on')
        console.log(final_add_on)
        parent.appendChild(final_add_on)
    });

}
/* POPULATE DATA FOR STEP 4 (END)*/

/* CLICK ADD ON (START)*/
function addonclick(event) {
    var add_on = ""
    if (this.hasAttribute('type')) {
        var checkbox = this
        // console.log(checkbox)
        add_on = this.name
    }
    else {
        checkbox = this.querySelector('input')
        add_on = this.id
        
    }
    var index = chosen_add_on.indexOf(add_on)
    if (index == -1) {
        chosen_add_on.push(add_on)
    }
    else {
        chosen_add_on.splice(index, 1)
    }
    // console.log(chosen_add_on)
    checkbox.checked = !checkbox.checked
    this.classList.toggle('active')
}

const add_ons = document.querySelectorAll('.add-on-container')
const add_ons_checkbox = document.querySelectorAll('.add-on-container input')

// add_ons_checkbox.addEventListener('click', addonclick)
add_ons.forEach(element => {
    element.addEventListener('click', addonclick)
});
add_ons_checkbox.forEach(element => {
    element.addEventListener('click', addonclick)
});