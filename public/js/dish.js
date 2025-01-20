// document.getElementsByClassName('quantity-right-plus')[0].onclick=((e)=>{
//       e.preventDefault();
//       let quantity = parseInt(document.getElementById('quantity').value);
//       document.getElementById('quantity').value=(quantity + 1);
//   });

//   document.getElementsByClassName('quantity-left-minus')[0].onclick=((e)=>{
//       e.preventDefault();
//       let quantity = parseInt(document.getElementById('quantity').value);
//             if(quantity>0){
//             document.getElementById('quantity').value=(quantity - 1);
//           }
//   });


// Get all the plus buttons
const plusButtons = document.querySelectorAll(".quantity-right-plus");
// Add event listener to each plus button
plusButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    //e.preventDefault();
    const input = button.closest(".input-group").querySelector(".form-control");
    let quantity = parseInt(input.value);
    if (quantity < 10) {
      input.value = quantity + 1;
    }
  });
});
// Get all the minus buttons
const minusButtons = document.querySelectorAll(".quantity-left-minus");
// Add event listener to each minus button
minusButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
   // e.preventDefault();
    const input = button.closest(".input-group").querySelector(".form-control");
    let quantity = parseInt(input.value);
    if (quantity > 1) {
      input.value = quantity - 1;
    }
  });
});

