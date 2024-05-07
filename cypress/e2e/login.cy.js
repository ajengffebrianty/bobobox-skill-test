import { LoginPage } from "./pages/login"
import { ProductPage } from "./pages/product"

const login = new LoginPage()
const product = new ProductPage()

beforeEach(()=> {
  cy.visit('/')
  cy.fixture('global_data.json').as('data')
})


describe('Login module test cases', () => {
 
  it('Login to saucedemo without fill the field', function() {
    login.enterUsername(`{backspace}`)
    login.enterPassword(`{backspace}`)
    login.clickLogin()
    login.getErrorMessage().should('include.text', login.required_message)
  })
  it('Login to saucedemo using wrong username', function() {
    login.enterUsername(this.data.invalid_user)
    login.enterPassword(this.data.password)
    login.clickLogin()
    login.getErrorMessage().should('include.text', login.wronguser_message)
  })
  it ('Login to saucedemo using locked out user', function() {
    login.enterUsername(this.data.locked_user)
    login.enterPassword(this.data.password)
    login.clickLogin()
    login.getErrorMessage().should('include.text', login.locked_message)
  })

  it('Login to saucedemo', function () {
    login.enterUsername(this.data.username)
    login.enterPassword(this.data.password)
    login.clickLogin()
    product.getTitlePage().should('have.text', product.title_text)
    product.getFilterProduct().should('be.visible')
    product.getListMenu().should('be.visible')
    product.getShoppingCart().should('be.visible')
    
  })
})