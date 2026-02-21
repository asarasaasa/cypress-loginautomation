import LoginPageData from '../../fixtures/ProjectAkhirSanber/LoginPageData.json'
import LoginPage from '../../support/ProjectAkhirSanber/LoginPage.js'
import DirectoryData from '../../fixtures/ProjectAkhirSanber/DirectoryData.json'
import DbDirectory from '../../support/ProjectAkhirSanber/DbDirectory.js'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false 
})

describe('Directory Test', () => {
    beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password);
    });

    it('TC_DIR001 - Memastikan halaman directory dapat diakses', () => {
        DbDirectory.goToDirectory()
        DbDirectory.employeeSearchInput().should('be.visible')
        DbDirectory.jobTitleDropdown().should('be.visible')
        DbDirectory.locationDropdown().should('be.visible')
        DbDirectory.searchButton().should('be.visible')
        DbDirectory.resetButton().should('be.visible')
        // cy.contains('Employee Name').should('be.visible')
        // cy.contains('Job Title').should('be.visible')
        // cy.contains('Location').should('be.visible')
        // cy.contains('button', 'Search').should('be.visible')
        // cy.contains('button', 'Reset').should('be.visible')
    })      

    it('TC_DIR002 - Memastikan filter Job Title berfungsi dengan benar ', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&jobTitleId=2').as('jobTitle');
        DbDirectory.selectJobTitle(DirectoryData.jobTitle)
        //cy.get('.oxd-select-text').eq(0).click()
        //cy.get('.oxd-select-dropdown').eq(0).contains('Chief Financial Officer').click()

        DbDirectory.clickSearch()
        //cy.contains('button', 'Search').click()
        cy.wait('@jobTitle')
        DbDirectory.validateJobTitleInList(DirectoryData.jobTitle)
        //cy.contains('Chief Financial Officer').should('exist')
    })

    it('TC_DIR003 - Memastikan filter Location berfungsi dengan benar', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=2').as('Loc');
       
        DbDirectory.selectLocation(DirectoryData.location)
        // cy.get('.oxd-select-text').eq(1).click()
        // cy.contains('New York Sales Office').click()
        DbDirectory.clickSearch()
        cy.wait('@Loc')
        DbDirectory.validateLocationInList(DirectoryData.location)
    })

    it('TC_DIR004 - Memastikan kombinasi filter menghasilkan data yang sesuai', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=2&empNumber=22&jobTitleId=17').as('Combination');
        DbDirectory.typeEmployee(DirectoryData.partialEmployee)
        DbDirectory.selectEmployeeFromSuggestion(DirectoryData.partialEmployee)

        DbDirectory.selectJobTitle(DirectoryData.jobTitleFilter)
        
        DbDirectory.selectLocation(DirectoryData.location)

        DbDirectory.clickSearch()
        cy.wait('@Combination')
        DbDirectory.validateJobTitleInList(DirectoryData.jobTitleFilter)
        DbDirectory.validateLocationInList(DirectoryData.location)
    })

    it('TC_DIR005 - Memastikan detail employee tampil pada panel kanan setelah employee diklik', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Peter').as('SearchEmployee');
        DbDirectory.typeEmployee(DirectoryData.validEmployee)
        DbDirectory.selectEmployeeFromSuggestion(DirectoryData.employeeFullName)
        DbDirectory.clickSearch()
        cy.wait('@SearchEmployee')

        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees/3?model=detailed').as('Detail');
        cy.contains(DirectoryData.employeeFullName).click();
        
        cy.wait('@Detail')
        DbDirectory.validateJobTitleInList(DirectoryData.jobTitle)
        DbDirectory.validateLocationInList(DirectoryData.location)
    })

    it('TC_DIR006 - Memastikan sistem menampilkan suggestion nama employee saat user mengetik', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Peter').as('EmployeeSuggestion');
        DbDirectory.typeEmployee(DirectoryData.validEmployee)
        cy.wait('@EmployeeSuggestion')

        DbDirectory.autocompleteOptions().should('be.visible').and('contain', DirectoryData.employeeFullName)
    })

    it('TC_DIR007 - Memastikan user dapat memilih Employee Name dari Suggestion', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Peter').as('EmployeeSuggestion');
        DbDirectory.typeEmployee(DirectoryData.validEmployee)
        cy.wait('@EmployeeSuggestion')
        DbDirectory.selectEmployeeFromSuggestion(DirectoryData.employeeFullName)

        DbDirectory.validateInputValue(DirectoryData.employeeFullName)
    })
    
    it('TC_DIR008 - Memastikan user tidak melakukan pencarian jika user tidak memilih dari suggestion', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Peter').as('Employee');
        DbDirectory.typeEmployee(DirectoryData.validEmployee)
        DbDirectory.clickSearch()
        
        DbDirectory.validateErrorMessage('Invalid')
        cy.get('@Employee').should('not.exist')
    })

    it('TC_DIR009 - Memastikan tidak muncul suggestion jika nama tidak ada', () => {
        DbDirectory.goToDirectory()
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Asa').as('EmployeeSuggestion');
        DbDirectory.typeEmployee(DirectoryData.invalidEmployee)
        cy.wait('@EmployeeSuggestion')

        DbDirectory.validateAutocompleteNotExist(DirectoryData.invalidEmployee)
    })

})