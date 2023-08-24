let loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", e=>{
    e.preventDefault();

    validateAccount();
//    getAllUsers();
});

function validateAccount() {
    let username = document.getElementById("mob-num").value;
    let password = document.getElementById("pass").value;

    let userObject = {
        userName : username,
        passWord : password
    }

    fetch("/api/login", {
            method : 'POST',
            body: JSON.stringify(userObject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
        })
        .then(response =>{
        console.log(typeof(response));
            if(response){
                console.log("Success login");
                sessionStore(username);
                location.assign("/");
            }
            else{
                console.log("Login Failed,");
            }
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
}

function sessionStore(username) {
    window.sessionStorage.setItem("currentUser", username);
}
function getAllUsers(){
    let allUserData;
    fetch("/api/login")
        .then(response => {
        if(response.ok){
        return response.json();
        }
        })
        .then(allusers => {
        allUserData=allusers;
        console.log(typeof(allUserData))
        console.log(allusers);
        })
        .catch(error => {
            // Handle errors that occurred during the fetch
            console.error('Error:', error);
        }
    );
}
//getAllUsers();


