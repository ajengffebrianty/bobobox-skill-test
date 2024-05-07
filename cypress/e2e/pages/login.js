export class LoginPage {
    required_message = 'Username is required'
    locked_message = 'Sorry, this user has been locked out.'
    wronguser_message = 'Username and password do not match any user in this service'

    enterUsername(username) {
        cy.get('#user-name').type(username)
    }

    enterPassword(password) {
        cy.get('#password').type(password)
    }

    clickLogin() {
        cy.get('#login-button').click()
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }
}