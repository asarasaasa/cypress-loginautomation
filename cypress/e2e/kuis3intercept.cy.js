Cypress.on('uncaught:exception', (err, runnable) => {
  return false 
})

describe('TC_Login - Login Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  })

  it('TC_001 - Pengguna dapat login menggunakan username dan password benar', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginsuccess');
    cy.get('button[type="submit"]').click()
    cy.wait('@loginsuccess')
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC_002 - Pengguna tidak dapat login menggunakan username dan password salah', () => {

    cy.get('input[name="username"]').type('suara')
    cy.get('input[name="password"]').type('suara123')
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginFailed');
    cy.get('button[type="submit"]').click()
    cy.wait('@LoginFailed')
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_003 - Pengguna tidak dapat login menggunakan username benar dan password salah', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('123456789101112')
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginFailed');
    cy.get('button[type="submit"]').click()
    cy.wait('@LoginFailed')
    cy.contains('Invalid credentials').should('be.visible')
    cy.url().should('include', 'login')

  })

  it('TC_004 - Pengguna tidak dapat login menggunakan username salah dan password benar', () => {

    cy.get('input[name="username"]').type('suaraku')
    cy.get('input[name="password"]').type('admin123')
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginFailed');
    cy.get('button[type="submit"]').click()
    cy.wait('@LoginFailed')
    cy.contains('Invalid credentials').should('be.visible')
    cy.url().should('include', 'login')

  })

  it('TC_005 - Pengguna dapat login kembali setelah logout', () => {

    // login pertama
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginsuccess');
    cy.get('button[type="submit"]').click()
    cy.wait('@loginsuccess')

    cy.url().should('include', '/dashboard')

    // logout
    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('Logout').click()

    // login kembali
    cy.url().should('include', 'login')
    cy.wait(2000)
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('Relogin');
    cy.get('button[type="submit"]').click()
    cy.wait('@Relogin')

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')

  })

  it('TC_006 - Pengguna dapat login pada huruf awal username menggunakan huruf kecil', () => {
    
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin123')
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginsuccess');
    cy.get('button[type="submit"]').click()
    cy.wait('@loginsuccess')
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')

  })

  it('TC_007 - Pengguna tidak dapat login saat username tidak diisi dan password diisi', () => {

    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginRequest');
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('@LoginRequest.all')
    cy.contains('Required').should('be.visible')
    cy.url().should('include', 'login')

  })

  it('TC_008 - Pengguna tidak dapat login saat username diisi dan password tidak terisi', () => {

    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginRequest');
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.get('@LoginRequest')
    cy.contains('Required').should('be.visible')
    cy.url().should('include', 'login')

  })

  it('TC_009 - Pengguna tidak dapat login saat username dan password tidak terisi', () => {

    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginRequest');
    cy.get('button[type="submit"]').click()
    cy.get('@LoginRequest')
    cy.url().should('include', 'login')

  })
})