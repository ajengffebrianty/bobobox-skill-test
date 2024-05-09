Feature: Product
    Scenario: Sorting Product

        When I at Product page
        Given I do Sorting descending Product by Name
        Then Verify the product sort correctly
        Given I do Sorting Ascending Product by Name
        Then Verify the product sort correctly
        Given I do Sorting Product by Price High to Low
        Then Verify the product sort correctly
        Given I do Sorting Product by Price Low to High
        Then Verify the product sort correctly

    Scenario: See Detail Product
        When I at Product page
        Then I see detail product
        Then Verify the product detail showing
        Then Back to Product list

    Scenario: Add  Product to Cart through Detail Product Page
        When I at Product page
        Then See detail product that not in cart
        And Add the product to cart
        Then Verify total product in cart is adding

    Scenario: Remove Product from Cart through Detail Product Page
        When I at Product page
        Then See detail product that already in cart
        And Verify total product in cart before transaction
        Then Remove the product
        And Verify total product in cart is minus one

    Scenario: Add 1 Product to Cart through Product List
        When I at Product page
        Then Verify total product in cart before transaction
        Then Add product in list to cart
        Then Verify total product in cart is adding plus one
    Scenario: Add All Product to Cart through Product List
        When I at Product page
        Then Verify total product in cart before transaction
        Then Add all product in list to cart
        Then Verify total product in cart is added as much in list

    Scenario: Remove All product from Cart through Product List
        When I at Product page
        Then Verify total product in cart before transaction
        Then Remove all product in list from cart
        Then Verify product in cart is empty
