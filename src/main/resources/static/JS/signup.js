
let contactError = document.getElementById("contact-error");
let nameError = document.getElementById("name-error");
let emailError = document.getElementById("email-error");
let altContactError = document.getElementById("alt-contact-error");


let signUpForm = document.getElementById("signup-form");
let passForm = document.getElementById("pass-form");


let isContactValid = false;
let isNameValid = false;
let isEmailValid = true;
let isAltContactValid = true;

signUpForm.addEventListener("submit", e => {
    e.preventDefault();
    let username = document.getElementById("mob-num").value;
    checkUser(username);

});
// passFieldTwo.addEventListener("onclick", validatePassOne);

function checkUser(username){
    fetch("/api/check-user",{
        method : 'POST',
        body : username,
        headers: {
            'Content-Type': 'application/text'
        }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
    })
    .then(response =>{
    console.log("UserCheck : "+response);
        if(response){
            alert("User "+username+" Already Exist!! LOGIN");
            location.reload();
        }else{
            if (validateSignUpForm()){
                document.getElementById("signup-form").style.display="none";
                document.getElementById("pass-form").style.display="flex";
            }else {
                document.getElementById("signup-form").style.display="flex";
                document.getElementById("pass-form").style.display="none";
            }
        }
    })
    .catch(error => {
        console.error('Error submitting data:', error);
    });

}

passForm.addEventListener("submit", f =>{
    console.log(" function called");
    f.preventDefault();
    console.log("validate function called");
    if(validatePass()){
        console.log("storedata function called");
        storeData();
    }

    
});

function setError(idElement, errorMessage){
    idElement.style.display="flex";
    idElement.innerHTML(errorMessage);
}

function validateSignUpForm() {
    let returnValueContact = true;
    let returnValueName = true;
    let returnValueEmail = true;
    let returnValueAltContact = true;

    if(isContactValid){
        returnValueContact = true;
    }
    else{
        contactError.style.display = "flex";
        returnValueContact = false;
    }
    if(isNameValid){
        returnValueName = true;
    }
    else{
        nameError.style.display = "flex";
        returnValueName = false;
    }

    if(isEmailValid) {
        returnValueEmail= true;
    }
    else{
        emailError.style.display="flex";
        returnValueEmail=false;
    }

    if(isAltContactValid) {
        returnValueAltContact = true;
    }
    else{
        altContactError.style.display="flex";
        returnValueAltContact = false;
    }


    if(returnValueContact && returnValueEmail && returnValueName && returnValueAltContact) {
        if("UserData" in localStorage){
            let UserData = JSON.parse(localStorage.getItem("UserData"));
            let username = document.getElementById("mob-num").value;
            if(username in UserData){
                alert("Account Already Exist, LOGIN");
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
        
    }
    else {
        return false;
    }

}

let validateContact = document.getElementById("mob-num");
let validateName = document.getElementById("full-name");
let validateEmail = document.getElementById("email");
let validateAltContact = document.getElementById("alt-mob-num");

validateContact.onblur = function() {
    let contact = validateContact.value;
    if(contact.length != 10 ){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
        isContactValid = true;
    }
}

validateName.onfocus = function() {
    if (validateContact.value.length == 0 || validateContact.value.length != 10){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
    }
}

validateName.onblur = function() {
    let name = validateName.value;
    if(name.length == 0 ){
        document.getElementById("name-error").style.display = "flex";
    }
    else {
        document.getElementById("name-error").style.display = "none";
        isNameValid = true;
    }
}

validateEmail.onfocus = function() {
    if (validateContact.value.length == 0){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
    }

    if(validateName.value.length == 0 ){
        document.getElementById("name-error").style.display = "flex";
    }
    else {
        document.getElementById("name-error").style.display = "none";
    }
}

validateEmail.onblur = function() {
    let email = validateEmail.value;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length != 0){
        if(!email.match(mailformat)){
            document.getElementById("email-error").style.display = "flex";
        }
        else{
            document.getElementById("email-error").style.display = "none";
        }
    }
    else{
        document.getElementById("email-error").style.display = "none";
        isEmailValid = true;
    }
    
}

validateAltContact.onfocus = function() {
    if (validateContact.value.length == 0){
        document.getElementById("contact-error").style.display = "flex";
    }
    else {
        document.getElementById("contact-error").style.display = "none";
    }

    if(validateName.value.length == 0 ){
        document.getElementById("name-error").style.display = "flex";
    }
    else {
        document.getElementById("name-error").style.display = "none";
    }

    let email = validateEmail.value;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length != 0){
        if(!email.match(mailformat)){
            document.getElementById("email-error").style.display = "flex";
        }
        else{
            document.getElementById("email-error").style.display = "none";
        }
    }
    else{
        document.getElementById("email-error").style.display = "none";
    }
}

validateAltContact.onblur = function() {
    if(validateAltContact.value.length != 0) {
        altContactError.style.display = "flex";
    }
    else {
        altContactError.style.display= "none";
        isAltContactValid = true;
    }
}








// ------------------------------------------------------------------


let isPassOneValid = false;


function validatePass() {
    let passFieldOne = document.getElementById("pass-field-one");
    let passFieldTwo = document.getElementById("pass-field-two");
    let returnValue = false;
    let passError1 = document.getElementById("pass-error1");
    let passError2 = document.getElementById("pass-error2");

    
    if (passFieldOne.value.length == 0) {
        passError1.innerHTML = "Enter Password";
        passError2.innerHTML="";

        return false;
    }else{
        passError1.innerHTML = "";
        if(passFieldOne.value != passFieldTwo.value) {
            passError2.innerHTML="Password Doesn't Match";
            returnValue = false;
        }
        else{
            passError2.innerHTML="";
            let contactNum = document.getElementById("mob-num").value;
            return true;
        }
    }
    return false;
}

function storeData() {
    let contactNum = document.getElementById("mob-num").value;
    let name = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let altContact = document.getElementById("alt-mob-num").value;

    let password = document.getElementById("pass-field-one").value;
    let UserDataObject = {};

    const myObj = {
        contactNumber : contactNum,
        fullName : name,
        emailId : email,
        alternateContact : altContact,
        password : password
    }
    console.log(myObj);

    fetch("/api/signup", {
        method : 'POST',
        body: JSON.stringify(myObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response =>{
        console.log('Response:', response)
    })
    .catch(error => {
        console.error('Error submitting data:', error);
    });
    console.log("Success signup");
    sessionStorage.setItem("currentUser", contactNum);
    location.assign("/");


}
