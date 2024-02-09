const { faker } = require('@faker-js/faker');

describe('Project management', () => {
  it('Should add records to a timesheet', () => {
    cy.logIn()
    cy.visit('/time/viewMyTimesheet')
    cy.get('button').contains('Edit').click()                                         // Click on edit timesheet button
    cy.intercept('GET', '**/project**').as('projectSearch')                           // Intercept project search request
    cy.get('input[placeholder="Type for hints..."').clear().blur().type('a')          // Search project with 'a'      
    cy.wait('@projectSearch')                                                         // Wait for projects request
    cy.get('div[role="option"]').last().click()                                       // Select last project
    cy.contains('Select').click()                                                     // Click on select activity button
    cy.xpath('//div[@role="option" and not(contains(.,"No Records Found"))]').last().click() // Select last activity
    cy.xpath('//td[./button]//input').first().clear().type('08:00')                   // Set 08:00 in the timesheet
    cy.get('button').contains('Save').click()                                         // Click on save button
    cy.contains('Successfully Saved').should('be.visible')                            // Notification should be visible
  })

  it('Should add a project', () => {
    cy.logIn()
    cy.visit('/time/viewProjects')
    cy.xpath('//button[contains(., "Add")]').click()                                  // Click on Add project button
    let projectName = 'Project-' + faker.string.uuid()                                // Generate project name
    cy.xpath('//div[./div/label/text()="Name"]//input').type(projectName)             // Set project name
    cy.xpath('//div[./div/label/text()="Description"]//textarea').type(faker.lorem.words(10)) // Set description
    cy.xpath('//div[./div/label/text()="Customer Name"]').within(() => {              // Select section with customer name
      cy.intercept('GET', '**/customers**').as('customersSearch')                     // Intercept customers search request
      cy.get('input').type('a')                                                       // Search username with 'a'
      cy.wait('@customersSearch')                                                     // Wait for customers request to end
      cy.get('div[role="option"]').last().click()                                     // Select last option
    })
    cy.xpath('//div[./div/label/text()="Project Admin"]').within(() => {              // Select section with project admin
      cy.intercept('GET', '**/project-admins**').as('adminsSearch')                   // Intercept admins search request
      cy.get('input').type('a')                                                       // Search username with 'a'
      cy.wait('@adminsSearch')                                                        // Wait for admins request to end
      cy.get('div[role="option"]').last().click()                                     // Select last option
    })
    cy.get('button').contains('Save').click()                                         // Click on save project
    cy.contains('Successfully Saved').should('be.visible')                            // Notification should be visible
  })

  it('Should add a customer', () => {
    cy.logIn()
    cy.visit('/time/viewCustomers')
    cy.xpath('//button[contains(., "Add")]').click()                                  // Click on Add customer
    let customerName = 'Customer-' + faker.string.uuid()                              // Generate customer name
    cy.xpath('//div[./div/label/text()="Name"]//input').type(customerName)            // Set customer name
    cy.xpath('//div[./div/label/text()="Description"]//textarea').type(faker.lorem.words(10)) // Set description
    cy.get('button').contains('Save').click()                                         // Click on save customer
    cy.contains('Successfully Saved').should('be.visible')                            // Notification should be visible
  })
})