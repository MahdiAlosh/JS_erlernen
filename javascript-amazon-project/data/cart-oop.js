function Cart(localStorageKey) {
  const cart = {
  cartItems: undefined,

  loadFromStorage () {
    // is equal to loadFromStorage: function (){}
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        },
      ];
    }
  },

  saveToStorage () {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },

  addToCart (productId) {
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
    });
    
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  },

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cart = newCart;
    this.saveToStorage();
  },

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    //            opject local          parameter 
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  },

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  },

  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  },
};

  cart.loadFromStorage();

  return cart;
}

export const cart = Cart('cart');
// cart.loadFromStorage();
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
console.log(cart);
/**
 * sequence of steps to load products from cart after adding a new product:
 * 1. load the cart from storage (cart.loadFromStorage())
 * 2. add the new product to the cart (cart.addToCart()). Or make sure to load cart from storage before returning the cart object in the Cart function. 
 * 3. save the cart to storage (cart.saveToStorage()). OPTIONAL, if we want to keep item it so.
 */

export const businessCart = Cart('cart-business');
businessCart.loadFromStorage();
console.log(businessCart);

/**
 * To test the cart object using oop
 */
// cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
// console.log(cart);

//? If need to have another cart, we can create another instance of the Cart class:
// const cart2 = {
//   // ...
// };
// cart2.loadFromStorage();
// console.log(cart2);

