export class CartPage {
    title_text = 'Your Cart'

    getTitlePage() {
        return cy.get('.title')
    }
    getBtnContinueShop() {
        return cy.get('#continue-shopping')
    }
    getBtnCheckout() {
        return cy.get('#checkout')
    }

    getProductName() {
        return cy.get('[data-test="inventory-item-name"]')
    }

    getCartItem() {
        return cy.get('.cart_item_label')
    }

    getRemoveButton() {
        return cy.get('[class="btn btn_secondary btn_small cart_button"]')
    }






}