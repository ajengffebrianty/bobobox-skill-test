import { ProductPage } from "./pages/product";
import { CartPage } from "./pages/cart";
import { InformationPage } from "./pages/information";
import { OverviewPage } from "./pages/overview";
import { CompletePage } from "./pages/checkout-complete";
const product = new ProductPage()
const cart = new CartPage()
const information = new InformationPage()
const overview = new OverviewPage()
const complete = new CompletePage()

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
  it('Remove product through cart', function () {
    cy.addProduct()
    product.clickCart()
    cart.getProductName().eq(0).invoke('text').then(productName => {
      cy.contains('Remove').eq(0).click()
      cy.contains(productName).should('not.exist')
    })
  })

  it('Remove one of product through cart list before checkout the product', function () {
    cy.addProduct()
    cy.addProduct()
    product.clickCart()
    cy.contains('Remove').eq(0).click()

    let cartProduct
    cart.getCartItem().its('length').then((length) => {
      cartProduct = length
    })

    cart.getBtnCheckout().click()
    information.enterFirstName(this.data.first_name)
    information.enterLastName(this.data.last_name)
    information.enterPostalCOde(this.data.postal_code)
    information.getContinueButton().click()
    overview.getCartItem().its('length').then(overviewProduct => {
      cy.wrap(cartProduct).then(cartProductTotal => {
        expect(cartProductTotal).equal(overviewProduct)
      })
    })
  })

  it('Emptied product through cart list before checkout the product', function () {
    cy.addProduct()
    product.clickCart()
    cart.getRemoveButton().each(($el, index, list) => {
      cy.wrap($el).click()
    })
    cart.getCartItem().should('not.exist')
    cart.getBtnContinueShop().click()
    product.getTitlePage().should('have.text', product.title_text)
  })

  it('Checkout the product without fill the customer data', function () {
    cy.addProduct()
    product.clickCart()
    let cartProduct
    
    cart.getBtnCheckout().click()
    information.getTitlePage().should('include.text', information.title_text)
    information.enterFirstName(`{backspace}`)
    information.enterLastName(`{backspace}`)
    information.enterPostalCOde(`{backspace}`)
    information.getContinueButton().click()
    information.inputError().its('length').then(length => {
      expect(length).equal(3)
    })
    information.getErrorMessage().should('include.text', information.required_errmessage)
    information.enterFirstName(this.data.first_name)
    information.getContinueButton().click()
    information.getErrorMessage().should('include.text', information.required_errmessage)
    information.enterFirstName(this.data.last_name)
    information.getContinueButton().click()
    information.getErrorMessage().should('include.text', information.required_errmessage)
    information.getCancelButton().click()
    cart.getTitlePage().should('include.text', cart.title_text)
  })

  it('Checkout the product', function () {
    cy.addProduct()
    product.clickCart()
    let cartProduct
    cart.getCartItem().its('length').then((length) => {
      cartProduct = length
    })
    cart.getBtnCheckout().click()
    information.getTitlePage().should('include.text', information.title_text)
    information.enterFirstName(this.data.first_name)
    information.enterLastName(this.data.last_name)
    information.enterPostalCOde(this.data.postal_code)
    information.getContinueButton().click()
    overview.getTitlePage().should('include.text', overview.title_text)
    overview.getCartItem().its('length').then(overviewProduct => {
      cy.wrap(cartProduct).then(cartProductTotal => {
        expect(cartProductTotal).equal(overviewProduct)
      })
    })


    let priceTotal = 0
    overview.getPriceItem().each(($el, index, length) => {
      cy.wrap($el).invoke('text').then((text) => {
        priceTotal += Number(text.substring(1))
      });
    }).then(() => {
      overview.getTotalProductPrice().invoke('text').then(text => {
        const labelItemTotal = Number(text.split('$')[1])
        cy.wrap(priceTotal).then(priceTotalProduct => {
          expect(labelItemTotal).equal(priceTotalProduct)
        })
      })
    })

    let priceAndTax = 0
    overview.getTaxPrice().invoke('text').then(text => {
      const tax = Number(text.split('$')[1])
      cy.wrap(priceTotal).then(priceTotalProduct => {
        priceAndTax = priceTotalProduct + tax
      })
    })
    overview.getTotalPrice().invoke('text').then(text => {
      const totalPrice = Number(text.split('$')[1])
      cy.wrap(priceAndTax).then(total => {
        expect(total).equal(totalPrice)
      })
    })

    overview.getFinishBtn().click()
    complete.getTitlePage().should('include.text', complete.title_text)
    complete.getHeader().should('include.text', complete.complete_message)
    complete.getBackToHomeButton().click()
    product.getTitlePage().should('have.text', product.title_text)
  })
})