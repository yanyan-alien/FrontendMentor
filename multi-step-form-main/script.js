/* GLOBAL VARIABLES */
var plan = ''
var planmonthly = true
var onlineservices = false
var largerstorage = false
var customizableprofile = false


/* BUTTONS FOR NEXT AND PREVIOUS (START)*/
function nextbutton(el) {
    var tabpane = el.closest('.form-tab')
    var tabpane_id = tabpane.id.split('-')
    tabpane_id[2] = parseInt(tabpane_id[2]) + 1
    var nextid = tabpane_id.join('-')
    var next_tabpane = document.getElementById(nextid)
    tabpane.classList.remove('active')
    next_tabpane.classList.add('active')
}
function backbutton(el) {
    var tabpane = el.closest('.form-tab')
    var tabpane_id = tabpane.id.split('-')
    tabpane_id[2] = parseInt(tabpane_id[2]) - 1
    var nextid = tabpane_id.join('-')
    var next_tabpane = document.getElementById(nextid)
    tabpane.classList.remove('active')
    next_tabpane.classList.add('active')
}
/* BUTTONS FOR NEXT AND PREVIOUS (START)*/

/* VALIDATE STEP 1 (START)*/
// RETURN BOOLEAN VALUES
function validateStepOne(params) {
    return true 
}
/* VALIDATE STEP 1 (END)*/

/* VALIDATE STEP 2 (START)*/
// RETURN BOOLEAN VALUES
function validateStepTwo(params) {
    return true 
}
/* VALIDATE STEP 2 (END)*/

/* STORE AND DISPLAY STEP 3 YEARLY AND MONTHLY (START)*/
function storeStepThree(params) {
}
/* STORE STEP 3 (END)*/

/* POPULATE DATA FOR STEP 4 (START)*/
function populateDataForStepFour(params) {
    
}
/* POPULATE DATA FOR STEP 4 (END)*/

/* CLICK ADD ON (START)*/
function clickAddOn(el) {
    console.log('in click add on')
    var checkbox = el.querySelector('input')
    console.log(checkbox, checkbox.checked)
    checkbox.checked = !checkbox.checked
}