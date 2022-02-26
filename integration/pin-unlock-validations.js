const userPassphrase =
  'boring over tilt regret diamond rubber example there fire roof sheriff always'

describe('Unlock pin should be persisted when store pin is enabled', () => {
  it('Create Account with store pin disabled', () => {
    //Go to URL, add a PIN and make sure that toggle for save pin is disabled
    cy.visit('/')
    cy.createAccountPINscreen('test001', false)

    //Follow the next steps to create an account
    cy.createAccountSecondScreen()
    cy.createAccountPrivacyTogglesGoNext()
    cy.createAccountRecoverySeed()
    cy.createAccountUserInput()
    cy.createAccountSubmit()

    //Wait until main page is loaded after creating account
    cy.get('.user-state > .is-rounded > .satellite-circle', {
      timeout: 120000,
    }).should('be.visible')

    // Go to main URL again and validate that user is prompt to enter pin again
    cy.visit('/').then(() => {
      cy.contains('Decrypt Account').should('be.visible')
    })
  })

  it('Create Account with store pin enabled', () => {
    //Go to URL, add a PIN and make sure that toggle for save pin is enabled
    cy.visit('/')
    cy.createAccountPINscreen('test002', true)

    //Follow the next steps to create an account
    cy.createAccountSecondScreen()
    cy.createAccountPrivacyTogglesGoNext()
    cy.createAccountRecoverySeed()
    cy.createAccountUserInput()
    cy.createAccountSubmit()

    //Wait until main page is loaded after creating account
    cy.get('.user-state > .is-rounded > .satellite-circle', {
      timeout: 120000,
    }).should('be.visible')

    // Go to main URL again and validate that user is redirected to chat screen and pin was saved
    cy.visit('/').then(() => {
      cy.get('#status > .user-state > .is-rounded > .satellite-circle', {
        timeout: 120000,
      }).should('be.visible')
    })
  })

  it('Import Account with store pin disabled', () => {
    //Go to URL, add a PIN and make sure that toggle for save pin is disabled
    cy.clearLocalStorage().then(() => {
      cy.visit('/')
      cy.importAccountPINscreen('test003', false)
    })

    //Follow the next steps to import an account
    cy.importAccountEnterPassphrase(userPassphrase)

    //Wait until main page is loaded after importing account
    cy.get('.user-state > .is-rounded > .satellite-circle', {
      timeout: 120000,
    }).should('be.visible')

    // Go to main URL again and validate that user is prompt to enter pin again
    cy.visit('/').then(() => {
      cy.contains('Decrypt Account').should('be.visible')
    })
  })

  it('Import Account with store pin enabled', () => {
    //Go to URL, add a PIN and make sure that toggle for save pin is enabled
    cy.visit('/')
    cy.importAccountPINscreen('test004', true)

    //Follow the next steps to import an account
    cy.importAccountEnterPassphrase(userPassphrase)

    //Wait until main page is loaded after importing account
    cy.get('.user-state > .is-rounded > .satellite-circle', {
      timeout: 120000,
    }).should('be.visible')

    // Go to main URL again and validate that user is redirected to chat screen and pin was saved
    cy.visit('/').then(() => {
      cy.get('#status > .user-state > .is-rounded > .satellite-circle', {
        timeout: 120000,
      }).should('be.visible')
    })
  })
})
