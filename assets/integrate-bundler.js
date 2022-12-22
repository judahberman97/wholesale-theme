
// document.addEventListener('click', function(e){
//   console.log(e.target);
//   if (e.target.classList.contains('bndlr-add-to-cart') ) {
//     console.log('Bundler button clicked!...');
//     setTimeout(function(){
//       theme.classes.CoreCart.updateTotals(function(){});
//       theme.partials.Cart.updateTotals();
//     }, 2000);
//   }
// });
var isUpdated = false;
const bundlerButtonTimer = setInterval(function(){
  if (document.querySelector('.bndlr-products-container .bndlr-add-to-cart') ) {
    if (!isUpdated && document.querySelector('.bndlr-products-container .bndlr-add-to-cart .bndlr-checkmark')) {
      isUpdated = true;
      theme.partials.Cart.updateAllHtml(()=>{});
      theme.partials.Cart.updateTotals(()=>{});    
    } else if (!document.querySelector('.bndlr-products-container .bndlr-add-to-cart .bndlr-checkmark')) {
      isUpdated = false;
    }
  }
}, 500);

