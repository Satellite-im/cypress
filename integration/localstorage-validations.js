describe('Verify passphrase does not get stored in localstorage', () => {
  it('Passphrase in localstorage does not exist before creating account', () => {
    cy.visit('/')
    cy.contains('Create Account Pin').then(() => {
      cy.validatePassphraseLocalStorage()
    })
  })

  it.skip('Create Account and validate localstorage values are as expected', () => {
    // Create Account process executed
    cy.createAccount()

    //Wait until main page is loaded after creating account
    cy.get('.user-state > .is-rounded > .satellite-circle', {
      timeout: 120000,
    }).should('be.visible')

    // Go to main URL and validate that previous passphrase is not stored in localstorage
    cy.visit('/').then(() => {
      cy.validatePassphraseLocalStorage()
    })
  })

  it('Passphrase in localstorage does not exist before importing an account', () => {
    cy.visit('/')
    cy.contains('Create Account Pin').then(() => {
      cy.validatePassphraseLocalStorage()
    })
  })

  it.skip('Import Account and verify passphrase is not saved in localstorage', () => {
    // Import Account process executed
    cy.importAccount()

    //Wait until main page is loaded after importing account
    cy.contains('asdad', { timeout: 60000 }).should('be.visible')

    // Go to URL and validate that previous passphrase is not stored in localstorage
    cy.visit('/').then(() => {
      cy.validatePassphraseLocalStorage()
    })
  })
})
