describe("Test Suite for Login to Satellite.IM Site - Luis first task", () => {
    before(() => {
        cy.visit("https://dev.satellite.one/") // baseURL should be setup in cypress.json
        // First command - Create PIN (sending the PIN value as a parameter)
        //Here we pass the PIN and click on the arrow button
        cy.get('.input').type("12345") // This pin should be stored into cypresss.json.env file since it is sensitive data
        cy.get('.button').click()
        //Click on create account button
        cy.get('.is-primary > #custom-cursor-area').click()
    })

    it("Click on all toggle buttons and validate the status changed to the opposite", () => {
        //Second Command - Identify buttons, click in all of them and validate status changed
        cy.get('.switch-button').each(($btn, index, $List) => {
            if ($btn.hasClass("enabled")) {
                cy.wrap($btn).click().should('not.have.class', 'enabled')     
            } else {
                cy.wrap($btn).click().should('have.class', 'enabled')     
            }
        })
        //Finally click on "Continue" and ensured we are redirected to "Recovery Seed" page (which marks the end of our test) 
        cy.get('#custom-cursor-area').click()
        cy.get('.title').should('contain', 'Recovery Seed')
    })
})