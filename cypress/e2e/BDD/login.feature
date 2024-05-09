Feature: Login
    Scenario: Login to saucedemo without fill the field
        Given I visit saucedemo.com
        Then I didnt fill the username and password
        And I click login button
        Then I get error message, field is required

    Scenario: Login to Saucedemo Using Wrong Username
        Given I visit saucedemo.com
        Then I input wrong username
        And I input correct password
        And I click login button
        Then I get error message, username and password do not match
    
    Scenario: Login to Saucedemo Using Wrong Password
        Given I visit saucedemo.com
        Then I input correct username
        And I input wrong password
        Then I click login button
        Then I get error message, username and password do not match

    Scenario: Login to Saucedemo Using Locked Out User
    Given I visit saucedemo.com
        Then I input locked username
        And I input correct password
        Then I click login button
        Then I get error message, User locked
    
     Scenario: Login to Saucedemo
    Given I visit saucedemo.com
        Then I input correct username
        And I input correct password
        Then I click login button
        Then Login success

