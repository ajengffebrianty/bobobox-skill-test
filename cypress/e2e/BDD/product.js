const { Before, Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import { LoginPage } from "../pages/login"
import { ProductPage } from "../pages/product"

const login = new LoginPage()
const product = new ProductPage()
const data = require('../../fixtures/global_data.json')

Before(() => {
    cy.login('standard_user', 'secret_sauce');
})

When("I at Product page", () => {
    product.getTitlePage().should('have.text', product.title_text)
})
Given("I do Sorting descending Product by Name", () => {
    cy.getListProduct().then(productList => {
        const sortedProductList = [...productList].sort((a, b) => b.product_name.localeCompare(a.product_name))
        cy.wrap(sortedProductList).as('sortedProductList')
        product.sortingZtoA()
    })
})
Given("I do Sorting Ascending Product by Name", () => {
    cy.getListProduct().then(productList => {
        const sortedProductList = [...productList].sort((a, b) => a.product_name.localeCompare(b.product_name))
        cy.wrap(sortedProductList).as('sortedProductList')
        product.sortingAtoZ()
    })
})
Given("I do Sorting Product by Price High to Low", () => {
    cy.getListProduct().then(productList => {
        const sortedProductList = [...productList].sort((a, b) => b.product_price - a.product_price)
        cy.wrap(sortedProductList).as('sortedProductList')
        product.sortingHightoLow()
    })
})
Given("I do Sorting Product by Price Low to High", () => {
    cy.getListProduct().then(productList => {
        const sortedProductList = [...productList].sort((a, b) => a.product_price - b.product_price)
        cy.wrap(sortedProductList).as('sortedProductList')
        product.sortingLowtoHigh()
    })
})

Then("Verify the product sort correctly", () => {
    cy.getListProduct().then(productList => {
        cy.get('@sortedProductList').then(sortedProductList => {
            expect(productList).to.deep.equal(sortedProductList); // Compare productList with the sortedProductList
        });
    });
})

Then("I see detail product", () => {
    product.getProductName().eq(1).invoke('text').then(productName => {
        cy.wrap(productName).as('productName')
        product.clickDetailProduct(1)
    })
})
Then("Verify the product detail showing", () => {
    product.getDetailProductDescription().should('be.visible')
    cy.get('@productName').then(productName => {
        product.getDetailProductName().should('have.text', productName)
    })
})

Then("Back to Product list", () => {
    product.clickBacktoProduct()
})

Then("See detail product that not in cart", () => {
    product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Add to cart')) {
            product.clickDetailProduct(index)
        }
        return false
    })
})
Then("Add the product to cart", () => {
    product.getButtonAddDetail().click()
    product.getButtonRemoveDetail().should('be.visible')
})
Then("Verify total product in cart is adding", () => {
    product.getBadgeCart().invoke('text').then((badge) => {
        const cartbadge = Number(badge)
        expect(cartbadge).to.be.gte(1)
    })
})


Then("See detail product that already in cart", () => {
    product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Remove')) {
            product.clickDetailProduct(index)
        }
        return false
    })
})
Then("Verify total product in cart before transaction", () => {
    product.getBadgeCart().invoke('text').then((badge) => {
        const cartbadge = Number(badge)
        cy.wrap(cartbadge).as('cartbadge')
    })
})
Then("Remove the product", () => {
    product.getButtonRemoveDetail().click()
})
Then("Verify total product in cart is minus one", () => {
    product.getBadgeCart().then($parent => {
        const badge = $parent.find(product.getBadgeNumber())
        if (badge.length > 0) {
            product.getBadgeCart().invoke('text').then((finalBadge) => {
                const actualBadge = Number(finalBadge)
                cy.get('@cartbadge').then(cartbadge => {
                    expect(actualBadge).equal(cartbadge - 1)
                })
            })
        } else {
            cy.get(product.getBadgeNumber()).should('not.exist')
        }
    })
})

Then("Add product in list to cart", () => {
    product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Add to cart')) {
            product.clickAddtoCartList(index)
        }

        return false
    })
})
Then("Verify total product in cart is adding plus one", () => {
    product.getBadgeCart().invoke('text').then((finalBadge) => {
        const actualBadge = Number(finalBadge)
        cy.get('@cartbadge').then(cartbadge => {
            expect(actualBadge).equal(cartbadge + 1)
        })
    })
})

Then("Add all product in list to cart", () => {
    let totalAdd = 0
    product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Add to cart')) {
            product.clickAddtoCartList(index)
            totalAdd +=1
        }
    }).then(() => {
        cy.wrap(totalAdd).as('totalAdd')
    })
})

Then("Verify total product in cart is added as much in list", () => {
    product.getBadgeCart().invoke('text').then((finalBadge) => {
        const actualBadge = Number(finalBadge)
        cy.get('@cartbadge').then(cartbadge => {
            cy.get('@totalAdd').then(totalAdd => {
                expect(actualBadge).equal(cartbadge + totalAdd)
            })
        })
    })
})

Then("Remove all product in list from cart", () => {
    product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Remove')) {
            product.clickRemoveCartList(index)
        }
    })
})
Then("Verify product in cart is empty", () => {
    cy.get(product.getBadgeNumber()).should('not.exist')
})
