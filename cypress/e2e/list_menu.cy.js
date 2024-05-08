import { ProductPage } from "./pages/product";
import { ListMenu } from "./pages/list-menu";

const product = new ProductPage()
const listMenu = new ListMenu()
beforeEach(() => {
  cy.fixture('global_data').then((user) => {
    cy.login(user.username, user.password);
  });
})


describe('Menu list test cases', () => {

  it('Access About menu', function () {
    product.getListMenu().click()
    listMenu.getAboutLink().should('have.attr','href', 'https://saucelabs.com/' )
  })

  it('Access All items menu', function () {
    product.getListMenu().click()
    listMenu.getReset().click()
    listMenu.getAllItemLink().click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  })

  it('Access Reset app state menu', function () {
    product.getListMenu().click()
    cy.addProduct()
    cy.get(product.getBadgeNumber()).should('exist')
    listMenu.getReset().click()
    cy.get(product.getBadgeNumber()).should('not.exist')
  })

  it('Logout menu', function () {
    product.getListMenu().click()
    listMenu.getLogoutLink().click()
    cy.url().should('eq', 'https://www.saucedemo.com/')
  })
})