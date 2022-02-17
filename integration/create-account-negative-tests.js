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
  //Creating pin, clicking on buttons to continue to user data screen
  cy.accountCreationFirstSteps()
  cy.get('[data-cy=sign-in-button]').click()
  cy.contains('Username must be at least 5 characters.')
})

it('Try to create account with NSFW image', () => {
  //Creating pin, clicking on buttons to continue to user data screen
  cy.accountCreationFirstSteps()
  //Adding random data in user input fields
  cy.accountCreationFillRandomData()
  //Attempting to add NSFW image and validating error message is displayed
  const filepath = 'images/negative-create-account-test.png'
  cy.accountCreationAddImage(filepath)
  cy.get('.red', { timeout: 10000 }).should(
    'have.text',
    'Unable to upload file/s due to NSFW status',
  )
})
