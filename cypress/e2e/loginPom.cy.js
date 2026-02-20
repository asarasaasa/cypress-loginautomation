import DashboardPage from "../support/dashboardPage.js";
import loginPage from "../support/loginPage.js";
import loginData from "../fixtures/loginData.json";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false 
})

describe('TC_Login - Login Feature', () => {

  beforeEach(() => {
    loginPage.visit()
  })

  it('TC_001 - Pengguna dapat login menggunakan username dan password benar', () => {

     loginPage.fillUsername(loginData.validUsername)
     loginPage.fillPassword(loginData.validPassword)
     loginPage.submit() 
     DashboardPage.verifyOnDashboard()

     DashboardPage.dashboardVisible()
  })

  it('TC_002 - Pengguna tidak dapat login menggunakan username dan password salah', () => {

    loginPage.fillUsername(loginData.invalidUsername1)
    loginPage.fillPassword(loginData.invalidPassword1)
    loginPage.submit()
    loginPage.ValidateInvalidCredentials()
  })

  it('TC_003 - Pengguna tidak dapat login menggunakan username benar dan password salah', () => {

    loginPage.fillUsername(loginData.validUsername)
    loginPage.fillPassword(loginData.invalidPassword2)
    loginPage.submit()
    loginPage.ValidateInvalidCredentials()  

    loginPage.verifyOnLoginPage()
  })

  it('TC_004 - Pengguna tidak dapat login menggunakan username salah dan password benar', () => {

    loginPage.fillUsername(loginData.invalidUsername2)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()
    loginPage.ValidateInvalidCredentials()

    loginPage.verifyOnLoginPage()
  })

  it('TC_005 - Pengguna dapat login kembali setelah logout', () => {

    // login pertama
    loginPage.fillUsername(loginData.validUsername)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()

    DashboardPage.verifyOnDashboard()

    // logout
    DashboardPage.clickUserDropdown()
    DashboardPage.clickLogout()

    // login kembali
    loginPage.verifyOnLoginPage()
    cy.wait(2000)
    loginPage.fillUsername(loginData.validUsername)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()

    DashboardPage.verifyOnDashboard()
    DashboardPage.dashboardVisible()
  })

  it('TC_006 - Pengguna dapat login pada huruf awal username menggunakan huruf kecil', () => {
    
    loginPage.fillUsername(loginData.usernameCaseInsensitive)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()
    DashboardPage.verifyOnDashboard()
    DashboardPage.dashboardVisible()
  })

  it('TC_007 - Pengguna tidak dapat login saat username tidak diisi dan password diisi', () => {

    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()
    loginPage.ValidateRequiredField()
    loginPage.verifyOnLoginPage()
  })

  it('TC_008 - Pengguna tidak dapat login saat username diisi dan password tidak terisi', () => {

    loginPage.fillUsername(loginData.validUsername)
    loginPage.submit()
    loginPage.ValidateRequiredField()
    loginPage.verifyOnLoginPage()

  })

  it('TC_009 - Pengguna tidak dapat login saat username dan password tidak terisi', () => {

    loginPage.submit()
    loginPage.verifyOnLoginPage()
  })
})