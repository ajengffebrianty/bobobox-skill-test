/// <reference types="cypress" />
export class ProductPage {

    title_text = 'Swag Labs'

    getTitlePage () {
        return cy.get('.app_logo')
    }

    getListMenu () {
        return cy.get('#react-burger-menu-btn')
    }

    getShoppingCart () {
        return cy.get('#shopping_cart_container')
    }

    getFilterProduct() {
        return cy.get('[data-test="product-sort-container"]')
    }

}