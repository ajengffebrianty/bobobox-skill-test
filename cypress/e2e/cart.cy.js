before(()=> {
    cy.visit('/')
    cy.fixture('global_data.json').as('data')
  })
  
  
  describe('Cart module test cases', () => {
   
    it('Access cart page', function () {
      
    })
    it('See Detail product through cart', function() {
  
    })
    it ('Remove product through cart', function() {
      
    })
    it ('Checkout the product', function() {

    })
    it ('Remove the product through cart list before checkout the product', function() {

    })
    it ('Checkout the product without fill the customer data', function () {

    })
  })