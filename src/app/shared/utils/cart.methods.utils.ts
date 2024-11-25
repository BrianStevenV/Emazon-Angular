import { LOCAL_STORAGE_CART_NAME } from "../constants/cart/cart.constants";


export class CartMethodsUtils {
    public static cartStorage(nameStorage: string): string | null {
        if(localStorage.getItem(nameStorage)) {
            return localStorage.getItem(nameStorage);
        }
        else {
            const emptyCart = JSON.stringify([]);
            localStorage.setItem(LOCAL_STORAGE_CART_NAME, emptyCart);
            return emptyCart;
        }
    }

    public static removeCartStorage(nameStorage: string): void {
        if (localStorage.getItem(nameStorage)) {
            localStorage.removeItem(nameStorage);
        } else {
            console.warn(`No se encontró un localStorage con el nombre '${nameStorage}'.`);
        }
    }
}