before(()=> {
  cy.visit('/')
  cy.fixture('global_data.json').as('data')
})


describe('Login module test cases', () => {
 
  it('Login to saucedemo', function () {
    
  })
  it('Login to saucedemo without fill the field', function() {

  })
  it('Login to saucedemo using wrong username', function() {

  })
  it ('Login to saucedemo using locked out user', function() {
    
  })
})