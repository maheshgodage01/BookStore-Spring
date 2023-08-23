let addForm = document.getElementById("add-item-form");

let itemTitle = document.getElementById("item-title").value;
let authorName  = document.getElementById("author-name").value;
let storeName = document.getElementById("store-name").value;
let mrp = document.getElementById("mrp").value;
let discount = document.getElementById("discount").value;
let category = document.getElementById("item-category").value;
let description = document.getElementById("description").value;

const fileInput = document.getElementById("file-input");

// let CurrentUserData;

if("BookRecord" in localStorage){
    let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    let CurrentUser = sessionStorage.getItem("currentUser");

    if(CurrentUser in storeArray){
        let CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
        // console.log(CurrentUserData);
        // console.log(Object.keys(CurrentUserData));   
        let dataList = Object.keys(CurrentUserData);  
        for(i in dataList){
            i=dataList[i];
            // console.log(Object.keys(CurrentUserData));     

            // console.log(parseInt(i), CurrentUserData[i]);
            // console.log(typeof(i));
            // console.log(CurrentUserData[i]);
            addItem(i, CurrentUserData[i]);
        }
    }

    // storeArray.forEach(addItem);
}

function addItem(i, item){
    // let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    // let CurrentUser = sessionStorage.getItem("currentUser");
    // console.log("Current user :"+CurrentUser);

    // let CurrentUserData1 = Object.assign({}, storeArray[CurrentUser]);
    // console.log("CurrentUser Data :" + storeArray[CurrentUser]);

    // let item = Object.assign({}, CurrentUserData1[i]);

    console.log(item);
    console.log(typeof(item));

    if((Object.keys(item)).length == 0){
        return 0;
    }
    
    let itemList = document.getElementById("all-item-list");

    let OneItem = document.createElement("div");
    OneItem.classList.add("one-item");
    OneItem.setAttribute('id', ""+i);
    OneItem.setAttribute('onmouseover', "editItem(this.id)");
    OneItem.setAttribute('onmouseout', "notEditItem(this.id)");

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("update-delete-btn");
    let updateBtn = document.createElement("button");
    updateBtn.classList.add("update-btn");
    updateBtn.setAttribute('id', i+"a");
    updateBtn.setAttribute('onClick', "updateItem(this.id)");
    let updateBtnName = document.createTextNode("UPDATE");
    updateBtn.appendChild(updateBtnName);
    btnDiv.appendChild(updateBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    // deleteBtn.classList.add(""+i);
    deleteBtn.setAttribute('id', i+"b");
    deleteBtn.setAttribute('onClick', "deleteItem(this.id)");
    let deleteBtnName = document.createTextNode("DELETE");
    deleteBtn.appendChild(deleteBtnName);
    btnDiv.appendChild(deleteBtn);

    OneItem.appendChild(btnDiv);


    let imgContainer = document.createElement("div");
    imgContainer.classList.add("all-items-item");
    let imgSrc = document.createElement("img");
    imgSrc.setAttribute('src',item.ImageFile);
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

    let priceCalculate = item.MRP - ((item.MRP/100)*item.Discount);
    let actualPrice = document.createTextNode("₹"+priceCalculate);
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
    let mrpPrice = item.MRP;
    let Mrpval = document.createTextNode(mrpPrice);
    mrpDiv.appendChild(Mrpval);

    mrpSpan.appendChild(mrpDiv);

    mrp.appendChild(mrpSpan);
    priceContainer.appendChild(mrp);

    OneItem.appendChild(priceContainer);

    itemList.appendChild(OneItem);

    // console.log(i);
    // i+=1;
}


let submitBtn = document.getElementById("add-item-btn");
submitBtn.addEventListener("click", function(){
    document.getElementById("add-item-form").reset();

});


fileInput.addEventListener("change", function() {
    const fileInput = this.files[0];
    const reader= new FileReader();

    reader.readAsDataURL(fileInput);
    reader.addEventListener("load", ()=>{
        let itemTitle = document.getElementById("item-title").value;
        let authorName  = document.getElementById("author-name").value;
        let storeName = document.getElementById("store-name").value;
        let mrp = document.getElementById("mrp").value;
        let discount = document.getElementById("discount").value;
        let category = document.getElementById("item-category").value;
        let description = document.getElementById("description").value;

        let CurrentUser = sessionStorage.getItem("currentUser");
        console.log(CurrentUser);

        let myObj = {
            Title : itemTitle,
            Author : authorName,
            StoreName : storeName,
            MRP : mrp,
            Discount : discount,
            Category : category,
            Description : description,
            ImageFile : reader.result
        }

        let storeArray={};
        let CurrentUserData;
        if("BookRecord" in localStorage){
            storeArray = JSON.parse(localStorage.getItem("BookRecord"));
            console.log("entered in 1");
            if(CurrentUser in storeArray){
                console.log("entered in 2");
                CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
                let keys= Object.keys(CurrentUserData);
                let id = parseInt(keys.pop())+1;
                CurrentUserData[id]=myObj;
            }
            else{
                console.log("entered in 3");
                CurrentUserData = {};
                let id = 0;
                CurrentUserData[id] = myObj;
            }
            
        }
        else{
            console.log("entered in 3");
            CurrentUserData = {};
            let id = 0;
            CurrentUserData[id] = myObj;
        }

        storeArray[CurrentUser]=CurrentUserData;

        localStorage.setItem("BookRecord",JSON.stringify(storeArray));
    });

});


function updateItem(id){
    let elementId = parseInt(id);
    console.log(elementId);
    sessionStorage.setItem("clickedElement", elementId);

    window.location.replace("admin-editItem.html");

    // console.log(id);

}

function deleteItem(id){
    let elementId = parseInt(id);
    // console.log(elementId);
    let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
    let CurrentUser = sessionStorage.getItem("currentUser");
    // console.log(CurrentUser);
    let CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
    // console.log(CurrentUserData);


    // sessionStorage.setItem("clickedElement", id);
    if(elementId in CurrentUserData){
        // console.log("inside f");
        // console.log(Object.keys(CurrentUserData));
        CurrentUserData[elementId] = {};
        // console.log(Object.keys(CurrentUserData));
        // storeArray[CurrentUser]=Object.assign({}, CurrentUserData);
        storeArray[CurrentUser]=CurrentUserData;
        console.log(typeof(storeArray[CurrentUser]));
        // console.log(storeArray);
        localStorage.setItem("BookRecord", JSON.stringify(storeArray));
        location.reload();
        console.log("updated");
    }


}

function editItem(id) {
    let intVal = parseInt(id);
    let oneItem=document.getElementById(id);
    // console.log(intVal+1);
    let updateId = intVal+"a";
    let deleteId = intVal+"b";
    oneItem.style.opacity= "0.9";
    let updateBtn = document.getElementById(""+updateId);
    let deleteBtn =  document.getElementById(""+deleteId);
    updateBtn.style.display="flex";
    updateBtn.style.opacity="1";
    deleteBtn.style.display= "flex";
    deleteBtn.style.opacity="1";

}


function notEditItem(id){
    let intVal = parseInt(id);
    let oneItem=document.getElementById(id);
    // console.log(intVal+1);
    let updateId = intVal+"a";
    let deleteId = intVal+"b";
    let updateBtn = document.getElementById(""+updateId);
    let deleteBtn =  document.getElementById(""+deleteId);
    updateBtn.style.display="none";
    deleteBtn.style.display= "none";

    oneItem.style.opacity="1";
}







// let profileBtn = document.getElementById("profile");
// let profilePopup = document.getElementById("user-popup");

// profileBtn.addEventListener("mouseover", profileBtnPopup);
// profileBtn.addEventListener("mouseout", closePopup);

// profilePopup.addEventListener("mouseover", popup);
// profilePopup.addEventListener("mouseout", closePopup);

// let login = false;
// function profileBtnPopup(){
//     let userName = loginCheck();
//     // console.log(typeof(userName));

//     if(userName == null){
//         // console.log("null");
//         profilePopup.style.display = "none";
//         loginPopUp.style.display="flex";
//     }
//     else {
//         console.log("inside");
//         loginPopUp.style.display="none";
//         profilePopup.style.display = "flex";
//     }
// }

// function popup() {
//     if(login){
//         loginPopUp.style.display="none";
//         profilePopup.style.display = "flex";
//     }
//     else {
//         profilePopup.style.display = "none";
//         loginPopUp.style.display="flex";

//     }
// }

// function closePopup() {
//     loginPopUp.style.display="none";
//     profilePopup.style.display = "none";
// }

// function loginCheck() {
//     let userName = null;
//     if("currentUser" in sessionStorage){
//         console.log("yes")
//         login = true;
//         userName = window.sessionStorage.getItem("currentUser");
//         let userNameField = document.getElementById("user-profile-profile");
//         let contactField = document.getElementById("contact");

//         if("UserData" in localStorage){
//             let UserData = JSON.parse(localStorage.getItem("UserData"));
//             if(userName in UserData){
//                 let User = Object.assign({}, UserData[userName]);
//                 // User = UserData.username;
//                 userNameField.innerHTML=User.FullName;
//                 contactField.innerHTML=User.Contact;
//             }
            
//         }
//     }

//     return userName;
// }

// let userProfile = document.getElementById("user-profile");
// userProfile.addEventListener("click", ()=>{
//     location.replace("admin.html")
// })






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
    location.assign("admin.html");
}
function wishListPage() {
    location.assign("wishlist.html");
}
function cartPage() {
    location.assign("mycart.html")
}
let logOutBtn = document.getElementById("logout");

logOutBtn.addEventListener("click", ()=>{
    sessionStorage.removeItem("currentUser");
    location.replace("index.html");
});
