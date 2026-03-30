Feature: Interactive Elements
  As a user exploring the portfolio
  I want to interact with links, buttons, theme togglers, and layout animations
  So I can experience the site natively and discover details

  Scenario: Dark Mode Persistence & Validation
    Given I open the portfolio homepage
    When I click the Theme Toggle button
    Then the site should switch to dark mode
    And the persistent theme should be saved in standard storage
    When I reload the page
    Then the site should still be in dark mode

  Scenario: Experience Highlights Expansion
    Given I open the portfolio homepage
    When I scroll to the Work Experience section
    And I click the "View all highlights" button on the first job
    Then the highlights container should expand its height
    And the chevron icon should rotate
    When I click the "Show less" button
    Then the highlights container should collapse

  Scenario: Education Synopsis Accordion
    Given I open the portfolio homepage
    When I scroll to the Education section
    And I click "View synopsis" on the first expandable course
    Then the synopsis text should become visible
    And the education chevron should point upwards
    
  Scenario: Mobile Hamburger Menu toggles properly
    Given I open the portfolio on a mobile device
    When I click the hamburger menu icon
    Then the navigation list should slide down and become visible
    When I click the hamburger menu icon again
    Then the navigation list should remain hidden
    
  Scenario: JSON-LD matches expected content
    Given I open the portfolio homepage
    Then the head should contain a JSON-LD structured data script
    And the JSON-LD should outline a Person entity mapping my name and title
