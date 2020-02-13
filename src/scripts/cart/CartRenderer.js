import Mustache from 'mustache';
import Cart from "../models/Cart";

export default class CartRenderer {
    constructor(cart, {
        headerCartSelect = '.header-tools-item'
    } = {}) {
        this.cart = cart;
        this.headerCartEl = document.querySelector(headerCartSelect);
    }

    updateHeaderCart() {
        this.headerCartEl.querySelector('.header-tools-item-badge').innerHTML = this.cart.cartItems.length;
        this.assignListener();
    }


    assignListener() {


        document.querySelector('.header-tools-item').addEventListener('click', () => {

            let cartDiv = document.querySelector('.hello-div');

            cartDiv.innerHTML = '';

            let productTMPL = document.getElementById('cart-item').innerHTML;

            this.cart.cartItems.forEach((cartItem) => {
                cartDiv.innerHTML += Mustache.render(productTMPL, cartItem);
            });

           /* Array.from(document.querySelectorAll('.remove_button')).forEach(element => {
                element.addEventListener('click', (e) => {
                    let productItem = e.target.closest('.product-item');

                    console.log(productItem.dataset.id);

                    if (productItem) {
                        this.cart.removeProduct(productItem.dataset.id);

                    }

                });
            });*/

           /*let helloDiv = document.querySelector('.hello-div');
            helloDiv.addEventListener('click', (e) => {

               if (e.target.tagName === 'button') {
                   if (e.target.classList.contains('remove_button')) {
                       let target = document.querySelector('.product-item');
                       console.log(target);
                       this.cart.removeProduct(target.dataset.id);
                   }
               }
           });*/

            document.addEventListener('click', function (event) {
                if (event.target.tagName === 'button') {
                    if (event.target.classList.contains('remove_button')) {
                        let target = event.target.closest('.product-item');
                        console.log(target);
                        this.cart.removeProduct(target.dataset.id);
                    }
                }

            });



            document.querySelector('.hello-div-content').classList.add("hello-div-content-active");

        });

        /*// Удаляем товар


        //чистим корзину
        document.querySelector('.button_clean_out').addEventListener('click', () => {

            this.cart.clear();
        });*/

        document.querySelector('.close').addEventListener('click', () => {

            document.querySelector('.hello-div-content').classList.remove("hello-div-content-active");
        });


    }


}