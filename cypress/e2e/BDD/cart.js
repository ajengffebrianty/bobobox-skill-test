const { Before, Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import { CartPage } from "../pages/cart"
import { ProductPage } from "../pages/product"
import { InformationPage } from "../pages/information";
import { OverviewPage } from "../pages/overview";
import { CompletePage } from "../pages/checkout-complete";
const cart = new CartPage()
const product = new ProductPage()
const information = new InformationPage()
const overview = new OverviewPage()
const complete = new CompletePage()

const data = require('../../fixtures/global_data.json')

Before(() => {
    cy.login('standard_user', 'secret_sauce');
})

When("I access cart in Product Page", () => {
    product.clickCart()
})
Then("I Should go to Cart Page", () => {
    cart.getTitlePage().should('have.text', cart.title_text)
    cart.getBtnCheckout().should('be.visible')
    cart.getBtnContinueShop().should('be.visible')
})
Given("I add product to cart", () => {
    cy.addProduct()
})
Then("Verify product added to cart is correct", () => {
    cart.getProductName().eq(0).invoke('text').then(productName => {
        cart.getProductName().eq(0).click()
        product.getDetailProductName().should('have.text', productName)
    })
})

Then("Verify removed product should not exist", () => {
    cart.getProductName().eq(0).invoke('text').then(productName => {
        cy.contains('Remove').eq(0).click()
        cy.contains(productName).should('not.exist')
    })
})

Given("I add two product to cart", () => {
    cy.addProduct()
    cy.addProduct()
})
Then("I Remove one of product", () => {
    cy.contains('Remove').eq(0).click()
})
Then("I Checkout the product", () => {
    cart.getBtnCheckout().click()
})
Then("Count total product before checkout", () => {
    let cartProduct
    cart.getCartItem().its('length').then((length) => {
        cartProduct = length
    }).then(() => {

        cy.wrap(cartProduct).as('cartProduct')
    })
})
Then("I Input customer data", () => {
    information.enterFirstName(data.first_name)
    information.enterLastName(data.last_name)
    information.enterPostalCOde(data.postal_code)
})
Then("I Continue to Product overview", () => {
    information.getContinueButton().click()
})
Then("Verify total product same as total checkout", () => {
    overview.getCartItem().its('length').then(overviewProduct => {
        cy.get('@cartProduct').then(cartProductTotal => {
            expect(cartProductTotal).equal(overviewProduct)
        })
    })
})

Then("Remove all product in cart", () => {
    cart.getRemoveButton().each(($el, index, list) => {
        cy.wrap($el).click()
    })
})
Then("Verify product is empty in cart", () => {
    cart.getCartItem().should('not.exist')
})

Then("I get error message, field is required", () => {
    information.inputError().its('length').then(length => {
        expect(length).equal(3)
    })
    information.getErrorMessage().should('include.text', information.required_errmessage)
    information.enterFirstName(data.first_name)
    information.getContinueButton().click()
    information.getErrorMessage().should('include.text', information.required_errmessage)
    information.enterFirstName(data.last_name)
    information.getContinueButton().click()
    information.getErrorMessage().should('include.text', information.required_errmessage)
})
Then("Verify total product price", () => {

    let priceTotal = 0
    overview.getPriceItem().each(($el, index, length) => {
        cy.wrap($el).invoke('text').then((text) => {
            priceTotal += Number(text.substring(1))
        });
    }).then(() => {
        overview.getTotalProductPrice().invoke('text').then(text => {
            const labelItemTotal = Number(text.split('$')[1])
            cy.wrap(priceTotal).as('priceTotal')
            cy.wrap(priceTotal).then(priceTotalProduct => {
                expect(labelItemTotal).equal(priceTotalProduct)
            })
        })
    })
})
Then("Verify total product price and tax", () => {
    let priceAndTax = 0
    overview.getTaxPrice().invoke('text').then(text => {
        const tax = Number(text.split('$')[1])
        cy.get('@priceTotal').then(priceTotalProduct => {
            priceAndTax = priceTotalProduct + tax
        })
    })
    overview.getTotalPrice().invoke('text').then(text => {
        const totalPrice = Number(text.split('$')[1])
        cy.wrap(priceAndTax).then(total => {
            expect(total).equal(totalPrice)
        })
    })
})
Then("Finish the order", () => {
    overview.getFinishBtn().click()
})
Then("Verify order is finished", () => {

    complete.getTitlePage().should('include.text', complete.title_text)
    complete.getHeader().should('include.text', complete.complete_message)
    complete.getBackToHomeButton().click()
    product.getTitlePage().should('have.text', product.title_text)
})



