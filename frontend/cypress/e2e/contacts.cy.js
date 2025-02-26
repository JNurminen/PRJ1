describe('Contacts Page', () => {

  // ajetaan ennen jokaista testiä
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

  // Testataan, että yhteystiedot renderöidään
  it('should add a new contact', () => {
    cy.contains('Create Contact').click();

    // Ensure the modal is open
    cy.get('.modal').should('be.visible');

    // Fill out the form
    cy.get('#name').type('james doe');
    cy.get('#email').type('james@testi.com');
    cy.get('#phone').type('1234567891');

    // Submit the form
    cy.get('form').submit();

    // Verify the contact was added
    cy.contains('james doe');
    cy.contains('james@testi.com');
    cy.contains('1234567891');
  });

   // Testataan, että yhteystiedon päivittäminen toimii
   it('should update an existing contact', () => {
    // Add a new contact first
    cy.contains('Create Contact').click();
    cy.get('.modal').should('be.visible');
    cy.get('#name').type('james doe');
    cy.get('#email').type('james@testi.com');
    cy.get('#phone').type('1234567891');
    cy.get('form').submit();
    cy.contains('james doe');
    cy.contains('james@testi.com');
    cy.contains('1234567891');

    // Open the update modal for the newly added contact
    cy.contains('james doe').parent().contains('Update').click();

    // Ensure the modal is open
    cy.get('.modal').should('be.visible');

    // Update the contact details
    cy.get('#name').clear().type('jane doe');
    cy.get('#email').clear().type('jane@testi.com');
    cy.get('#phone').clear().type('0987654321');

    // Submit the form
    cy.get('form').submit();

    // Verify the contact was updated
    cy.contains('jane doe');
    cy.contains('jane@testi.com');
    cy.contains('0987654321');
  });

  // Testataan, että yhteystiedon poistaminen toimii
  it('should delete an existing contact', () => {
    // Add a new contact first
    cy.contains('Create Contact').click();
    cy.get('.modal').should('be.visible');
    cy.get('#name').type('john doe');
    cy.get('#email').type('john@testi.com');
    cy.get('#phone').type('1234567890');
    cy.get('form').submit();
    cy.contains('john doe');
    cy.contains('john@testi.com');
    cy.contains('1234567890');

    // Delete the newly added contact
    cy.contains('john doe').parent().contains('Delete').click();

    // Verify the contact was deleted
    cy.contains('john doe').should('not.exist');
    cy.contains('john@testi.com').should('not.exist');
    cy.contains('1234567890').should('not.exist');
  });


});