describe('Must NOT change the name', () => {
  it('Should login with sucess', () => {
    cy.visit('/#/login');
    cy.get('[id=inputEmailLogin]').type('blk321');
    cy.get('[id=inputEmailSenha]').type('123123');
    cy.get('[type=button]').click();
  });

  it('Should NOT change the profile name', () => {
    cy.get('[id=profileBtn]').click();
    cy.get('[id=gerProfileBtn]').click();
    cy.get('[id=inputNomeCadastro]').clear();
    cy.get('[id=btnUpdate]').click();
    cy.contains('Erro');
  });
});
