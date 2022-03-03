describe('Version Release Notes Tests', () => {
  it('Release notes appear when clicking on version number', () => {
    cy.visit('/').then(() => {
      cy.releaseNotesScreenValidation()
    })
  })
})
