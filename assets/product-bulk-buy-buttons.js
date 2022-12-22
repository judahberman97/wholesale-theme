class ProductBulkBuyButtons extends HTMLElement {
    constructor() {
      super();
      this.button_container = this.querySelector('.product-bulk-buy-buttons--primary');
      this.button_text = this.querySelector('.product-bulk-buy-buttons--cta-text');
      this.form = this.querySelector('.product-bulk-buy-buttons--form');
      this.root = this.closest(`[data-product-id='${this.dataset.id}']`);
      this.select_input = this.querySelector('.product-bulk-buy-buttons--select');
      this.smart_button = this.querySelector('.product-bulk-buy-buttons--smart');
      this.primary_button = this.querySelector('.product-bulk-buy-buttons--cta');
  
      this.load();
    }
  
    load() {
      this.updateQuantityListener();
      this.addToCartListener();
    }

    updateQuantityListener() {
      const selectedItems = this.querySelectorAll( '[name="quantity"]');
      selectedItems.forEach(selectedItem => {
        selectedItem.addEventListener('change', event => {
          const variantPrice = selectedItem.getAttribute('variant-price');
          const subTotal = (variantPrice * selectedItem.value / 100).toFixed(2);
          selectedItem.parentNode.parentNode.querySelector('.sub-total').innerHTML = '$' + subTotal;

          let total_products = 0;
          let total_price = 0;

          selectedItems.forEach(item => {
            total_products += parseInt(item.value);
            total_price += item.getAttribute('variant-price') * item.value;
          });

          document.querySelector('.variant-list-footer .total .total-products').innerHTML = total_products + " products";
          document.querySelector('.variant-list-footer .total .total-price').innerHTML = '$' + (total_price / 100).toFixed(2);
        });
      });
    }
  
    addToCartListener() {
      this.form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        this.button_container.setAttribute('data-loading', 'true');

        const selectedItems = this.querySelectorAll( '[name="quantity"]');

        var items = [];
        
        selectedItems.forEach(selectedItem => {
          var item = {
            "id": selectedItem.getAttribute('variant-id'),
            "quantity": selectedItem.value
          };
          items.push(item);
        });

        fetch('/cart/add.js', {
          method: 'POST',
          body: JSON.stringify({
            "items": items
          }),
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(response => response.json())
        .then(function(cart) {
          location.href = '/cart';
        });

        return false;
      });
    }   
  }
  
  customElements.define('product-bulk-buy-buttons-root', ProductBulkBuyButtons);
  