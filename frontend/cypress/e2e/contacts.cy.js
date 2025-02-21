describe('Contacts Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display the contacts page', () => {
    cy.contains('Contacts');
    cy.contains('Name');
    cy.contains('Email');
    cy.contains('Phone');
    cy.contains('Actions');
  });

  it('should add a new contact', () => {
    cy.contains('Create Contact').click();

    // Ensure the modal is open
    cy.get('.modal').should('be.visible');

    // Fill out the form
    cy.get('#Name:]').type('john doe');
    cy.get('#Email:').type('john@testi.com');
    cy.get('#Phone:').type('1234567890');

    // Submit the form
    cy.get('form').submit();

    // Verify the contact was added
    cy.contains('john doe');
    cy.contains('john@testi.com');
    cy.contains('1234567890');
  });

});