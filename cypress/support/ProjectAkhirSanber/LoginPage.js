class LoginPage {

    usernameInput(username) {
        cy.get('input[name="username"]').type(username);
    }

    passwordInput(password) {
        cy.get('input[name="password"]').type(password);
    }
    submitButton() {
        cy.get('button[type="submit"]').click();
    }
    userDropdown() {
        return cy.get('.oxd-userdropdown-tab');
    }
    logoutOption() {
        return cy.contains('Logout');
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
    }
    login(username, password) {
        this.usernameInput(username);
        this.passwordInput(password);
        this.submitButton();
    }
    logout() {
        this.userDropdown().should('exist').and('be.visible').click();
        this.logoutOption().should('exist').and('be.visible').click();
    }
    includeLogin(){
         cy.url().should('include', 'login');
    }
    invalidCredential() {
        cy.contains('Invalid credentials').should('be.visible');
    }
    RequiredVisible() {
        cy.contains('Required').should('be.visible');
    }
}
export default new LoginPage;