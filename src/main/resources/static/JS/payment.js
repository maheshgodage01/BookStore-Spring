let TotalAmount = JSON.parse(sessionStorage.getItem("TotalAmount"));
console.log(TotalAmount);
console.log(TotalAmount);

let amountContainer = document.getElementById("final-amount");



let rent = document.getElementById("radio-11");
let buy = document.getElementById("radio-22");

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

