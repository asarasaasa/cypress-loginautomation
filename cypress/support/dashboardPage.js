class DashboardPage {
    verifyOnDashboard() {
        cy.url().should('include', '/dashboard')
    }
    dashboardVisible() {
        cy.contains('Dashboard').should('be.visible')
    }
    clickUserDropdown() {
        cy.get('.oxd-userdropdown-tab').click()
    }
    clickLogout() {
        cy.contains('Logout').click()
    }
}
export default new DashboardPage()