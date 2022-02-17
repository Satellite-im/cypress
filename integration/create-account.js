const faker = require('faker')
const randomName = faker.internet.userName(name) // generate random name
const randomStatus = faker.lorem.word() // generate random status
const filepathCorrect = 'images/logo.png'

it('Create Account', () => {
  cy.visit('/')
  cy.url().should('contains', '/#/auth/unlock')
  cy.contains('Create Account Pin')
  cy.contains("The pin can be anything you want, just don't forget it.")
  cy.contains('Choose Your Pin')
  cy.get('[data-cy=add-input]').type('test001', { log: false })
  cy.contains('Store Pin? (Less Secure)')
  cy.get('[data-cy=submit-input]').click()
  cy.contains(
    "We're going to create an account for you. On the next screen, you'll see a set of words. Screenshot this or write it down. This is the only way to backup your account.",
  )
  cy.get('.is-primary > #custom-cursor-area').click()
  cy.contains('Privacy Settings')
  cy.contains(
    'Choose which features to enable to best suit your privacy preferences.',
  )
  cy.contains('Register Username Publicly')
  cy.contains(
    'Publicly associate your account ID with a human readable username. Anyone can see this association.',
  )
  cy.contains(
    "Store your account pin locally so you don't have to enter it manually every time. This is not recommended.",
  )
  cy.contains('Display Current Activity')
  cy.contains(
    "Allow Satellite to see what games you're playing and show them off on your profile so friends can jump in.",
  )
  cy.contains('Enable External Embeds')
  cy.contains(
    'Allow Satellite to fetch data from external sites in order to expand links like Spotify, YouTube, and more.',
  )
  cy.get('.switch-button').each(($btn, index, $List) => {
    if ($btn.hasClass('enabled')) {
      cy.wrap($btn).click().should('not.have.class', 'enabled')
    } else {
      cy.wrap($btn).click().should('have.class', 'enabled')
    }
  })
  cy.get('#custom-cursor-area').click()
  cy.get('.title').should('contain', 'Recovery Seed')
  cy.get('#custom-cursor-area').click()
  cy.contains('Customize how the world sees you, choose something memorable.', {
    timeout: 10000,
  }).should('be.visible')
  cy.contains('Username')
  Cypress.on('uncaught:exception', (err, runnable) => false) // temporary until AP-48 gets fixed
  cy.get('[data-cy=username-input]').type(randomName)
  cy.contains('Status')
  cy.get('[data-cy=status-input]').type(randomStatus)
  cy.get('.is-outlined > #custom-cursor-area').click()
  cy.get('.input-file').attachFile(filepathCorrect)
  cy.contains('Crop', { timeout: 20000 }).click()
  cy.get('[data-cy=sign-in-button]').click()
  cy.contains('Linking Satellites...')
})

it('Create account with non-NSFW after attempting to load a NSFW image', () => {
  //Creating pin, clicking on buttons to continue to user data screen
  cy.accountCreationFirstSteps()
  //Adding random data in user input fields
  cy.accountCreationFillRandomData()
  //Attempting to add NSFW image and validating error message is displayed
  const filepathNsfw = 'images/negative-create-account-test.png'
  cy.accountCreationAddImage(filepathNsfw)
  cy.get('.red', { timeout: 30000 }).should(
    'have.text',
    'Unable to upload file/s due to NSFW status',
  )
  //Now adding a non-NSFW image and validating user can pass to next step
  const filepath = 'images/negative-create-account-test.png'
  cy.accountCreationAddImage(filepathCorrect)
  cy.contains('Crop', { timeout: 10000 }).click()
  cy.get('.red').should('not.exist')
  cy.get('[data-cy=sign-in-button]').click()
  cy.contains('Linking Satellites...')
})

it('Create account successfully without image after attempting to add a NSFW picture', () => {
  //Creating pin, clicking on buttons to continue to user data screen
  cy.accountCreationFirstSteps()
  //Adding random data in user input fields
  cy.accountCreationFillRandomData()
  //Attempting to add NSFW image and validating error message is displayed
  const filepathNsfw = 'images/negative-create-account-test.png'
  cy.accountCreationAddImage(filepathNsfw)
  cy.get('.red', { timeout: 30000 }).should(
    'have.text',
    'Unable to upload file/s due to NSFW status',
  )
  //User is still able to sign in and NSFW image will not be loaded
  cy.get('[data-cy=sign-in-button]').click()
  cy.contains('Linking Satellites...')
  //Validating profile picture is null and default satellite circle is displayed
  cy.get('.user-state > .is-rounded > .satellite-circle', {
    timeout: 40000,
  }).should('exist')
})
