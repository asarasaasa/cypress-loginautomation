import FPdata from '../../fixtures/ProjectAkhirSanber/FPdata.json'
import ForgotPasswordPage from '../../support/ProjectAkhirSanber/ForgotPasswordPage'
import LoginPage from '../../support/ProjectAkhirSanber/LoginPage'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false 
})

describe('TC_Login - Login Feature', () => {
    beforeEach(() => {
    LoginPage.visit();
    })
    it('TC_FP001 - User berhasil reset password dengan username valid', () => {

        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('ResetPassword');
        ForgotPasswordPage.forgotLink()
        //cy.contains('Forgot').click()   
        ForgotPasswordPage.usernameInput().type(FPdata.validUser.username)
        //cy.get('input[name="username"]').type('Admin')
        ForgotPasswordPage.clickResetPassword()
        //cy.contains('Reset Password').should('be.visible').and('not.be.disabled').click()
        cy.wait('@ResetPassword', {timeout: 70000})
        ForgotPasswordPage.successMessage({timeout: 70000})
        ForgotPasswordPage.verifySuccessMessage()
        //cy.contains('Reset Password link sent successfully', {timeout: 70000}).should('be.visible')
    })
    it('TC_FP002 - Validasi ketika username kosong', () => {
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('ResetPassword');
        ForgotPasswordPage.forgotLink()
        ForgotPasswordPage.resetPasswordButton()
        //cy.contains('Forgot').click()
        //cy.contains('Reset Password').click()
        cy.get('@ResetPassword') 
        ForgotPasswordPage.urlRestPasswordCode()
        //cy.url().should('include', 'requestPasswordResetCode')
    })
})