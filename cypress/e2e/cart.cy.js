import { ProductPage } from "./pages/product";
import { CartPage } from "./pages/cart";

const product = new ProductPage()
const cart = new CartPage()
beforeEach(() => {
  cy.fixture('global_data.json').as('data')
  cy.fixture('global_data').then((user) => {
    cy.login(user.username, user.password);
  });
})


describe('Cart module test cases', () => {

  it('Access cart page', function () {
    product.clickCart()
    cart.getTitlePage().should('have.text', cart.title_text)
    cart.getBtnCheckout().should('be.visible')
    cart.getBtnContinueShop().should('be.visible')
  })
  it('See Detail product through cart', function () {
    cy.addProduct()
    product.clickCart()
    cart.getProductName().eq(0).invoke('text').then(productName => {
      cart.getProductName().eq(0).click()
      product.getDetailProductName().should('have.text', productName)
    })
  })
  it.only('Remove product through cart', function () {
    cy.addProduct()
    product.clickCart()
    cart.getProductName().eq(0).invoke('text').then(productName => {
      cy.contains('Remove').eq(0).click()
      cy.contains(productName).should('not.exist')
    })
  })
  it('Checkout the product', function () {

  })
  it('Remove the product through cart list before checkout the product', function () {

  })
  it('Checkout the product without fill the customer data', function () {

  })
})