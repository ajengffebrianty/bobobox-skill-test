import { ProductPage } from "./pages/product";

const product = new ProductPage()
beforeEach(() => {
  cy.fixture('global_data').then((user) => {
    cy.login(user.username, user.password);
  });
})


describe('Product module test cases', () => {

  it('Filter product', function () {
    //sorting product Z to A
    cy.getListProduct().then(productList => {
      productList.sort((a, b) => b.product_name.localeCompare(a.product_name))
      product.sortingZtoA()
      cy.getListProduct().then(sortingZtoA => {
        expect(productList).to.deep.equal(sortingZtoA);
      })
    })

    //sorting product A to Z
    cy.getListProduct().then(productList => {
      productList.sort((a, b) => a.product_name.localeCompare(b.product_name))
      product.sortingAtoZ()
      cy.getListProduct().then(sortingAtoZ => {
        expect(productList).to.deep.equal(sortingAtoZ);
      })
    })

    //sorting price low to high
    cy.getListProduct().then(productList => {
      productList.sort((a, b) => a.product_price - b.product_price)
      product.sortingLowtoHigh()
      cy.getListProduct().then(sortingLtoH => {
        expect(productList).to.deep.equal(sortingLtoH);
      })
    })

    //sorting price high to low
    cy.getListProduct().then(productList => {
      productList.sort((a, b) => b.product_price - a.product_price)
      product.sortingHightoLow()
      cy.getListProduct().then(sortingHtoL => {
        expect(productList).to.deep.equal(sortingHtoL);
      })
    })
  })
  it('See Detail product', function () {

    product.getProductName().eq(1).invoke('text').then(productName => {
      product.clickDetailProduct(1)
      product.getDetailProductDescription().should('be.visible')
      product.getDetailProductName().should('have.text', productName)
      product.clickBacktoProduct()
    })

  })
  it('Add  product to cart through detail product page', function () {
    product.getButtonAddList().each(($el, index, list) => {
      let btn_text = $el.find('button').text()
      if (btn_text.includes('Add to cart')) {
        product.clickDetailProduct(index)
        product.clickAddtoCartDetail()
        product.getButtonRemoveDetail().should('be.visible')
        product.getBadgeCart().invoke('text').then((badge) => {
          const cartbadge = Number(badge)
          expect(cartbadge).to.be.gte(1)
        })
        return false
      }
    })
  })
  it('Remove product from cart through detail product page', function () {
    product.getButtonAddList().each(($el, index, list) => {
      let btn_text = $el.find('button').text()
      if (btn_text.includes('Remove')) {
        product.clickDetailProduct(index)
        product.getBadgeCart().invoke('text').then((badge) => {
          const cartbadge = Number(badge)
          product.clickRemoveCartDetail()
          product.getBadgeCart().then($parent => {
            const badge = $parent.find(product.getBadgeNumber())
            if (badge.length > 0) {
              product.getBadgeCart().invoke('text').then((finalBadge) => {
                const actualBadge = Number(finalBadge)
                expect(actualBadge).equal(cartbadge - 1)
              })
            } else {
              cy.get(product.getBadgeNumber()).should('not.exist')
            }
          })
        })
        return false
      }
    })
  })
  it('Add 1 Product to cart through list', function () {
    product.getBadgeCart().invoke('text').then((badge) => {
      const cartbadge = Number(badge)

      product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Add to cart')) {
          product.clickAddtoCartList(index)
          product.getBadgeCart().invoke('text').then((finalBadge) => {
            const actualBadge = Number(finalBadge)
            expect(actualBadge).equal(cartbadge + 1)
          })
          return false
        }
      })
    })
  })
  it('Add all product to cart through list', function () {

    product.getBadgeCart().invoke('text').then((badge) => {
      const cartbadge = Number(badge)
      let totalAdd = 0
      product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Add to cart')) {
          product.clickAddtoCartList(index)
          totalAdd += 1
        }
      })
      product.getBadgeCart().invoke('text').then((finalBadge) => {
        const actualBadge = Number(finalBadge)
        expect(actualBadge).equal(cartbadge + totalAdd)
      })
    })
  })
  it('Remove all product from cart through product list', function () {
    product.getBadgeCart().invoke('text').then((badge) => {
      const cartbadge = Number(badge)
      let totalAdd = 0
      product.getButtonAddList().each(($el, index, list) => {
        let btn_text = $el.find('button').text()
        if (btn_text.includes('Remove')) {
          product.clickRemoveCartList(index)
        }
      })
      cy.get(product.getBadgeNumber()).should('not.exist')
    })
  })
})