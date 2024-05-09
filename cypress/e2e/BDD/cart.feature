Feature: Cart
    Scenario: Access Cart Page
        When I access cart in Product Page
        Then I Should go to Cart Page

    Scenario: See detail Product through Cart
    Given I add product to cart
    And I access cart in Product Page
    Then Verify product added to cart is correct

    Scenario: Remove Product through Cart
    Given I add product to cart
    And I access cart in Product Page
    Then Verify removed product should not exist

    Scenario: Remove One of Product through Cart before Checkout the Product
        Given I add two product to cart
        And I access cart in Product Page
        Then I Remove one of product
        Then Count total product before checkout
        Then I Checkout the product
        Then I Input customer data
        Then I Continue to Product overview
        Then Verify total product same as total checkout

    Scenario: Emptied Product through Cart before Checkout the Product
        Given I add product to cart
        And I access cart in Product Page
        Then Remove all product in cart
        Then Verify product is empty in cart

Scenario: Checkout the Product without fill the Customer Data
    Given I add product to cart
        And I access cart in Product Page
        Then I Checkout the product
        Then I Continue to Product overview
        Then I get error message, field is required

Scenario: Checkout the Product
 Given I add product to cart
        And I access cart in Product Page
        Then Count total product before checkout
        Then I Checkout the product
        Then I Input customer data
        Then I Continue to Product overview
        Then Verify total product same as total checkout
        And Verify total product price
        And Verify total product price and tax
        Then Finish the order
        And Verify order is finished

