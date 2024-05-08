export class ListMenu {
    getAllItemLink () {
    return cy.get('#inventory_sidebar_link')
    }
    getAboutLink() {
        return cy.get('#about_sidebar_link')
    }
    getLogoutLink() {
        return cy.get('#logout_sidebar_link')
    }
    getReset() {
        return cy.get('#reset_sidebar_link')
    }
}