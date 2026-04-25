import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";
import "../backend/products.js";
//? From 2: Explaination is able to be find in orderSummary.js
renderOrderSummary();
renderPaymentSummary();
