let profileBtn = document.getElementById("profile");
let loginPopUp = document.getElementById("login-popup");
let profilePopup = document.getElementById("user-popup");

profileBtn.addEventListener("mouseover", profileBtnPopup);
profileBtn.addEventListener("mouseout", closePopup);
loginPopUp.addEventListener("mouseover", popup);
loginPopUp.addEventListener("mouseout", closePopup);
profilePopup.addEventListener("mouseover", popup);
profilePopup.addEventListener("mouseout", closePopup);



// window.allBooks = JSON.parse(sessionStorage.getItem("allUserItems"));



let login = false;
function profileBtnPopup(){
    let userName = loginCheck();
    // console.log(typeof(userName));

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
//     location.replace("user-profile.html")
// });

function myStorePage(){
    location.assign("admin.html");
}
function wishListPage() {
    location.assign("wishlist.html");
}
function cartPage() {
    location.assign("mycart.html")
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
else if("Cart" in localStorage){
    let Cart = JSON.parse(localStorage.getItem("Cart"));
    let CurrentUser = sessionStorage.getItem("currentUser");
    if(CurrentUser in Cart){
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
    if("Wishlist" in localStorage){
        let Wishlist = JSON.parse(localStorage.getItem("Wishlist"));
        // let myCart = 
        let myWishlist = Wishlist[CurrentUser];
        let allUserItems = JSON.parse(sessionStorage.getItem("allUserItems"));

        myWishlist.forEach(key => {
            showItem(key, allUserItems[key]);
        });
    }
}

function showItem(i, item){


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
    imgFile.setAttribute('src', item.ImageFile);
    imgFile.setAttribute('id', i+"i")
    imgFile.setAttribute('onclick', "clickedItem(this.id)")
    imgContainer.appendChild(imgFile);
    mainContainer.appendChild(imgContainer);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("suggested-item-prices");
    let itemPrice = document.createElement("div");
    itemPrice.classList.add("suggested-item-price");
    let priceSpan = document.createElement("span");
    priceSpan.setAttribute('id', i+"a");
    let priceCalculate = item.MRP - ((item.MRP/100)*item.Discount);
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
    let mrpValue = document.createTextNode("₹"+item.MRP);
    mrpSpan.appendChild(mrpValue);
    itemMrpContainer.appendChild(mrpSpan);
    priceContainer.appendChild(itemMrpContainer);

    mainContainer.appendChild(priceContainer);

    let buyBtnContainer = document.createElement("div");
    buyBtnContainer.classList.add("suggested-buy-btn");
    let cartContainer = document.createElement("button");
    cartContainer.classList.add("suggested-add-to-bag");
    cartContainer.setAttribute('id', i+"c");
    cartContainer.setAttribute("onclick", "addToCart(this.id)");

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

    if("currentUser" in sessionStorage){
        let CurrentUser = sessionStorage.getItem("currentUser");
        if("Wishlist" in localStorage){
            let Wishlist = JSON.parse(localStorage.getItem("Wishlist"));
            // let myCart = 
            let myWishlist = Wishlist[CurrentUser];
            if(myWishlist.includes(i)){
                console.log("already in Wishlist");
                wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-filled.png");
            }
            else{
                wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
            }
           
        }
        else{
            wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");

        }
    }
    else{
        wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
    }
    // wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
    // wishlistIcon.setAttribute("onclick", "addToWishlist(this.id)");
    wishlistContainer.appendChild(wishlistIcon);
    buyBtnContainer.appendChild(wishlistContainer);

    mainContainer.appendChild(buyBtnContainer);

    allItemList.appendChild(mainContainer);
}

function removeFromWishlist(id){
    let key = id.slice(0, -1);
    let Wishlist = JSON.parse(localStorage.getItem("Wishlist"));
    let imgNode = document.getElementById(id).childNodes[0];
    let CurrentUser = sessionStorage.getItem("currentUser");
    console.log(imgNode.getAttribute('src'))
            // let myCart = 
    let myWishlist = Wishlist[CurrentUser];
    if(myWishlist.includes(key)){
        console.log(myWishlist);
        let index = myWishlist.indexOf(key);
        myWishlist.splice(index, 1);
        Wishlist[CurrentUser] = myWishlist;
        console.log(myWishlist);
        localStorage.setItem("Wishlist",JSON.stringify(Wishlist));
        console.log("removed from wishlist");
        imgNode.setAttribute('src', "./Resources/Images/heart-icon-pink.png")
    }
    location.reload();
}


let logOutBtn = document.getElementById("logout");

logOutBtn.addEventListener("click", ()=>{
    sessionStorage.removeItem("currentUser");
    location.reload();
});