// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// cypress/support/commands.js

Cypress.Commands.add('login', (username, password) => {
    // Perform login logic here, such as visiting the login page and filling in the credentials
    cy.visit('/');
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click()
  });

  Cypress.Commands.add('getListProduct', () => {
    const product = [];
    var product_name
    var product_price
    cy.get('.inventory_item_description').each(($el, index, list) => {
      cy.get('.inventory_item_name').eq(index).invoke('text').then((text) => {
        product_name = text.trim()
      }).then(() => {
        cy.get('.inventory_item_price').eq(index).invoke('text').then((text) => {
          product_price = Number(text.trim().substring(1))
        }).then(() => {
          const object = {
            product_name: product_name,
            product_price: product_price,
          };
          product.push(object);
        })
      })
    }).then(()=>{
        return product
    })
  })

  Cypress.Commands.add('addProduct', () => {
    cy.get(".pricebar").each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Add to cart')) {
            cy.get('.inventory_item_name ').eq(index).click()
            cy.get('#add-to-cart').click()
          return false
        }
      })
  })
  
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })