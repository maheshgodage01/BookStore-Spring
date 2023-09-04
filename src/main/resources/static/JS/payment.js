let TotalAmount = JSON.parse(sessionStorage.getItem("TotalAmount"));
console.log(TotalAmount);
console.log(TotalAmount);

let amountContainer = document.getElementById("final-amount");

let rent = document.getElementById("radio-11");
let buy = document.getElementById("radio-22");
let placeOrder = document.getElementById("place-order");

amountContainer.innerHTML="₹"+TotalAmount+"/-"
rent.addEventListener("click", ()=>{
    console.log("clicked");
    TotalAmount = TotalAmount - ((TotalAmount/100)*70);
    amountContainer.innerHTML="₹"+TotalAmount.toFixed(2)+"/-"
});

buy.addEventListener("click", ()=>{
    TotalAmount = JSON.parse(sessionStorage.getItem("TotalAmount"));
    amountContainer.innerHTML="₹"+TotalAmount+"/-"
});

// if(rent.checked){
//     amountContainer.innerHTML="₹"+TotalAmount+"/-"
// }
// else if(buy.checked){
//     let priceCalculate = TotalAmount - ((TotalAmount/100)*70);
//     amountContainer.innerHTML="₹"+priceCalculate+"/-"
// }

placeOrder.addEventListener("click", ()=>{
    let currentUser = sessionStorage.getItem("currentUser");
    let CartItems = JSON.parse(sessionStorage.getItem("CartItems"));

    let formData = new FormData();
    formData.append("userId", currentUser);
    formData.append("books", CartItems.join(","));
    formData.append("status", "Completed");

    fetch("/checkout/place-order",{
    method : 'POST',
    body : formData
    })
    .catch(error => {
        console.error('Error:', error);
    });

    location.assign("my-cart");
})

