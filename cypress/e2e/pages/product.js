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

    getProductName() {
        return cy.get('.inventory_item_name')
    }

    getDetailProductName() {
        return cy.get('.inventory_details_name')
    }

    getDetailProductDescription() {
        return cy.get('.inventory_details_desc')
    }

    getButtonAddDetail() {
        return cy.get('#add-to-cart')
    }

    getButtonAddList() {
        return cy.get(".pricebar")
    }

    getButtonRemoveDetail() {
        return cy.get('#remove')
    }

    getButtonRemoveList() {
        return cy.get('[class="btn btn_secondary btn_small btn_inventory "]')
    }

    getBadgeCart() {
        return cy.get('.shopping_cart_link')
    }

    getBadgeNumber() {
       return '[data-test="shopping-cart-badge"]'
    }
    sortingZtoA() {
        return cy.get('[data-test="product-sort-container"]').select("za")
    }

    sortingAtoZ() {
        return cy.get('[data-test="product-sort-container"]').select("az")
    }

    sortingLowtoHigh() {
        return cy.get('[data-test="product-sort-container"]').select("lohi")
    }

    sortingHightoLow() {
        return cy.get('[data-test="product-sort-container"]').select("hilo")
    }

    clickDetailProduct(index) {
        cy.get('.inventory_item_name ').eq(index).click()
    }

    clickBacktoProduct() {
        cy.get('#back-to-products').click()
    }

    clickAddtoCartDetail() {
        cy.get('#add-to-cart').click()
    }

    clickRemoveCartDetail() {
        cy.get('#remove').click()
    }

    clickAddtoCartList(index) {
        cy.contains('Add to cart').click()
    }

    clickRemoveCartList(index) {
        cy.contains('Remove').click()
    }

    clickCart() {
        cy.get('.shopping_cart_link').click()
    }


   


}