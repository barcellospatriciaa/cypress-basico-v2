Cypress._.times(3, ()=>{
    it.only('#19 - testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');
    
        cy.contains('Talking About Testing').should('be.visible');
    });
})
