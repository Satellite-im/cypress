const faker = require('faker')
const randomWord = faker.lorem.word() // generate random word
const randomNumber = faker.datatype.number() // generate random number
const randomMessage = faker.lorem.sentence() // generate random sentence
const textToPaste = 'copy paste stuff'

it('Chat - Send stuff on chat', () => {
  cy.importAccount()
  cy.contains('aaaaa').click() // clicks on user name
  cy.get('.messageuser').type(randomMessage)
  cy.get('.messageuser').type('{enter}') // sending text message
  cy.contains(randomMessage)
  cy.get('#emoji-toggle > .control-icon').click()
  cy.get('[title="smile"]').click() // sending emoji
  cy.get('.messageuser').click()
  cy.get('.messageuser').type('{enter}')
  cy.contains('😄')
  cy.contains(randomMessage).rightclick()
  cy.contains('Edit Message').click()
  cy.get('.edit-message-body-input > p').click()
  cy.get('.edit-message-body-input > p').type(randomNumber) // editing message
  cy.get('.edit-message-body-input > p').type('{enter}')
  cy.contains(randomNumber)
})
