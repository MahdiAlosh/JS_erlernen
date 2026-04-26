import {
  cart,
  // removeFromCart,
  // calculateCartQuantity,
  // updateQuantity,
  // updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
// import { formatCurrency } from "./utils/money.js";
import formatCurrency from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
// Default Export: 'dayjs'
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// External Libraries
// hello();
const today = dayjs();
const deliveryDate = today.add(7, "days");
// 1. par: the number of time we want to add, 2. par: length of time

// console.log(deliveryDate);
// console.log(deliveryDate.format("dd, D.MM.YYYY"));
// console.log(deliveryDate.format("dddd, MMMM D"));

//? From 2:
export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
  <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
          <span> Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link"
          data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-link"
          data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-quantity-link
          js-delete-link-${matchingProduct.id}"
          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `;
  });

  /* Function for generate an HTML */
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    const uniqueOptions = new Set();
    // Use a Set to track unique options

    deliveryOptions.forEach((deliveryOption) => {
      // for one option

      // Get today's date
      const today = dayjs();
      let additionalDays = deliveryOption.deliveryDay;

      // Check if today is a weekend

      // If the delivery date is Saturday(6), adding 1 moves the delivery to Sunday(0).
      // Since the logic is in a while loop, it checks the updated delivery date again.
      // When it detects Sunday(0), it adds another 1, resulting in Monday(1).
      let deliveryDate = today.add(additionalDays, "days");
      if (deliveryDate.day() === 6) {
        deliveryDate = deliveryDate.add(2, "days");
      } else if (deliveryDate.day() === 0) {
        deliveryDate = deliveryDate.add(1, "days");
      }
      // Or while loop for shorter ckecking
      // while (deliveryDate.day() === 6 || deliveryDate.day() === 0) {
      // If the date falls on Saturday or Sunday, add 1 day
      //   deliveryDate = deliveryDate.add(1, "days");
      // }

      // Calculate the delivery date
      // const deliveryDate = today.add(additionalDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      // Format price
      const priceString =
        deliveryOption.priceCent === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCent)} - `;


      // Generate a unique key for each option
      const optionKey = `${dateString}`;

      if (!uniqueOptions.has(optionKey)) {
        // Add the key to the Set to ensure uniqueness
        uniqueOptions.add(optionKey);

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option js-delivery-option" 
          data-product-id="${matchingProduct.id}" 
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? "checked" : ""
          } class="delivery-option-input" name="delivery-option-${matchingProduct.id
          }">
            <div>
              <div class="delivery-option-date">
                ${dateString} Shipping
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `;
      }
    });
    return html;
  }

  /**
   * Choose a delivery option:
   * The attribute name="delivery-option-${matchingProduct.id}" ensures that
   * the selection of delivery options is independent for each product.
   * This is because input radio buttons allow only one option to be selected
   * within the same group (sharing the same name attribute).
   * => now every single Product has itown delivery option!!
   */

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  /**
   * 1. Update deliveryOptionsId in the Cart
   * 2. Update the Page => so that we don't need to refresh the site everytime
   *    By creating a function to call it up!
   *    see //! From 2:
   */
  // ?From 1:
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      // const productId = element.dataset.productId;
      // const deliveryOptionId = element.dataset.deliveryOptionId;
      // console.log('Cart:', cart);
      // console.log('Selected Product ID:', productId);
      // console.log('Selected Delivery Option ID:', deliveryOptionId);
      cart.updateDeliveryOption(productId, deliveryOptionId);
      //? From 2:
      renderOrderSummary();
      //* update the site automaticlly when choosing a delivery option
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      //by using a touch data-attribute
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);
      /**
       * Step to remove an Element (Product):
       * 1. Use the DOM to get the element to remove
       * 2. Use .remove() method
       */
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();
      //console.log(container);
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity();

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      cart.updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
      renderPaymentSummary();
    });

    // Hinzufügen der Enter-Taste-Logik
    const inputField = document.querySelector(
      `.js-quantity-input-${link.dataset.productId}`
    );

    inputField.addEventListener("keydown", (event) => {

      console.log(event.key);
      if (event.key === "Enter") {
        // Gleiche Logik wie beim Klick
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove("is-editing-quantity");

        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        const newQuantity = Number(quantityInput.value);

        cart.updateQuantity(productId, newQuantity);

        const quantityLabel = document.querySelector(
          `.js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = newQuantity;

        updateCartQuantity();
        renderPaymentSummary();
      }
    });
  });
}

//? From 2:
// renderOrderSummary();

/**
 * 1. Update the Date
 * 2. Regenerate all the HTML
 * * This technick called:
 * ! MVC (Model - View - Controller)
 * ?1. Model: saves and manages the data
 * ?2. View: takes the data and displays it on the page
 * ?3. Controller: runs some code when we interact with the page
 */
