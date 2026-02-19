class loginPage {
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    }
    fillUsername(username) {
        cy.get('input[name="username"]').type(username) 
    } 
    fillPassword(password) {
        cy.get('input[name="password"]').type(password)                                                                       
    } 
    submit() {
        cy.get('button[type="submit"]').click() 
    }  
    ValidateInvalidCredentials() {
        cy.contains('Invalid credentials').should('be.visible')
    }
    verifyOnLoginPage() {
        cy.url().should('include', 'login')
    }
    ValidateRequiredField() {
        cy.contains('Required').should('be.visible')
    }
}
export default new loginPage()