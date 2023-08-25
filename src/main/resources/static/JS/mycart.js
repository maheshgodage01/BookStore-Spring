let allItemList = document.getElementById("all-item-list");

let screen = document.getElementById("scroll-bg");
let bodyDisplay = document.getElementById("body");
let EmptyCart = document.getElementById("empty-cart");
let NotLoggedIn = document.getElementById("not-logged-in");

let isCartEmpty = false;

if(!("currentUser" in sessionStorage)){
    screen.style.display="none";
    bodyDisplay.classList.add("background");
    NotLoggedIn.style.display="block"

}
else if(!isCartEmpty){
    if(!isCartEmpty){
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

}
else{
    screen.style.display="none"
    bodyDisplay.classList.add("background");
    EmptyCart.style.display="block";
    NotLoggedIn.style.display="none";
}
window.Amount=0;
if("currentUser" in sessionStorage){
    console.log("currentuser");
    let CurrentUser = sessionStorage.getItem("currentUser");
    fetch("/api/my-cart",{
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
        let Amount = 0;
        Books.forEach(item =>{
            console.log(item.id);
            Amount += addItem(item);
            let TotalAmount = document.getElementById("final-amount");
            let finalAmount = document.createTextNode("₹" + Amount.toFixed(2)+"/-");
            TotalAmount.replaceChild(finalAmount, TotalAmount.childNodes[0]);
        });
    })
    .catch(error => {
        // Handle errors that occurred during the fetch
        console.error('Error:', error);
    });
}



function addItem(item){
    console.log(item);
    if(item == undefined){
        return 0;
    }
    let i= item.id;
    
    let itemList = document.getElementById("all-item-list");

    let OneItem = document.createElement("div");
    OneItem.classList.add("one-item");
    OneItem.setAttribute('id', ""+i);
    OneItem.setAttribute('onmouseover', "editItem(this.id)");
    OneItem.setAttribute('onmouseout', "notEditItem(this.id)");

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("update-delete-btn");

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    // deleteBtn.classList.add(""+i);
    deleteBtn.setAttribute('id', i+"b");
    deleteBtn.setAttribute('onClick', "deleteItem(this.id)");
    let deleteBtnName = document.createTextNode("REMOVE");
    deleteBtn.appendChild(deleteBtnName);
    btnDiv.appendChild(deleteBtn);

    OneItem.appendChild(btnDiv);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("all-items-item");
    let imgSrc = document.createElement("img");
    imgSrc.setAttribute('src',"data:image/jpeg;base64,"+item.bookImage);
    imgContainer.appendChild(imgSrc);
    OneItem.appendChild(imgContainer);


    let priceContainer = document.createElement("div");
    priceContainer.classList.add("price");

    let price = document.createElement("div");
    price.classList.add("item-price");

    let rupee = document.createTextNode("₹");
    let mrpSpan = document.createElement("div");
    mrpSpan.appendChild(rupee);
    // price.appendChild(mrpSpan);

    let priceCalculate = item.price - ((item.price/100)*item.discount);
    let actualPrice = document.createTextNode("₹"+priceCalculate.toFixed(2));

    price.appendChild(actualPrice);
    priceContainer.appendChild(price);

    let mrp = document.createElement("div");
    mrp.classList.add("item-mrp");
    let mrpText = document.createTextNode("MRP");
    mrp.appendChild(mrpText);
    // mrpSpan.innerHTML="₹" + item.MRP;
    let mrpDiv = document.createElement("span");
    mrpDiv.classList.add("item-mrp-line-through");
    // console.log(item.MRP);
    let mrpPrice = item.price;
    let Mrpval = document.createTextNode(mrpPrice);
    mrpDiv.appendChild(Mrpval);

    mrpSpan.appendChild(mrpDiv);

    mrp.appendChild(mrpSpan);
    priceContainer.appendChild(mrp);

    OneItem.appendChild(priceContainer);

    itemList.appendChild(OneItem);

    let ItemListCheckout = document.getElementById("item-list");
    let listItemContainer = document.createElement("li");
    let itemName = document.createElement("span");
    let Book = document.createTextNode(item.title);
    itemName.appendChild(Book);
    listItemContainer.appendChild(itemName);

    let itemAmount = document.createElement("span");
    let Amount = document.createTextNode("₹"+priceCalculate.toFixed(2));
    // Amount.setAttribute('style', "\"font-weight: 600;\"");
    itemAmount.appendChild(Amount);

    listItemContainer.appendChild(Amount);
    ItemListCheckout.appendChild(listItemContainer);

    return priceCalculate;
    // console.log(i);
    // i+=1;
}


function deleteItem(id){
    let elementId = id.slice(0, -1);
    console.log(id);
    // let elementId = parseInt(id);
    console.log(elementId);
    // let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    let CurrentUser = sessionStorage.getItem("currentUser");
    // console.log(CurrentUser);
    // let CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
    // console.log(CurrentUserData);
    let Cart = JSON.parse(localStorage.getItem("Cart"));

    let myCart = Cart[CurrentUser];
    if(myCart.includes(elementId)){

        let index = myCart.indexOf(elementId);
        myCart.splice(index, 1);
        // myCart.remove(elementId);
        console.log("MyCart:"+myCart);
        Cart[CurrentUser] = myCart;
        localStorage.setItem("Cart", JSON.stringify(Cart));
        location.reload();
    }
    else{
        console.log(elementId+":not found");
    }

}

function editItem(id) {
    // let intVal = parseInt(id);
    let oneItem=document.getElementById(id);
    console.log(id);
    // let updateId = id+"a";
    // console.log(updateId);
    let deleteId = id+"b";
    oneItem.style.opacity= "0.9";
    // let updateBtn = document.getElementById(updateId);
    let deleteBtn =  document.getElementById(deleteId);
    // updateBtn.style.display="flex";
    // updateBtn.style.opacity="1";
    deleteBtn.style.display= "flex";
    deleteBtn.style.opacity="1";
}

function notEditItem(id){
    // let intVal = parseInt(id);
    let oneItem=document.getElementById(id);
    // console.log(intVal+1);
    // let updateId = id+"a";
    let deleteId = id+"b";
    // let updateBtn = document.getElementById(updateId);
    let deleteBtn =  document.getElementById(deleteId);
    // updateBtn.style.display="none";
    deleteBtn.style.display= "none";

    oneItem.style.opacity="1";
}





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

function myStorePage(){
    location.assign("my-store");
}
function wishListPage() {
    location.assign("wishlist");
}
function cartPage() {
    location.assign("my-cart")
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
    let carttext = document.createTextNode("Add to Cart");
    cartContainer.appendChild(carttext);
    buyBtnContainer.appendChild(cartContainer);

    let wishlistContainer = document.createElement("button");
    wishlistContainer.classList.add("suggested-add-to-wishlist");
    wishlistContainer.setAttribute('id', i+"d");
    wishlistContainer.setAttribute('onclick', "addToWishlist(this.id)");
    let wishlistIcon = document.createElement("img");
    wishlistIcon.setAttribute('src', "./Resources/Images/heart-icon-pink.png");
    wishlistContainer.appendChild(wishlistIcon);
    buyBtnContainer.appendChild(wishlistContainer);

    mainContainer.appendChild(buyBtnContainer);

    allItemList.appendChild(mainContainer);
}

let logOutBtn = document.getElementById("logout");

logOutBtn.addEventListener("click", ()=>{
    sessionStorage.removeItem("currentUser");
    location.reload();
});


let applyCouponBtn = document.getElementById("apply-coupon-btn");
applyCouponBtn.addEventListener("click", ()=>{
    let couponCode = document.getElementById("coupon-code").value;
    // let Coupons = {
    //     WELCOME: 50,
    //     LUCKY:25,
    //     HELLO:20,
    // };
    // localStorage.setItem("coupons", JSON.stringify(Coupons));
    let allCoupons = JSON.parse(localStorage.getItem("coupons"));
    console.log(allCoupons);

    console.log("Entered");

    if(couponCode in allCoupons){
        let TotalAmount = document.getElementById("final-amount");
        Amount = Amount - ((Amount/100)*allCoupons[couponCode]);
        let finalAmount = document.createTextNode("₹" + Amount.toFixed(2)+"/-");
        TotalAmount.replaceChild(finalAmount, TotalAmount.childNodes[0]);
        delete allCoupons[couponCode];
        localStorage.setItem("coupons", JSON.stringify(allCoupons));
        console.log(allCoupons);
    }
    else{
        location.reload();
    }
    
});

let checkOut = document.getElementById("checkout-btn");
checkOut.addEventListener("click", ()=>{
    console.log(window.Amount.toFixed(2));
    sessionStorage.setItem("TotalAmount", JSON.stringify(Amount));
    location.assign("payment");
});
