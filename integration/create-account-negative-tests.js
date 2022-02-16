const faker = require('faker')
const randomName = faker.internet.userName(name) // generate random name
const randomStatus = faker.lorem.word() // generate random status

it('Try to create account with PIN less than 5 digits', () => {
  cy.visit('/')
  cy.contains('Create Account Pin')
  cy.get('[data-cy=add-input]').type('1')
  cy.get('[data-cy=submit-input]').click()
  cy.contains('Pin must be at least 5 characters.')
  cy.reload()
  cy.get('[data-cy=submit-input]').click()
  cy.contains('Pin must be at least 5 characters.')
})

it('Try to create account without username', () => {
  cy.visit('/')
  cy.get('[data-cy=add-input]').type('test001', { log: false })
  cy.get('[data-cy=submit-input]').click()
  cy.get('.is-primary > #custom-cursor-area').click()
  cy.contains('Continue').click()
  cy.contains('I Saved It').click()
  Cypress.on('uncaught:exception', (err, runnable) => false) // temporary until AP-48 gets fixed
  cy.get('[data-cy=sign-in-button]').click()
  cy.contains('Username must be at least 5 characters.')
})

it('Try to create account with NSFW image', () => {
  //Creating pin, clicking on buttons to continue to user data screen
  cy.visit('/')
  cy.get('[data-cy=add-input]').type('test001', { log: false })
  cy.get('[data-cy=submit-input]').click()
  cy.get('.is-primary > #custom-cursor-area').click()
  cy.contains('Continue').click()
  cy.contains('I Saved It').click()
  Cypress.on('uncaught:exception', (err, runnable) => false) // temporary until AP-48 gets fixed
  //Adding random data in user input fields
  cy.get('[data-cy=username-input]').type(randomName)
  cy.contains('Status')
  cy.get('[data-cy=status-input]').type(randomStatus)
  //Attempting to add NSFW image and validating error message is displayed
  const filepath = 'images/negative-create-account-test.png'
  cy.get('.is-outlined > #custom-cursor-area').click()
  cy.get('.input-file').attachFile(filepath)
  cy.get('.red', { timeout: 10000 }).should(
    'have.text',
    'Unable to upload file/s due to NSFW status',
  )
})
