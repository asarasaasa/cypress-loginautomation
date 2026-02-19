class dashboardPage {
    verifyOnDashboard() {
        cy.url().should('include', '/dashboard')
    }
     DashboardVisible() {
        cy.contains('Dashboard').should('be.visible')
    }
    clickUserDropdown() {
        cy.get('.oxd-userdropdown-tab').click()
    }
    clickLogout() {
        cy.contains('Logout').click()
    }
}