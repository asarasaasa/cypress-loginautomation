import dashboardPage from "../support/dashboardPage.js";
import loginPage from "../support/loginPage.js";
import loginData from "../fixtures/loginData.json";



Cypress.on('uncaught:exception', (err, runnable) => {
  return false 
})

describe('TC_Login - Login Feature', () => {

  beforeEach(() => {
    //cy.visit('https://opensource-demo.orangehrmlive.com/')
    loginPage.visit()
  })

  it('TC_001 - Pengguna dapat login menggunakan username dan password benar', () => {

     loginPage.fillUsername(loginData.validUsername)
     loginPage.fillPassword(loginData.validPassword)
     loginPage.submit() 
     dashboardPage.verifyOnDashboard()

     dashboardPage.dashboardVisible()
    //cy.get('input[name="username"]').type('Admin')
    //cy.get('input[name="password"]').type('admin123')
    //cy.get('button[type="submit"]').click()
    //cy.url().should('include', '/dashboard')

    //cy.contains('Dashboard').should('be.visible')
  })

  it('TC_002 - Pengguna tidak dapat login menggunakan username dan password salah', () => {

    loginPage.fillUsername(loginData.invalidUsername1)
    loginPage.fillPassword(loginData.invalidPassword1)
    loginPage.submit()
    loginPage.ValidateInvalidCredentials()
    //cy.get('input[name="username"]').type('suara')
    //cy.get('input[name="password"]').type('suara123')
    //cy.get('button[type="submit"]').click()
    //cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC_003 - Pengguna tidak dapat login menggunakan username benar dan password salah', () => {

    loginPage.fillUsername(loginData.validUsername)
    loginPage.fillPassword(loginData.invalidPassword2)
    loginPage.submit()
    loginPage.ValidateInvalidCredentials()  

    loginPage.verifyOnLoginPage()
    //cy.get('input[name="username"]').type('Admin')
    //cy.get('input[name="password"]').type('123456789101112')
    //cy.get('button[type="submit"]').click()
    //cy.contains('Invalid credentials').should('be.visible')
    //cy.url().should('include', 'login')
  })

  it('TC_004 - Pengguna tidak dapat login menggunakan username salah dan password benar', () => {

    loginPage.fillUsername(loginData.invalidUsername2)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()
    loginPage.ValidateInvalidCredentials()

    loginPage.verifyOnLoginPage()
    //cy.get('input[name="username"]').type('suaraku')
    //cy.get('input[name="password"]').type('admin123')
    //cy.get('button[type="submit"]').click()
    //cy.contains('Invalid credentials').should('be.visible')
    //cy.url().should('include', 'login')
  })

  it('TC_005 - Pengguna dapat login kembali setelah logout', () => {

    // login pertama
    loginPage.fillUsername(loginData.validUsername)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()

    dashboardPage.verifyOnDashboard()
    //cy.get('input[name="username"]').type('Admin')
    //cy.get('input[name="password"]').type('admin123')
    //cy.get('button[type="submit"]').click()

    //cy.url().should('include', '/dashboard')

    // logout
    dashboardPage.clickUserDropdown()
    dashboardPage.clickLogout()
    //cy.get('.oxd-userdropdown-tab').click()
    //cy.contains('Logout').click()

    // login kembali
    loginPage.verifyOnLoginPage()
    cy.wait(2000)
    loginPage.fillUsername(loginData.validUsername)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()

    dashboardPage.verifyOnDashboard()
    dashboardPage.dashboardVisible()

    //cy.url().should('include', 'login')
    //cy.wait(2000)
    //cy.get('input[name="username"]').type('Admin')
    //cy.get('input[name="password"]').type('admin123')
    //cy.get('button[type="submit"]').click()

    //cy.url().should('include', '/dashboard')
    //cy.contains('Dashboard').should('be.visible')
  })

  it('TC_006 - Pengguna dapat login pada huruf awal username menggunakan huruf kecil', () => {
    
    loginPage.fillUsername(loginData.usernameCaseInsensitive)
    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()
    dashboardPage.verifyOnDashboard()
    dashboardPage.dashboardVisible()
    //cy.get('input[name="username"]').type('admin')
    //cy.get('input[name="password"]').type('admin123')
    //cy.get('button[type="submit"]').click()
    //cy.url().should('include', '/dashboard')
    //cy.contains('Dashboard').should('be.visible')
  })

  it('TC_007 - Pengguna tidak dapat login saat username tidak diisi dan password diisi', () => {

    loginPage.fillPassword(loginData.validPassword)
    loginPage.submit()
    loginPage.ValidateRequiredField()
    loginPage.verifyOnLoginPage()
    //cy.get('input[name="password"]').type('admin123')
    //cy.get('button[type="submit"]').click()
    //cy.contains('Required').should('be.visible')
    //cy.url().should('include', 'login')
  })

  it('TC_008 - Pengguna tidak dapat login saat username diisi dan password tidak terisi', () => {

    loginPage.fillUsername(loginData.validUsername)
    loginPage.submit()
    loginPage.ValidateRequiredField()
    loginPage.verifyOnLoginPage()
    //cy.get('input[name="username"]').type('Admin')
    //cy.get('button[type="submit"]').click()
    //cy.contains('Required').should('be.visible')
    //cy.url().should('include', 'login')

  })

  it('TC_009 - Pengguna tidak dapat login saat username dan password tidak terisi', () => {

    loginPage.submit()
    loginPage.verifyOnLoginPage()
    //cy.get('button[type="submit"]').click()
    //cy.url().should('include', 'login')

  })
})