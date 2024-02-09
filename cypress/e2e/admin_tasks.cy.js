const { faker } = require('@faker-js/faker');

describe('Administration tasks', () => {
    it('Should add a user', () => {
      cy.logIn()
      cy.visit('/admin/viewSystemUsers')                                                // Visit admin page
      cy.xpath('//button[contains(., "Add")]').click()                                  // Click on 'Add' button
      cy.xpath('//div[./div/label/text()="User Role"]').within(() => {                  // Select section with user role
        cy.contains('Select').click()                                                   // Click on dropdown
        cy.get('div[role="option"]').last().click()                                     // Select last option
      })
      cy.xpath('//div[./div/label/text()="Status"]').within(() => {                     // Select section with status
        cy.contains('Select').click()                                                   // Click on dropdown
        cy.get('div[role="option"]').last().click()                                     // Select last option
      })
      cy.xpath('//div[./div/label/text()="Employee Name"]').within(() => {              // Select section with name
        cy.intercept('GET', '**/employees**').as('employeesSearch')                     // Intercept employees search request
        cy.get('input').type('a')                                                       // Search username with 'a'
        cy.wait('@employeesSearch')
        cy.get('div[role="option"]').last().click()                                     // Select last option
      })
      let username = "Username-" + faker.string.uuid()                                  // Generate random username                                       
      cy.xpath('//div[./div/label/text()="Username"]//input').type(username)            // Set employee name
      let password = faker.internet.password()
      cy.xpath('//div[./div/label/text()="Password"]//input').type(password)            // Set password
      cy.xpath('//div[./div/label/text()="Confirm Password"]//input').type(password)    // Confirm password
      cy.get('button').contains('Save').click()                                         // Save user
      cy.contains('Successfully Saved').should('be.visible')                            // Validate success notification
    })

    it('Should add a job title', () => {
      cy.logIn()
      cy.visit('admin/viewJobTitleList')                                                    // Visit Job page
      cy.xpath('//button[contains(., "Add")]').click()                                      // Click on 'Add' button
      let jobTitle = 'Job-' + faker.string.uuid()                                           // Generate random job title
      cy.xpath('//div[./div/label/text()="Job Title"]//input').type(jobTitle)               // Set job title
      cy.xpath('//div[./div/label/text()="Job Description"]//textarea').type(faker.lorem.words(10)) // Set description
      cy.get('input[type=file]').selectFile({                                               // Upload a temporary file
        contents: Cypress.Buffer.from('File content'),
        fileName: 'file.txt',
      }, {force: true})
      cy.xpath('//div[./div/label/text()="Note"]//textarea').type(faker.lorem.words(10))    // Set note
      cy.get('button').contains('Save').click()                                             // Save job title
      cy.contains('Successfully Saved').should('be.visible')                                // Validate success notification
    })

    it('Should update organization details', () => {
      cy.logIn()
      cy.visit('admin/viewOrganizationGeneralInformation')                                   // Visit Organization page
      cy.get('label').contains('Edit').click()                                               // Change to editable mode
      cy.xpath('//div[./div/label/text()="Organization Name"]//input').clear().type('Name')  // Set organization name
      cy.xpath('//div[./div/label/text()="Registration Number"]//input').clear().type('333') // Set registration number
      cy.xpath('//div[./div/label/text()="Phone"]//input').clear().type('700800900')         // Set registration number
      cy.get('button').contains('Save').click()                                              // Save data
      cy.contains('Successfully Updated').should('be.visible')                               // Validate success notification
    })

    it('Should add a skill', () => {
        cy.logIn()
        cy.visit('admin/viewSkills')                                                          // Visit skills page
        cy.xpath('//button[contains(., "Add")]').click()                                      // Click on 'Add' button
        let skillName = 'Skill-' + faker.string.uuid()                                        // Generate random skill name
        cy.xpath('//div[./div/label/text()="Name"]//input').type(skillName)                   // Set skill name
        cy.xpath('//div[./div/label/text()="Description"]//textarea').type(faker.lorem.words(10)) // Set description
        cy.get('button').contains('Save').click()                                             // Save skill
        cy.contains('Successfully Saved').should('be.visible')                                // Validate success notification
    })
})