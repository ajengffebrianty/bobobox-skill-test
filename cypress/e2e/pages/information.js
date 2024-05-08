export class InformationPage{
    title_text = 'Your Information'
    required_errmessage = 'is required'

    getTitlePage() {
        return cy.get('.title')
    }

    getCancelButton() {
        return cy.get('#cancel')
    }

    getContinueButton() {
        return cy.get('#continue')
    }

    enterFirstName(name) {
        cy.get('#first-name').type(name)
    }

    enterLastName(name) {
        cy.get('#last-name').type(name)
    }

    enterPostalCOde(zip) {
        cy.get('#postal-code').type(zip)
    }

    inputError() {
        return cy.get('.input_error')
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }
}