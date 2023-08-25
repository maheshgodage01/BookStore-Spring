let profileBtn = document.getElementById("profile");
let loginPopUp = document.getElementById("login-popup");
let profilePopup = document.getElementById("user-popup");

profileBtn.addEventListener("mouseover", profileBtnPopup);
profileBtn.addEventListener("mouseout", closePopup);
loginPopUp.addEventListener("mouseover", popup);
loginPopUp.addEventListener("mouseout", closePopup);
profilePopup.addEventListener("mouseover", popup);
profilePopup.addEventListener("mouseout", closePopup);


window.CartItems;

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
let userProfile = document.getElementById("user-profile");
userProfile.addEventListener("click", ()=>{
    location.replace("user-profile")
})


let currentUser = sessionStorage.getItem("currentUser");
    fetch("/api/get-all-cart",{
            method : 'POST',
            body : currentUser,
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
            sessionStorage.setItem("myCart", JSON.stringify(Books));
        })
        .catch(error => {
            // Handle errors that occurred during the fetch
            console.error('Error:', error);
        });



fetch("/all-books",{
    method : 'POST'
    })
    .then(response => {
    if(response.ok){
    return response.json();
    }
    })
    .then(Books => {

    Books.forEach(item =>{
        console.log(item);
        showItem(item);
    });
    })
    .catch(error => {
        // Handle errors that occurred during the fetch
        console.error('Error:', error);
    });




function showItem(item){
    let id = item.id;
    let clickedItem = sessionStorage.getItem("clickedItem");
    if(id == clickedItem){
        return;
    }

    if((Object.keys(item)).length == 0){
        return 0;
    }
    let allItemList = document.getElementById("all-items");

    let mainContainer = document.createElement("div");
    mainContainer.classList.add("suggested-item-list");
//    mainContainer.setAttribute('id', i);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("suggested-item-img");
    let imgFile = document.createElement("img");
    imgFile.setAttribute('src', "data:image/jpeg;base64,"+item.bookImage);
    imgFile.setAttribute('id', id)
    imgFile.setAttribute('onclick', "clickedItem(this.id)")
    imgContainer.appendChild(imgFile);
    mainContainer.appendChild(imgContainer);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("suggested-item-prices");
    let itemPrice = document.createElement("div");
    itemPrice.classList.add("suggested-item-price");
    let priceSpan = document.createElement("span");
    priceSpan.setAttribute('id', id+"a");
    let priceCalculate = item.price - ((item.price/100)*item.discount);
    let price= document.createTextNode("₹"+priceCalculate.toFixed(2));
    priceSpan.appendChild(price);
    itemPrice.appendChild(priceSpan);
    priceContainer.appendChild(itemPrice);

    let itemMrpContainer = document.createElement("div");
    itemMrpContainer.classList.add("suggested-item-mrp");
    let mrpText = document.createTextNode("MRP");
    itemMrpContainer.appendChild(mrpText);
    let mrpSpan = document.createElement("span");
    mrpSpan.classList.add("suggested-item-mrp-line-through");
    mrpSpan.setAttribute('id', id+"b");
    let mrpValue = document.createTextNode("₹"+item.price);
    mrpSpan.appendChild(mrpValue);
    itemMrpContainer.appendChild(mrpSpan);
    priceContainer.appendChild(itemMrpContainer);

    mainContainer.appendChild(priceContainer);

    let buyBtnContainer = document.createElement("div");
    buyBtnContainer.classList.add("suggested-buy-btn");
    let cartContainer = document.createElement("button");
    cartContainer.classList.add("suggested-add-to-bag");
    cartContainer.setAttribute('id', id+"c");
    cartContainer.setAttribute("onclick", "addToCart(this.id)");

    if("currentUser" in sessionStorage){
        let CurrentUser = sessionStorage.getItem("currentUser");
        let Books = sessionStorage.getItem("myCart");
        console.log(Books);
        if(Books.includes(id)){
            let carttext = document.createTextNode("Added to Cart");
            cartContainer.appendChild(carttext);
        }
        else{
            let carttext = document.createTextNode("Add to Cart");
            cartContainer.appendChild(carttext);
        }

    }
    else{
        let carttext = document.createTextNode("Added to Cart");
        cartContainer.appendChild(carttext);
    }

    
    buyBtnContainer.appendChild(cartContainer);

    let wishlistContainer = document.createElement("button");
    wishlistContainer.classList.add("suggested-add-to-wishlist");
    wishlistContainer.setAttribute('id', id+"d");
    wishlistContainer.setAttribute('onclick', "addToWishlist(this.id)");
    let wishlistIcon = document.createElement("img");

    if("currentUser" in sessionStorage){
        let CurrentUser = sessionStorage.getItem("currentUser");
        if("Wishlist" in localStorage){
            let Wishlist = JSON.parse(localStorage.getItem("Wishlist"));
            
            if(CurrentUser in Wishlist){
                let myWishlist = Wishlist[CurrentUser];
                if(myWishlist.includes(i)){
                    console.log("already in Wishlist");
                    wishlistIcon.setAttribute('src', "Images/heart-icon-filled.png");
                }
                else{
                    wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");
                }
            }
            else{
                wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");
            }
           
        }
        else{
            wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");

        }
    }
    else{
        wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");
    }
    // wishlistIcon.setAttribute('src', "Images/heart-icon-pink.png");
    // wishlistIcon.setAttribute("onclick", "addToWishlist(this.id)");
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

let myStore = document.getElementById("my-store");
let wishList = document.getElementById("wishlist");
let cart = document.getElementById("cart");

// myStore.addEventListener("click", myStorePage);
// wishList.addEventListener("click", )

function myStorePage(){
    location.assign("my-store");
}
function wishListPage() {
    location.assign("wishlist");
}
function cartPage() {
    location.assign("my-cart")
}

function addToCart(id) {
    let addToCartBtn = document.getElementById(id);
    id = parseInt(id);

    if(addToCartBtn.innerHTML == "ADDED TO CART"){
        alert("Already in cart");
        return;
    }
    let currentUser = sessionStorage.getItem("currentUser");
    let formData = new FormData();
    formData.append("bookId", id);
    formData.append("userId", currentUser)

    fetch("/api/add-to-cart",{
        method : 'POST',
        body : formData,
    })
    .then(response => {
        return response.json()
    })
    .then(response => {
    console.log(response);
        if(response){
            addToCartBtn.innerHTML = "ADDED TO CART";
            console.log("added to cart");
        }
        else{
        alert("Already in Cart");
        }
    })
    .catch(error => {
        console.error('Error submitting data:', error);
    });

}

function addToWishlist(id){
    let imgNode = document.getElementById(id).childNodes[0];
    id = parseInt(id);
    let addToCartBtn = document.getElementById(id);


//    if(imgNode.innerHTML == "ADDED TO CART"){
//        alert("Already in cart");
//        return;
//    }
    let currentUser = sessionStorage.getItem("currentUser");
    let formData = new FormData();
    formData.append("bookId", id);
    formData.append("userId", currentUser)

    fetch("/api/add-to-wishlist",{
        method : 'POST',
        body : formData,
    })
    .then(response => {
        console.log(response);
        if(response){
            addToCartBtn.innerHTML = "ADDED TO CART";
            console.log("added to wishlist");
        }
        else{
            alert("Already in Cart!!");
        }
    })
    .catch(error => {
        console.error('Error submitting data:', error);
    });
}

function clickedItem(id){
    sessionStorage.setItem("clickedItem", id);

    console.log("clicked id:"+id);
    let formData = new FormData();
    formData.append("id", id);

    fetch("/api/get-book",{
        method : 'POST',
        body : formData,
    })
    .then(response => {
        if(response.ok){
        return response.json();
    }
    })
    .then(Book => {
        console.log(Book);
        addClickedItem(Book);
    });

}

function addClickedItem(item){
    let i = item.id;
    if(i==undefined){
        return 0;
    }
    // let key = i.slice(0, -1);
    // sessionStorage.setItem("clickedItem", key)

    console.log(item);
    let mainBook = document.getElementById("one-book");
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("clicked-book");
    let key = item.id;

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("item-elements");
    let imgFile = document.createElement("img");
    imgFile.setAttribute('src', "data:image/jpeg;base64,"+item.bookImage);
    imgFile.setAttribute('width', "250px");
    imgContainer.appendChild(imgFile);
    mainContainer.appendChild(imgContainer);

    let bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");
    bookDetails.classList.add("item-elements");

    let bookNameDiv = document.createElement("div");
    bookNameDiv.classList.add("book-name");
    let bookName = document.createTextNode(item.title);
    bookNameDiv.appendChild(bookName);
    bookDetails.appendChild(bookNameDiv);

    let bookDetailsOther = document.createElement("div");
    bookDetailsOther.setAttribute('style', "display: flex; flex-direction: row;");

    let authorDescription = document.createElement("div");
    authorDescription.classList.add("item-elements");
    let authorNameDiv = document.createElement("div");
    authorNameDiv.classList.add("author");
    let authorName = document.createTextNode("AUTHOR:"+item.authorName);
    authorNameDiv.appendChild(authorName);
    authorDescription.appendChild(authorNameDiv);
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("book-description");
    let bookDescription = document.createTextNode(item.description);
    descriptionDiv.appendChild(bookDescription);
    authorDescription.appendChild(descriptionDiv);
    bookDetailsOther.appendChild(authorDescription);

    let purchaseContainer = document.createElement("div");
    purchaseContainer.classList.add("price-index");

    let priceDiv = document.createElement("div");
    priceDiv.classList.add("price-price-index");
    let priceCalculate = item.price - ((item.price/100)*item.discount);
    let price = document.createTextNode("₹"+priceCalculate);
    priceDiv.appendChild(price);
    purchaseContainer.appendChild(priceDiv);

    let priceDiscount = document.createElement("div");
    priceDiscount.classList.add("price-discount1");
    let discountDiv = document.createElement("div");
    discountDiv.classList.add("off");
    let off = document.createTextNode("("+item.discount+"%OFF)");
    discountDiv.appendChild(off);
    priceDiscount.appendChild(discountDiv);
    let mrpDiv = document.createElement("div");
    mrpDiv.classList.add("mrp");
    let mrpPrice = document.createElement("s");
    let mrpPriceS = document.createTextNode("₹"+item.price);
    mrpPrice.appendChild(mrpPriceS);
    let mrp = document.createTextNode("MRP");
    mrpDiv.appendChild(mrp);
    mrpDiv.appendChild(mrpPrice);
    priceDiscount.appendChild(mrpDiv);

    purchaseContainer.appendChild(priceDiscount);

    let buyBtn = document.createElement("div");
    let addToCart = document.createElement("button");
    addToCart.setAttribute('id', key+"d")
    addToCart.setAttribute('onclick', "addToCart(this.id)")
    addToCart.classList.add("add-to-cart-btn");

    if("currentUser" in sessionStorage){
        let CurrentUser = sessionStorage.getItem("currentUser");
        if("Cart" in localStorage){
            let Cart = JSON.parse(localStorage.getItem("Cart"));
            // let myCart =
            let myCart = Cart[CurrentUser];
            if(!(myCart==undefined)){
                if(myCart.includes(key)){
                    console.log("already in Cart");
                    let btnName = document.createTextNode("ADDED TO CART");
                    addToCart.appendChild(btnName);
                }
                else{
                    let btnName = document.createTextNode("ADD TO CART");
                    addToCart.appendChild(btnName);
                }
            }
            else{
                let btnName = document.createTextNode("ADD TO CART");
                addToCart.appendChild(btnName);
            }

        }
        else{
            let btnName = document.createTextNode("ADD TO CART");
            addToCart.appendChild(btnName);

        }
    }
    else{
        let btnName = document.createTextNode("ADD TO CART");
        addToCart.appendChild(btnName);
    }

    buyBtn.appendChild(addToCart);
    let addToWishlist = document.createElement("button");
    addToWishlist.classList.add("main-suggested-add-to-wishlist");
    let wishlistBtn = document.createElement("img");
    addToWishlist.setAttribute('id',key+"c");
    addToWishlist.setAttribute("onclick", "addToWishlist(this.id)");

    if("currentUser" in sessionStorage){
        let CurrentUser = sessionStorage.getItem("currentUser");
        if("Wishlist" in localStorage){
            let Wishlist = JSON.parse(localStorage.getItem("Wishlist"));
            // let myCart =
            let myWishlist = Wishlist[CurrentUser];
            if(!(myWishlist==undefined)){
                if(myWishlist.includes(key)){
                    console.log("already in Wishlist");
                    wishlistBtn.setAttribute('src',"Images/heart-icon-filled.png");            }
                else{
                    wishlistBtn.setAttribute('src',"Images/heart-icon-pink.png");            }
            }
            else{
                wishlistBtn.setAttribute('src',"Images/heart-icon-pink.png");            }
        }
        else{
            wishlistBtn.setAttribute('src',"Images/heart-icon-pink.png");
        }
    }
    else{
        wishlistBtn.setAttribute('src',"Images/heart-icon-pink.png");
    }
    // wishlistBtn.setAttribute('src',"Images/heart-icon-pink.png");
    wishlistBtn.setAttribute('width', "35px");
    addToWishlist.appendChild(wishlistBtn);
    buyBtn.appendChild(addToWishlist);

    purchaseContainer.appendChild(buyBtn);
    bookDetailsOther.appendChild(purchaseContainer);
    bookDetails.appendChild(bookDetailsOther);
    mainContainer.appendChild(bookDetails);

    mainBook.replaceChild(mainContainer, mainBook.children[0]);

//    location.assign("/")

}