import { products } from '../data/products.js';
import { 
  cart,
  // addToCart,
  // calculateCartQuantity
} from '../data/cart.js';
// import { formatCurrency } from './utils/money.js';
import formatCurrency from './utils/money.js';

//Main Idea of JS:
// 1. Save the data
// 2. Generate the HTML
// 3. Make it interactive
// data structure: save data (informations) from website in an array.

// products-Array is now define in data/products.js
// combine this html together
let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="${product.getStarsURL()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()} <!--(2) digit after dot-->
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// console.log(productsHTML);

// put it on the Web page (using the DOM)
document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  console.log(cartQuantity);
  console.log(cart);
}

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart') // all: to loop on all Buttons
  .forEach((button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.productId; // change the Syntax from Kabab-case to camel-case (product-name => productName)

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      addedMessage.classList.add('added-to-cart-visible');

      setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      cart.addToCart(productId);
      updateCartQuantity();
      //console.log('added product');
    });
  });

// stat of cart.push({
//  productName: '',
//  quantity: 1
// });
// we use following concept:
// How do we know which product to add?
// Data Attribute:
// 1. is just another HTML attribute
// 2. allows us to attach any information to an element
// Syntax for Data Attribute: 
// 1. is just an HTML attribute
// 2. have to start with "data" => z.B. data-product-name="${product.name}"
// 3. then give it any name