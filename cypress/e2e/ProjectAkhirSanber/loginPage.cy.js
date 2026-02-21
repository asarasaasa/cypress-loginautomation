import LoginPage from "../../support/ProjectAkhirSanber/LoginPage"
import LoginPage from "../../support/ProjectAkhirSanber/LoginPage"
import DasboardPage from "../../support/ProjectAkhirSanber/DashboardPage"
import DashboardPage from "../../support/ProjectAkhirSanber/DashboardPage"

Cypress.on('uncaught:exception', (err, runnable) => {
  return false 
})

describe('TC_Login - Login Feature', () => {

  beforeEach(() => {
    LoginPage.visit();
  })

  it('TC_001 - User dapat login menggunakan data valid',() => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginsuccess');
    LoginPage.login(loginPageData.validUser.username, loginPageData.validUser.password)
    cy.wait('@loginsuccess')
    DasboardPage.VerifyOnDashboard()
    DasboardPage.DashboardVisible()
  })

  it('TC_002 - User dapat login setelah logout sebelumnya ', () => {
    
    // login pertama
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginsuccess');
    LoginPage.login(loginPageData.validUser.username, loginPageData.validUser.password)
    cy.wait('@loginsuccess')
    DasboardPage.VerifyOnDashboard()

    // logout
    LoginPage.logout()

    // login kembali
    LoginPage.includeLogin()
    cy.wait(2000)
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('Relogin');
    LoginPage.login(loginPageData.validUser.username, loginPageData.validUser.password)
    cy.wait('@Relogin')

    DasboardPage.VerifyOnDashboard()
    DashboardPage.DashboardVisible()
  })

  it('TC_003 -User dapat login pada username menggunakan huruf kecil', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginsuccess');
    LoginPage.login(loginPageData.upperlowerUser.username, loginPageData.upperlowerUser.password) 
    cy.wait('@loginsuccess')

    DasboardPage.VerifyOnDashboard()
    DashboardPage.DashboardVisible()
  })

  it('TC_004 - User tidak dapat login menggunakan data yang tidak valid', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginFailed');
    LoginPage.login(loginPageData.invaliddata.username, loginPageData.invaliddata.password)
    LoginPage.invalidCredential()
  })

  it('TC_005 - User tidak dapat login menggunakan username valid dan password invalid ', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginFailed');
    LoginPage.login(loginPageData.invalidPassword.username, loginPageData.invalidPassword.password)
    cy.wait('@LoginFailed')

    LoginPage.invalidCredential()
    LoginPage.includeLogin()
  })

  it('TC_006 - User tidak dapat login menggunakan username invalid dan password valid', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginFailed');
    LoginPage.login(loginPageData.invalidUser.username, loginPageData.invalidUser.password)
    cy.wait('@LoginFailed')

    LoginPage.invalidCredential()
    LoginPage.includeLogin()
  })

  it('TC_007 - User tidak dapat login pada username kosong dan password terisi', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginRequest');
    LoginPage.passwordInput(loginPageData.emptyUsername.password)
    LoginPage.submitButton()
    cy.get('@LoginRequest.all')

    LoginPage.RequiredVisible()
    LoginPage.includeLogin()  
  })

  it('TC_008 - User tidak dapat login pada username terisi dan password kosong', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginRequest');
    LoginPage.usernameInput(loginPageData.emptyPassword.username)
    LoginPage.submitButton()
    cy.get('@LoginRequest')

    LoginPage.RequiredVisible()
    LoginPage.includeLogin()
  })
  
  it('TC_009 - User tidak dapat login pada username dan password tidak diisi', () => {
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginRequest');
    LoginPage.submitButton()
    cy.get('@LoginRequest')
    LoginPage.includeLogin()
  })
})