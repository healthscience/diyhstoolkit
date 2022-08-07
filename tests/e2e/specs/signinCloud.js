// https://docs.cypress.io/api/introduction/api.html

describe('signin cloud check', () => {
  it('Visits the app root url, click connect enter username password click submit', () => {
    cy.visit('/')
    cy.get('button.connect-network').should('be.visible')
    cy.get('button.connect-network').click()
    cy.get('label.form-couple-type').contains('username')
    cy.get('input[id="usernamecloud"]').type('bioregion@caleai.com')
    cy.get('label.form-couple-type').contains('password')
    cy.get('input[id="passwordcloud"]').type('1234')
    cy.get('#cloud-submit').click()
    cy.get('.hon-square-status.active').should('be.visible')
  })
})
