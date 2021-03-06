import Product from "./Product";
import CartItem from "./CartItem";
import CartRenderer from "../cart/CartRenderer";
import Category from "./Category";

export default class Cart {
    constructor({cartItems = []} = {}) {
        this.cartItems = cartItems;

        this.renderer = new CartRenderer(this, ".header-tools-item");
        console.log(this.renderer);
        this.renderer.updateHeaderCart();

    }


    get totalPrice() {
        let totalPrice = 0;

        this.cartItems.forEach(cartItem => {
            totalPrice += cartItem.product.price * cartItem.quantity;
        });

        return totalPrice;
    }

    addProduct(product, quantity) {
        let cartItem = this.findCartItemByProduct(product);


        if (cartItem) {
            cartItem.increaseQuantity(quantity);
        } else {
            cartItem = CartItem.create({ product, quantity });

            if (cartItem) this.cartItems.push(cartItem);
        }

        this.renderer.updateHeaderCart();
    }

    decreaseQuantity(product, quantity) {
        /**
         * @var CartItem
         */
        let cartItem = this.findCartItemByProduct(product);

        if (!cartItem) return;

        cartItem.decreaseQuantity(quantity);


    }

    removeProduct(productId) {
        let cartItem = this.findCartItemByProduct({id: productId});
        if (!cartItem) return;

        cartItem.reset();

        this.cartItems.splice(this.findCartItemIndexByProduct({id: productId}), 1);

        this.renderer.updateHeaderCart();
    }

    findCartItemByProduct(product) {
        return this.cartItems.find(cartItem => cartItem.product.id === product.id);
    }

    findCartItemIndexByProduct(product) {
        let cartItemIndex = this.cartItems.findIndex(cartItem => cartItem.product.id === product.id);
        return cartItemIndex > -1 ? cartItemIndex : 0;
    }

    clear() {
        this.cartItems.forEach(cartItem => {
            if (cartItem) cartItem.reset();
        });

        this.cartItems = [];
    }

    static fromJson(jsonString) {
        let cartDecoded = typeof jsonString === 'object' ? jsonString : JSON.parse(jsonString),
            cartItems = [];


        if (!this.validate(cartDecoded)) { return null; }



        if (cartDecoded && 'cartItems' in cartDecoded) {
            cartDecoded.cartItems.forEach(cartItem => {
                let _cartItem = CartItem.fromJson(cartItem);

                if (_cartItem !== null) cartItems.push(_cartItem);


            });
        }

        return new this({cartItems});
    }

    static validate(obj) {
        // if (obj === null) return false;

        let requiredProperties = [];

        if (requiredProperties.every(prop => prop in obj) === false) {
            console.error('Validation error, no such required props in given object');
            return false;
        }

        return true;
    }

    toJSON() {
        return {
            cartItems: this.cartItems,
        };
    }
}