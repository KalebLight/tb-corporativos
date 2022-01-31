describe('Must complete the process of login and logout', () => {
  it('Should login', () => {
    cy.visit('/#/login');
    cy.get('[id=inputEmailLogin]').type('blk321');
    cy.get('[id=inputEmailSenha]').type('123123');
    cy.get('[type=button]').click();
  });

  it('Should logout', () => {
    cy.get('[id=profileBtn]').click();
    cy.get('[id=sairBtn]').click();
    cy.contains('Seja bem-vindo ao TattooBook! Entrar');
  });
});
