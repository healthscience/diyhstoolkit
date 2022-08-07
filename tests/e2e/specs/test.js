// https://docs.cypress.io/api/introduction/api.html

describe('home page check', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('div[class=toolbar-top]').contains('Welcome Peer')
    cy.get('div[id=peer-being]').should('be.visible')
    cy.get('div[id=peer-pages]').should('be.visible')
    cy.get('div[id=peer-settings]').should('be.visible')
    /* cy.get('[newtwork-status]').should('be.visible') */
  })
})

describe('home component check', () => {
  it('home information on load', () => {
    cy.visit('/')
    cy.get('div[class=home]').should('be.visible')
    cy.get('div[id=diy-summary]').contains('BentoBox - DS')
    cy.get('div[id=interface]').should('be.visible')
    cy.get('div[id=bentobox-datascience]').should('be.visible')
    cy.get('div[class=network-experiments]').should('be.visible')
    cy.get('div[id=view-flows]').should('not.be.visible')
    cy.get('div[id=network-protocol]').should('not.be.visible')
  })
})

describe('status component check', () => {
  it('connection information on load', () => {
    cy.visit('/')
    cy.get('div[class=toolkit-settings]').should('be.visible')
    /* cy.get('div[id=]').contains('BentoBox - DS')
    cy.get('div[id=]').should('be.visible')
    cy.get('div[id=]').should('be.visible')
    cy.get('div[class=]').should('be.visible')
    cy.get('div[id=]').should('not.be.visible')
    cy.get('div[id=]').should('not.be.visible') */
  })
})
