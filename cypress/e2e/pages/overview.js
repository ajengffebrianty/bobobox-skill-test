export class OverviewPage {
    title_text = 'Overview'

    getTitlePage() {
        return cy.get('.title')
    }

    getPriceItem() {
        return cy.get('[data-test="inventory-item-price"]')
    }

    getCartItem() {
        return cy.get('.cart_item_label')
    }

    getPaymentInformation() {
        return cy.get('[data-test="payment-info-value"]')
    }

    getShippingInformation() {
        return cy.get('[data-test="shipping-info-value"]')
    }

    getTotalProductPrice() {
        return cy.get('[data-test="subtotal-label"]')
    }

    getTaxPrice() {
        return cy.get('[data-test="tax-label"]')
    }

    getTotalPrice() {
        return cy.get('[data-test="total-label"]')
    }

    getFinishBtn() {
        return cy.get("#finish")
    }

    getCancelBtn() {
        return cy.get("#cancel")
    }




}