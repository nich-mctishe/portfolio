Feature: Navigation & Layout
  As a user visiting the portfolio
  I want to see the main sections
  So I can navigate the site properly

  Scenario: Site loads all primary sections
    Given I open the portfolio homepage
    Then I should see the Hero section
    And I should see the Career Highlights section
    And I should see the Skills section
    And I should see the Work Experience section
    And I should see the Education section
    And I should see the Clients section
