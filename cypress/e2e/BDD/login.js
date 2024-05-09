const { Before, Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import {LoginPage} from "../pages/login"
import { ProductPage } from "../pages/product"

const login = new LoginPage()
const product = new ProductPage()
const data = require('../../fixtures/global_data.json')

  
Given("I visit saucedemo.com", () => {
    cy.visit("/");
    login.clickLogin()
    login.getErrorMessage().should('include.text', login.required_message)
});
Then("I didnt fill the username and password", () => {
    login.enterUsername(`{backspace}`)
    login.enterPassword(`{backspace}`)
})

Then ("I input correct username", () => {
    login.enterUsername(data.username)
})

Then ("I input wrong username", () => {

    login.enterUsername(data.invalid_user)
})


Then ("I input locked username", () => {

    login.enterUsername(data.lock_user)
})


Then ("I input correct password", () => {
    login.enterPassword(data.password)
})

Then ("I input wrong password", () => {
    login.enterPassword(data.invalid_password)
})

Then("I get error message, field is required", () => {
    login.getErrorMessage().should('include.text', login.required_message)
})

Then("I get error message, username and password do not match", ()=> {

    login.getErrorMessage().should('include.text', login.wronguser_message)
})

Then("I get error message, User locked", ()=> {
    login.getErrorMessage().should('include.text', login.locked_message)
})


Then("I click login button", () => {
    login.clickLogin()
})

Then("Login success",()=> {
    product.getTitlePage().should('have.text', product.title_text)
    product.getFilterProduct().should('be.visible')
    product.getListMenu().should('be.visible')
    product.getShoppingCart().should('be.visible')
})

