import FPdata from '../../fixtures/ProjectAkhirSanber/FPdata.json'
import ForgotPasswordPage from '../../support/ProjectAkhirSanber/ForgotPasswordPage.js'
import LoginPage from '../../support/ProjectAkhirSanber/LoginPage.js'

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
        ForgotPasswordPage.usernameInput().type(FPdata.validUser.username)
        ForgotPasswordPage.clickResetPassword()
        cy.wait('@ResetPassword', {timeout: 1200000})
        ForgotPasswordPage.successMessage({timeout: 1200000})
        ForgotPasswordPage.verifySuccessMessage()
    })

    it('TC_FP002 - Validasi ketika username kosong', () => {
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('ResetPassword');
        ForgotPasswordPage.forgotLink()
        ForgotPasswordPage.resetPasswordButton()
        cy.get('@ResetPassword') 
        ForgotPasswordPage.urlRestPasswordCode()
    })
})