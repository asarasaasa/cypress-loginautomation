class ForgotPasswordPage {
    usernameInput() {
        return cy.get('input[name="username"]');
    }
    resetPasswordButton() {
        return cy.contains('button', 'Reset Password');
    }
    forgotLink() {
        return cy.contains('Forgot').click();
    }
    successMessage() {
        return cy.contains('Reset Password link sent successfully');
    }
    openForgotPassword() {
        this.forgotLink().should('be.visible').click();
    }
    typeUsername(username) {
        this.usernameInput().clear().type(username);
    }
    clickResetPassword() {
        this.resetPasswordButton().should('be.visible').and('not.be.disabled').click();
    }
    verifySuccessMessage() {
        this.successMessage().should('be.visible');
    }
    urlRestPasswordCode() {
        cy.url().should('include', 'requestPasswordResetCode');
    }
}
export default new ForgotPasswordPage();