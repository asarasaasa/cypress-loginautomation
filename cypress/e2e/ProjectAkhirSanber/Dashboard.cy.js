import DashboardPage from "../../support/ProjectAkhirSanber/DashboardPage"
import LoginPage from "../../support/ProjectAkhirSanber/LoginPage"
import LoginPageData from "../../fixtures/ProjectAkhirSanber/LoginPageData.json"

Cypress.on('uncaught:exception', (err, runnable) => {
  return false 
})

describe('Dashboard Test', () => {

    beforeEach(() => {
        LoginPage.visit();
    })

    it('TC_DB001 - Memastikan halaman dashboard dimuat dengan sukses', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password) 
        DashboardPage.VerifyOnDashboard()
        //cy.url().should('include', '/dashboard')
    })

    it('TC_DB002 - Verifikasi tampilan Time At Work widget pada halaman dashboard', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        DashboardPage.timeAtWorkWidget()
        //cy.contains('Time at Work').should('be.visible')
    })

    it('TC_DB003 - Verifikasi tampilan My Actions pada halaman dashboard',() => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        DashboardPage.myActionsWidget()
        // cy.contains('My Actions')
        //   .parents('.oxd-grid-item')
        //   .within(() => {
        //     cy.get('.orangehrm-todo-list').should('have.length.greaterThan', 0)
        // })
    })

    it('TC_DB004 - User mengklik "Assign Leave" pada widget Quick launch', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/assignLeave').as('AssignLeavePage');
        DashboardPage.ClickQuickLaunchButton('Assign Leave')
        //clickQuickLaunch('Assign Leave')
        cy.wait('@AssignLeavePage')
        cy.url({timeout: 30000}).should('include', '/leave/assignLeave')
    })
    it('TC_DB005 - User mengklik "Leave List" pada widget Quick Launch', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList').as('LeaveListPage');
        DashboardPage.ClickQuickLaunchButton('Leave List')
        //clickQuickLaunch('Leave List')
        cy.wait('@LeaveListPage')
        cy.url().should('include', '/leave/viewLeaveList')
    })
    it('TC_DB006 - User mengklik "Timesheets" pada widget Quick Launch', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet').as('TimesheetPage');
        DashboardPage.ClickQuickLaunchButton('Timesheets')
        //DashboardPage.clickQuickLaunch('Timesheets')
        cy.wait('@TimesheetPage')
        cy.url().should('include', '/time/viewEmployeeTimesheet')
    })
    it('TC_DB007 - User mengklik "Apply Leave" pada widget Quick Launch', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave').as('ApplyLeavePage');
        DashboardPage.ClickQuickLaunchButton('Apply Leave')
        //clickQuickLaunch('Apply Leave')
        cy.wait('@ApplyLeavePage')
        cy.url().should('include', '/leave/applyLeave')
    })
    it('TC_DB008 - User mengklik "My Leave" pada widget Quick Launch', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList').as('MyLeavePage');
        DashboardPage.ClickQuickLaunchButton('My Leave')
        //clickQuickLaunch('My Leave')
        cy.wait('@MyLeavePage')
        cy.url().should('include', '/leave/viewMyLeaveList')
    })
    it('TC_DB009 - User mengklik "My Timesheets" pada widget Quick Launch', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewMyTimesheet').as('MyTimesheetPage');  
        DashboardPage.ClickQuickLaunchButton('My Timesheet')
        //clickQuickLaunch('My Timesheet')
        cy.wait('@MyTimesheetPage')
        cy.url().should('include', '/time/viewMyTimesheet')
    })
    it('TC_DB010 - Verifikasi tampilan Buzz Latest Post', () => {
        LoginPage.login(LoginPageData.validUser.username, LoginPageData.validUser.password)
        DashboardPage.buzzLatestPosts()
        //cy.contains('Buzz Latest Posts').should('be.visible')
    })
    it('TC_DB011 - Akses dashboard tanpa login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        cy.url().should('include', '/auth/login')
    })
})