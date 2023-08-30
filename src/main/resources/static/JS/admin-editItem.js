let clickedElement = sessionStorage.getItem("clickedElement");

console.log(clickedElement);

let CurrentUser = sessionStorage.getItem("currentUser");

let formData = new FormData();
formData.append("id", clickedElement);

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
    document.getElementById("item-title").value = Book.title;
    document.getElementById("author-name").value = Book.authorName;
    document.getElementById("store-name").value  = Book.storeName;
    document.getElementById("mrp").value = Book.price;
    document.getElementById("discount").value = Book.discount;
    document.getElementById("item-category").value = Book.category;
    document.getElementById("item-condition").value = Book.condition;
    document.getElementById("description").value=Book.description;

//    document.getElementById("item-image").setAttribute('src', Book.bookImage);

});


function urlNavigate(){
    let itemTitle = document.getElementById("item-title").value;
    let authorName  = document.getElementById("author-name").value;
    let storeName = document.getElementById("store-name").value;
    let mrp = document.getElementById("mrp").value;
    let discount = document.getElementById("discount").value;
    let category = document.getElementById("item-category").value;
    let description = document.getElementById("description").value;
    let condition = document.getElementById("item-condition").value;



    let adminId = sessionStorage.getItem("currentUser");
    console.log(adminId);


    let formData = new FormData();
    formData.append("id", clickedElement);
    formData.append("title", itemTitle);
    formData.append("authorName", authorName);
    formData.append("storeName", storeName);
    formData.append("price",parseInt (mrp));
    formData.append("discount", parseInt(discount));
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("description", description);

    formData.append("adminId", adminId);


    fetch("/my-store/update", {
        method : 'POST',
        body: formData,
    })
    .then(response =>{
        console.log('Response:', response)
    })
    .catch(error => {
        console.error('Error submitting data:', error);
    });
    console.log("Success signup");

    location.assign("my-store");
}

