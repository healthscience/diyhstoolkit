// https://docs.cypress.io/api/introduction/api.html

describe('check help modal', () => {
  it('Visits the app root url, click connect enter username password click submit', () => {
    cy.visit('/')
    cy.get('#help-live').should('be.visible')
    cy.get('.help-section').should('be.not.visible')
    cy.get('button#help-live').click()
    cy.get('.help-section').should('be.visible')
    /* cy.get('label.form-couple-type').contains('password')
    cy.get('input[id="passwordcloud"]').type('1234')
    cy.get('#cloud-submit').click() */
  })
})
