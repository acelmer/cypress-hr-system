describe('Login and registration', () => {
  it('Should log in to the website', () => {
    cy.logIn()
    cy.visit('/')
  })
})