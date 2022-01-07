const faker = require('faker')
const randomWord = faker.lorem.word() // generate random word
const randomNumber = faker.datatype.number() // generate random number
const randomMessage = faker.lorem.sentence() // generate random sentence
const textToPaste = 'copy paste stuff'

it('Chat - Send stuff on chat', () => {
  cy.importAccount()
  cy.contains('aaaaa').click() //clicks on user name
  cy.get('.messageuser').type(randomMessage)
  cy.get('.messageuser').type('{enter}') //to send out a written message
  cy.contains(randomMessage)
  cy.get('#emoji-toggle > .control-icon').click()
  cy.get('[title="smile"]').click() //to send out a emoji
  cy.get('.messageuser').click()
  cy.get('.messageuser').type('{enter}')
  cy.contains('😄')
  cy.contains(randomMessage).rightclick()
  cy.contains('Edit Message').click()
  cy.get('.edit-message-body-input > p').click()
  cy.get('.edit-message-body-input > p').type(randomNumber)
  cy.get('.edit-message-body-input > p').type('{enter}')
  cy.contains(randomNumber)
  /*
  cy.contains('Reply').click() //to reply on a thread - to be added when AP-271 is fixed
  cy.contains('Reply to')
  cy.get('.messageuser').type(randomWord)
  cy.get('.messageuser').type('{enter}')
  */
  // add copy paste test
})
