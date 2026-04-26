import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {

  it("add an existing product to the cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    // Expected 2: because of using localStorage with default items in Cart
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // Checked how many times "localStorage.setItem" has been called
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2); // incressing the existing quantity to one more => 2
  });

  it("add an new product to the cart", () => {
    // creating a mock:
    // first mocking the set up of localStorage of cart
    spyOn(localStorage, "setItem");

    // then mocking the localStorage of cart
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    // console.log(localStorage.getItem('cart'));
    // console.log(cart);

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    // Expected 2: because of using localStorage with default items in Cart
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // Checked how many times "localStorage.setItem" has been called
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);


    /** to solve this problem => using Mocks (integrated in Jasmine)
     * lets us replace a method with a fake version
     */
  });
});