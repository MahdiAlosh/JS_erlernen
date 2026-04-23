export let cart = [];

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
  }
}
/**
 * Normalizing the Data:
 * 1. Avoiding duplacting for each Product in Cart
 * 2. Instead of saving deliveryOptions separately for each product, 
 *    a pointer (id) is used to reference the shared delivery option.
 */


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  // const quantitySelector = document.querySelector(
  //   `.js-quantity-selector-${productId}`
  // );
  //const quantity = Number(quantitySelector.value);
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  /* if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  } */
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  //            opject local          parameter 
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

// export function updateDeliveryOption(productId, deliveryOptionId) {
//   let matchingItem = cart.find((cartItem) => cartItem.productId === productId);
//   if (!matchingItem) {
//     console.error(`No matching item found for productId: ${productId}`);
//     return;
//   }
//   matchingItem.deliveryOptionId = deliveryOptionId;
//   saveToStorage();
// }
