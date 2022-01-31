describe('Must NOT complete the login', () => {
  it('Should not login', () => {
    cy.visit('/#/login');

    cy.get('[id=inputEmailLogin]').type('blk111');
    cy.get('[id=inputEmailSenha]').type('123123');
    cy.get('[type=button]').click();
    cy.contains('Impossível fazer login com as credenciais fornecidas.');
  });
});
