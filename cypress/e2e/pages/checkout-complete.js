export class CompletePage {
    title_text = 'Complete'
    complete_message = 'Thank you for your order!'

    getTitlePage() {
        return cy.get('.title')
    }

    getBackToHomeButton() {
        return cy.get('#back-to-products')
    }

    getHeader() {
        return cy.get('.complete-header')
    }
}