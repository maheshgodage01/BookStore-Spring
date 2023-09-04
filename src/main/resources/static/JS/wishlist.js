let profileBtn = document.getElementById("profile");
let loginPopUp = document.getElementById("login-popup");
let profilePopup = document.getElementById("user-popup");

profileBtn.addEventListener("mouseover", profileBtnPopup);
profileBtn.addEventListener("mouseout", closePopup);
loginPopUp.addEventListener("mouseover", popup);
loginPopUp.addEventListener("mouseout", closePopup);
profilePopup.addEventListener("mouseover", popup);
profilePopup.addEventListener("mouseout", closePopup);


let login = false;
function profileBtnPopup(){
    let userName = loginCheck();

    if(userName == null){
        // console.log("null");
        profilePopup.style.display = "none";
        loginPopUp.style.display="flex";
    }
    else {
        console.log("inside");
        loginPopUp.style.display="none";
        profilePopup.style.display = "flex";
    }
}

function popup() {
    if(login){
        loginPopUp.style.display="none";
        profilePopup.style.display = "flex";
    }
    else {
        profilePopup.style.display = "none";
        loginPopUp.style.display="flex";

    }
}

function closePopup() {
    loginPopUp.style.display="none";
    profilePopup.style.display = "none";
}

function loginCheck() {
    let userName = null;
    if("currentUser" in sessionStorage){
        console.log("yes")
        login = true;
        userName = window.sessionStorage.getItem("currentUser");
        let userNameField = document.getElementById("user-profile-profile");
        let contactField = document.getElementById("contact");

        if("UserData" in localStorage){
            let UserData = JSON.parse(localStorage.getItem("UserData"));
            if(userName in UserData){
                let User = Object.assign({}, UserData[userName]);
                // User = UserData.username;
                userNameField.innerHTML=User.FullName;
                contactField.innerHTML=User.Contact;
            }
            
        }
    }

    return userName;
}

// let userProfile = document.getElementById("user-profile");
// userProfile.addEventListener("click", ()=>{
//     location.replace("user-profile")
// });

function myStorePage(){
    location.assign("my-store");
}
function wishListPage() {
    location.assign("wishlist");
}
function cartPage() {
    location.assign("my-cart")
}




let screen = document.getElementById("scroll-bg");
let bodyDisplay = document.getElementById("body");
let EmptyCart = document.getElementById("empty-cart");
let NotLoggedIn = document.getElementById("not-logged-in");



if(!("currentUser" in sessionStorage)){
    screen.style.display="none";
    bodyDisplay.classList.add("background");
    NotLoggedIn.style.display="block"

}
else if(true){

    if(true){
        screen.style.display="flex";
        bodyDisplay.classList.remove("background");
        NotLoggedIn.style.display="none";
        EmptyCart.style.display="none";
    }
    else{
        screen.style.display="none"
        bodyDisplay.classList.add("background");
        EmptyCart.style.display="block";
        NotLoggedIn.style.display="none";

    }
    // screen.style.display="none"
    // bodyDisplay.classList.add("background");
}
else{
    screen.style.display="none"
    bodyDisplay.classList.add("background");
    EmptyCart.style.display="block";
    NotLoggedIn.style.display="none";
}

// ----------------------------------------------------------------------------



if("currentUser" in sessionStorage){
    let CurrentUser = sessionStorage.getItem("currentUser");
        fetch("/api/my-wishlist",{
            method : 'POST',
            body : CurrentUser,
            headers: {
                'Content-Type': 'application/text'
            }
        })
        .then(response => {
            if(response.ok){
            return response.json();
        }
        })
        .then(Books => {
            console.log(Books);
            Books.forEach(item =>{
                console.log(item.id);
                showItem(item);

            });
        })
        .catch(error => {
            // Handle errors that occurred during the fetch
            console.error('Error:', error);
        });





}

function showItem(item){
    let i = item.id;

    if((Object.keys(item)).length == 0){
        return 0;
    }
    let allItemList = document.getElementById("all-items");

    let mainContainer = document.createElement("div");
    mainContainer.classList.add("suggested-item-list");
    mainContainer.setAttribute('id', i);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("suggested-item-img");
    let imgFile = document.createElement("img");
    imgFile.setAttribute('src', "data:image/jpeg;base64,"+item.bookImage);
    imgFile.setAttribute('id', i+"i")
//    imgFile.setAttribute('onclick', "clickedItem(this.id)")
    imgContainer.appendChild(imgFile);
    mainContainer.appendChild(imgContainer);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("suggested-item-prices");
    let itemPrice = document.createElement("div");
    itemPrice.classList.add("suggested-item-price");
    let priceSpan = document.createElement("span");
    priceSpan.setAttribute('id', i+"a");
    let priceCalculate = item.price - ((item.price/100)*item.discount);
    let price= document.createTextNode("₹"+priceCalculate);
    priceSpan.appendChild(price);
    itemPrice.appendChild(priceSpan);
    priceContainer.appendChild(itemPrice);

    let itemMrpContainer = document.createElement("div");
    itemMrpContainer.classList.add("suggested-item-mrp");
    let mrpText = document.createTextNode("MRP");
    itemMrpContainer.appendChild(mrpText);
    let mrpSpan = document.createElement("span");
    mrpSpan.classList.add("suggested-item-mrp-line-through");
    mrpSpan.setAttribute('id', i+"b");
    let mrpValue = document.createTextNode("₹"+item.price);
    mrpSpan.appendChild(mrpValue);
    itemMrpContainer.appendChild(mrpSpan);
    priceContainer.appendChild(itemMrpContainer);

    mainContainer.appendChild(priceContainer);

    let buyBtnContainer = document.createElement("div");
    buyBtnContainer.classList.add("suggested-buy-btn");
    let cartContainer = document.createElement("button");
    cartContainer.classList.add("suggested-add-to-bag");
    cartContainer.setAttribute('id', i+"c");
//    cartContainer.setAttribute("onclick", "addToCart(this.id)");

    if("currentUser" in sessionStorage){
        let CurrentUser = sessionStorage.getItem("currentUser");
        if("Cart" in localStorage){
            let Cart = JSON.parse(localStorage.getItem("Cart"));
            // let myCart = 
            let myCart = Cart[CurrentUser];
            if(myCart.includes(i)){
                console.log("already in Cart");
                let carttext = document.createTextNode("Added to Cart");
                cartContainer.appendChild(carttext);
            }
            else{
                let carttext = document.createTextNode("Add to Cart");
                cartContainer.appendChild(carttext);
            }
           
        }
        else{
            let carttext = document.createTextNode("Add to Cart");
            cartContainer.appendChild(carttext);

        }
    }
    else{
        let carttext = document.createTextNode("Add to Cart");
        cartContainer.appendChild(carttext);
    }
    
    buyBtnContainer.appendChild(cartContainer);

    let wishlistContainer = document.createElement("button");
    wishlistContainer.classList.add("suggested-add-to-wishlist");
    wishlistContainer.setAttribute('id', i+"d");
    wishlistContainer.setAttribute('onclick', "removeFromWishlist(this.id)");
    let wishlistIcon = document.createElement("img");

//    if("currentUser" in sessionStorage){
//        let CurrentUser = sessionStorage.getItem("currentUser");
//        if("Wishlist" in localStorage){
//            let Wishlist = JSON.parse(localStorage.getItem("Wishlist"));
//            // let myCart =
//            let myWishlist = Wishlist[CurrentUser];
//            if(myWishlist.includes(i)){
//                console.log("already in Wishlist");
//                wishlistIcon.setAttribute('src', "Images/heart-icon-filled.png");
//            }
//            else{
//                wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");
//            }
//
//        }
//        else{
//            wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");
//
//        }
//    }
//    else{
//        wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");
//    }
     wishlistIcon.setAttribute('src', "/Images/heart-icon-filled.png");
//     wishlistIcon.setAttribute("onclick", "addToWishlist(this.id)");
    wishlistContainer.appendChild(wishlistIcon);
    buyBtnContainer.appendChild(wishlistContainer);

    mainContainer.appendChild(buyBtnContainer);

    allItemList.appendChild(mainContainer);
}

function removeFromWishlist(id){
    id = parseInt(id);

    let currentUser = sessionStorage.getItem("currentUser");
    let formData = new FormData();
    formData.append("bookId", id);
    formData.append("userName", currentUser);

    fetch("/api/remove-from-wishlist", {
    method : 'POST',
    body : formData
    })
    .then(response => {
        console.log(response);
        console.log("Item removed from wishlist");
    })
    .catch(error => {
        console.error('Error:', error);
    });
    alert("Removed from Wishlist");
    location.reload();
}


let logOutBtn = document.getElementById("logout");

logOutBtn.addEventListener("click", ()=>{
    sessionStorage.removeItem("currentUser");
    location.reload();
});

