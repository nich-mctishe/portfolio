Feature: Content Discovery
  As a visitor
  I want to see the key sections of the portfolio
  So I can understand the candidate's background

  Scenario: Home page displays all major sections
    Given I open the portfolio homepage
    Then I should see the Hero section
    And I should see the Skills section
    And I should see the Work Experience section
    And I should see the Education section
    And I should see the Clients section
    And I should see the Career Highlights section
    And I should see "Nicholas Headlong" in the page
