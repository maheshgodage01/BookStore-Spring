let clickedElement = sessionStorage.getItem("clickedElement");

console.log(clickedElement);


let myStore = document.getElementById("store");
let storeArray = JSON.parse(localStorage.getItem("BookRecord"));
let CurrentUser = sessionStorage.getItem("currentUser");

let CurrentUserData = Object.assign({}, storeArray[CurrentUser]);
let myObj = Object.assign({}, CurrentUserData[clickedElement]);

console.log(myObj);

document.getElementById("item-title").value = myObj.Title;
document.getElementById("author-name").value = myObj.Author;
document.getElementById("store-name").value  = myObj.StoreName;
document.getElementById("mrp").value = myObj.MRP;
document.getElementById("discount").value = myObj.Discount;
document.getElementById("item-category").value = myObj.Category;
document.getElementById("description").value=myObj.Description;

document.getElementById("item-image").setAttribute('src', myObj.ImageFile);




// myObj = {
//     Title : itemTitle,
//     Designer : designerName,
//     StoreName : storeName,
//     MRP : mrp,
//     Discount : discount,
//     Category : category,
// }

const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", function() {
    console.log("entered");
    const fileInput = this.files[0];
    const reader= new FileReader();

    reader.readAsDataURL(fileInput);
    reader.addEventListener("load", ()=>{
        // let itemTitle = document.getElementById("item-title").value;
        // let designerName  = document.getElementById("designer-name").value;
        // let storeName = document.getElementById("store-name").value;
        // let mrp = document.getElementById("mrp").value;
        // let discount = document.getElementById("discount").value;
        // let category = document.getElementById("item-category").value;

        document.getElementById("item-image").setAttribute('src', reader.result);

        myObj.ImageFile=reader.result;
        
        console.log("Updated");
    });

});

// let  UpdateBtn = document.getElementById("update-item-btn");
// UpdateBtn.addEventListener("click", ()=>{

// });

function urlNavigate(){
    let itemTitle = document.getElementById("item-title").value;
    let authorName  = document.getElementById("author-name").value;
    let storeName = document.getElementById("store-name").value;
    let mrp = document.getElementById("mrp").value;
    let discount = document.getElementById("discount").value;
    let category = document.getElementById("item-category").value;
    let description = document.getElementById("description").value;


    myObj.Title=itemTitle;
    myObj.Author=authorName;
    myObj.StoreName = storeName;
    myObj.MRP = mrp;
    myObj.Discount = discount;
    myObj.Category = category;
    myObj.Description = description;

    console.log("Update clicked");
    CurrentUserData[clickedElement] = myObj;
    storeArray[CurrentUser] = CurrentUserData;
    localStorage.setItem("BookRecord", JSON.stringify(storeArray));
    document.getElementById("admin-page-url").click();
    console.log("record updated");
    // window.location.replace("index.html");
    // document.getElementById("admin-page-url").click();   
}

